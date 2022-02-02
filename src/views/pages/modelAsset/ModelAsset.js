import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CLabel, CModal, CModalHeader, CModalBody,
  CRow, CModalFooter, CCardHeader
} from '@coreui/react'
import Multiselect from 'multiselect-react-dropdown';
import {getModelAssetsData, updateModelAssetsData} from "../../../actions/authActions";
import CIcon from "@coreui/icons-react";


const fields = ['actions'];
const categoryRole = {
  design: "DesPh",
  delivery: "DelPh",
  manufacture: "ManPh",
  installation: "InsPh"
}


const ModelAsset = (props) => {

  const [modal, setModal] = useState(false);
  const [modelId, setModelId] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [project, setProject] = useState({});
  const projects = useSelector(state => state.project.projects)
  const [assetFields, setFields] = useState([]);
  const [asset, setAsset] = useState({});
  const [selectedOption, setSelected] = useState(null);
  const [editable, setEditable] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const assets = useSelector(state => state.model.assets);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  

  const excludes = ['id', 'model', 'models_id', 'createdAt', 'updatedAt', 'qr_code', 'lastModifiedBy'];
  const fieldsA = assets && assets.length > 0 ?  ['id', 'status'].concat(Object.keys(assets[0]).slice(2,5)).concat(fields) : [];
  
  const loggedInUser = useSelector(state => state.auth.user);

  useEffect( () => {
  
    const model_id = props.match.params.modelId;
    let project = projects && projects.length > 0 ? projects.find(item => !!item.model && item.model.id === Number(props.match.params.modelId)) : null;
    setProject(project);
    setModelId(model_id);
    setFormState(formState => ({
      ...formState,
    }));
    if(Object.keys(formState.values).length === 0){
      dispatch(getModelAssetsData(model_id));
    }

  }, [dispatch, formState.values, props.match.params.modelId, projects]);
   

  const handleChange = event => {
    event.preventDefault();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const handleNumChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  }


  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateModelAssetsData(formState.values["TIES_0105_DesPh_UniqueAssetID"], formState.values, asset['id']));
  };


  const openModal =(item)=> {
    setModal(true);
    setAsset(item);
  }

  const openEditModal =(item)=> {
    setEditModal(true);
    setAsset(item);
    setFormState({
      values: item
    });
  }
  const  handleSelected = (selected) => {
    setSelected({ selected });
    setFields(['id', 'status'].concat(selected.map((item) =>item.value)).concat(['actions']))
  };

  const modelAssets = asset ?  Object.keys(asset).filter(item => !excludes.includes(item)).map((key, index) => {
  
  return (
    <div key={key}>
      <CLabel className="font-weight-bold">{key}</CLabel>: <CLabel>{asset[key]}</CLabel>
    </div>
  )})
   : null;

  const editModalAssets = asset ?  Object.keys(asset).filter(item => !excludes.includes(item)).map((key, index) => {
      return (
        <CCol xs="12" m="12" lg="12" key={key} className="">
          <CFormGroup className={'mt-2 d-block'}>
            <CRow>
              <CCol lg="5"><CLabel htmlFor={key} className="font-weight-bold text-left">{key}</CLabel></CCol>
              <CCol lg="7"><CInput
              type="text"
              id={key+index}
              name={key}
              onChange={handleChange}
              placeholder=""
              value={formState.values[key] || ''}
              className={""}
              disabled={loggedInUser && loggedInUser.role !== 'admin' ? !key.includes(categoryRole[loggedInUser.role]): editable}
              required
            /></CCol>
            </CRow>
            </CFormGroup>
        </CCol>
      )})
    : null;

  return (
    <>
    
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader className="d-flex flex-row justify-between">
              <div>
              <h4 className="pt-3 mr-20 float-left">{project ? project.title : null}</h4></div>
              <div className="d-inline-flex mr-24 ml-24">
                <span><i className="fa fa-cog pr-2 pt-3"></i></span>
                <span>
                  {assets && assets.length > 0 ? 
              
                      <Multiselect
                   
                    options={Object.keys(assets[0]).filter(item => !excludes.includes(item)).map((item, id) => {return {value: item, key: id}})}
                    placeholder={"Select"}
                    onSelect={handleSelected} // Function will trigger on select event
                    onRemove={handleSelected}
                    showCheckbox={true}
                    selectedValues={selectedOption}
                    closeOnSelect={false}
                    displayValue="value" // Property name to display in the dropdown options
                   
                     /> 
                  : null }
                </span>
                <span className="pt-2 pl-4">
                  <i className="fa fa-sliders-h"></i>
                  <select aria-label="Select items per page" onChange={handleNumChange} name="itemsPerPage" value={itemsPerPage}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </span>

              </div>
             
            </CCardHeader>
            <CCardBody className="overflow-hidden">
              {assets && assets.length > 0 ?
                <CDataTable
                  items={assets}
                  fields={assetFields && assetFields.length > 0 ? assetFields: fieldsA}
                  itemsPerPage={itemsPerPage}
                  pagination
                  tableFilter
                  sorter
                  hover
                  sm
                  addTableClasses={"assetsTable"}
                  scopedSlots = {{
                    'actions':
                      (item, index)=>{
                        return (
                          <td className="py-2">
                            <CButton className="pl-6" color="info" variant="ghost" onClick={() => openModal(item)}><CIcon name="cil-notes" customClasses="c-sidebar-nav-icon"/></CButton>
                            <CButton className="pl-6 px-3" color="primary" variant="ghost" onClick={() => openEditModal(item)}><CIcon name="cil-pencil" color="info" customClasses="c-sidebar-nav-icon" /></CButton>
                          </td>
                        )
                      },
                    'id':
                      (item, index)=> {
                        return (
                          <td>{index+1}</td>
                        )
                      },
                      'status':
                      (item, index) => {
                        return (
                          <td><span className={item['TIES_0116_DesPh_Status'].replace(/\s/g, "").toLowerCase()}></span>{item['TIES_0116_DesPh_Status']}</td>
                        )
                      }

                  }}

                /> : <div>No asset data !!!</div>

              }
            </CCardBody>
          </CCard>
          <CModal
            show={modal}
            onClose={setModal}
            size="lg"
          >
            <CModalHeader closeButton> {asset ? "Asset: "+ asset["TIES_0101_DesPh_Category"] : "Asset Info"}</CModalHeader>
            <CModalBody>
              {modelAssets}
            </CModalBody>
          </CModal>
          <CModal
            show={editModal}
            onClose={setEditModal}
            size="lg"
          >
            <CModalHeader closeButton> {asset ? "Asset: "+ asset["TIES_0101_DesPh_Category"] : "Asset Info"}</CModalHeader>
            <CModalBody>
              <CForm className="form-horizontal" onSubmit={handleUpdate}>
              <CRow>
                  {editModalAssets}
                <CModalFooter align="right">
                  <CButton className="text-white bg-info" type="submit" >Submit</CButton>{' '}
                  <CButton
                    color="secondary"
                    onClick={() =>  setEditModal(false)}
                  >Cancel</CButton>
                </CModalFooter>
              </CRow>

              </CForm>
            </CModalBody>
          </CModal>
        </CCol>
      </CRow>
    </>
  )
}

export default ModelAsset;
