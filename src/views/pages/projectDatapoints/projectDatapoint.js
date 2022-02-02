import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import Multiselect from 'multiselect-react-dropdown';
import CIcon from "@coreui/icons-react";
import {useDispatch, useSelector} from "react-redux";
import { updateProject, getProjects } from '../../../actions/projectActions';




const ProjectDataPoint = (props) => {

  const dispatch = useDispatch();
  const datapoints = useSelector(state => state.assetField.assetFields);
  const categories = useSelector(state => state.assetCategory.assetCategories);
  const [project, setProject] = useState({});
  const projects = useSelector(state => state.project.projects)
  const [selectedOption, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectDatapoint, setProjectDatapoint] = useState({});
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const loggedInUser = useSelector(state => state.auth.user);
  const fields = ['title', 'category', 'type'];
  const adminFields = ['title', 'category', 'type', 'actions'];
  
  useEffect(() => {
    
    let project = projects && projects.length > 0 ? projects.find(item =>  item.id === Number(props.match.params.projectId)) : null;
    setProject(project);
    setUpdate(true);
  }, [projects, props.match.params.projectId]);

  useEffect(() => {
    if(Object.keys(project).length>0 && project.assetFields && project.assetFields.length >0 ){
      let filterSet = datapoints.filter((item) => !project.assetFields.map((field) => field.id).includes(item.id)).map((item) => {return {value: item.title, key: item.id, cat: item.category}})
      setFilter(filterSet);
    }
  }, [update, project, datapoints]);


  const  handleSelected = (selected) => {
    setSelected({ selected });
  };
  const handleNumChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  }
  const handleUpdateProject = async (event, type) => {
    event.preventDefault();
  
    if(!!type && type ==="remove" && Object.keys(projectDatapoint).length > 0 && project.assetFields){
      let update =  project.assetFields.filter((item) => item.id !== projectDatapoint.id).map((item) => item.id);
      await dispatch(updateProject(project.id, {title: project.title, assetFields: update}))
      setDeleteModal(false);
      setProjectDatapoint({});
      setSelected(null);
    }
    if (!!selectedOption){
      let fields = selectedOption.selected.map(item => item.key);
      let update = project.assetFields && project.assetFields.length > 0 ? project.assetFields.map((item) => item.id).concat(fields) : fields;
      await dispatch(updateProject(project.id, {title: project.title, assetFields: update}));
      setSelected(null);
    }
    await setModal(false);
    await dispatch(getProjects());
    await setSelected(null);
  
  };

  const openDeleteModal =(item) => {
    setDeleteModal(true);
    setProjectDatapoint(item);
  }
  const closeDeleteModal =() => {
    setDeleteModal(false);
    setProjectDatapoint({});
  }

  const dataForm = () => {
    return ( <CForm className="form-horizontal" onSubmit={handleUpdateProject}>
      <CModalBody>
        Are you sure you want to add these data points? 
      </CModalBody>
      <CModalFooter>
        <CButton  className="sidebar-dark text-white" type="submit">Submit</CButton>{' '}
        <CButton
          color="secondary"
          onClick={() =>  setModal(false)}
        >Cancel</CButton>
      </CModalFooter>
    </CForm>)
  }
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard className="shadow-lg">
            <CCardHeader>
             <h4 className="pt-3 float-left"> {project ? project.title: null} Datapoints</h4>
              {loggedInUser && loggedInUser.role === 'admin' && project ? 
             
               <span className="flex justify-end mr-20 multiSelectWrapper">
                <Multiselect
                    options={filter && filter.length > 0 ? filter : datapoints.map((item) => {return {value: item.title, key: item.id, cat: item.category}})}
                    placeholder={"Select Asset fields"}
                    onSelect={handleSelected} // Function will trigger on select event
                    showCheckbox={true}
                    selectedValues={selectedOption}
                    closeOnSelect={false}
                    displayValue="value" // Property name to display in the dropdown options
                   
                     /> 
                <CButton variant="outline" active aria-pressed="true" className="float-right sidebar-dark text-white" onClick={() => setModal(!modal)} disabled={!!selectedOption ? false: true}>
                  <i className="fa fa-add"></i> Add
                </CButton>
                <span className="pl-4 pt-2">
                  <i className="fa fa-sliders-h"></i>
                  <select aria-label="Select items per page" onChange={handleNumChange} name="itemsPerPage" value={itemsPerPage}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </span>
                </span>
                
                : null}
                 
            </CCardHeader>


            <CModal
              show={modal}
              onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>Add New Datapoint</CModalTitle>
              </CModalHeader>
                {dataForm()}
            </CModal>


            <CCardBody>
              {project ?
                (<CDataTable
                items={project.assetFields}
                fields={loggedInUser && loggedInUser.role === 'admin' ? adminFields: fields}
                itemsPerPage={itemsPerPage}
                pagination
                tableFilter
                sorter
                hover
                scopedSlots = {{
                  'actions':
                    (item)=>(
                     <td className="px-4" style={{width: '5%'}}>
                        <CButton className="pl-6" color="danger" variant="ghost" onClick={() => openDeleteModal(item)}><CIcon name="cil-x" customClasses="c-sidebar-nav-icon"/></CButton>
                      </td>
                    )
                }}
              />) : <div>Loading..</div>}
            </CCardBody>
            <CModal
              show={deleteModal}
              onClose={setDeleteModal}
            >
              <CModalHeader closeButton> Confirm</CModalHeader>
              <CModalBody>
                <h6>Are you sure you want to remove this data point [{projectDatapoint.title}]? </h6>
              </CModalBody>
              <CModalFooter>
                <CButton className="text-white bg-danger" type="submit" onClick={(e) => handleUpdateProject(e, "remove")}>Yes</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={() => closeDeleteModal()}
                >Cancel</CButton>
              </CModalFooter>
            </CModal>

          
          </CCard>
        </CCol>

      </CRow>


    </>
  )
}

export default ProjectDataPoint;
