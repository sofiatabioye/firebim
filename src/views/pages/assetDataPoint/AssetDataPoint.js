import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow, CSelect
} from '@coreui/react'

import CIcon from "@coreui/icons-react";
import {useDispatch, useSelector} from "react-redux";
import validate from "validate.js";
import {createAssetField, deleteAssetField, updateAssetField} from "../../../actions/assetActions";



const schema = {
  title: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
  category: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
  type: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
}



const AssetDataPoint = () => {

  const dispatch = useDispatch();
  const datapoints = useSelector(state => state.assetField.assetFields);
  const categories = useSelector(state => state.assetCategory.assetCategories);

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [datapoint, setDatapoint] = useState({});
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const loggedInUser = useSelector(state => state.auth.user);
  const fields = ['title', 'category', 'type'];
  const adminFields = ['title', 'category', 'type', 'actions'];

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;


  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));

  };
  const handleAddField = event => {
    event.preventDefault();
    if (formState.isValid){
      dispatch(createAssetField(formState.values));
    }
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    setModal(false);
    return false;
  }

  const handleDeleteField = () => {
    // event.preventDefault();
    dispatch(deleteAssetField(datapoint.id));
    setDatapoint({});
    setDeleteModal(false);
  }

  const handleEditField = event => {
    event.preventDefault();
    dispatch(updateAssetField(datapoint.id, formState.values));
    setDatapoint({});
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    setEditModal(false);
  }

  const openDeleteModal =(field) => {
    setDeleteModal(true);
    setDatapoint(field);
  }

  const openEditModal =(field) => {
    setEditModal(true);
    setFormState({
      isValid: true,
      values: field,
      touched: {},
      errors: {}
    });
    setDatapoint(field);
  }


  const dataForm = (handleSubmit, type) => {
    return ( <CForm className="form-horizontal" onSubmit={handleSubmit}>
      <CModalBody>
        <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="hf-email">Name</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="title" name="title" placeholder="Enter data point name..." onChange={handleChange} value={formState.values.title || ''} required />
            <CFormText className="help-block">{hasError('title') ? formState.errors.title[0] : "Please enter the name"}</CFormText>
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="category">Category</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CSelect
              custom
              name="category"
              id="category"
              autoComplete="category"
              onChange={handleChange}
              value={formState.values.category || ''}
              required
            >
              <option value="">Please select</option>
              {categories && categories.length > 0 ? categories.map(category =>
                <option value={category.title} key={category.id}>{category.title}</option>
              ) : ''}
            </CSelect>
            <CFormText className="help-block">{hasError('category') ? formState.errors.category[0] : "Select category"}</CFormText>
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="type">Data Type</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CSelect
              custom
              name="type"
              id="type"
              autoComplete="type"
              onChange={handleChange}
              value={formState.values.type || ''}
              required
            >
              <option value="">Please select</option>
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="url">URL</option>
              <option value="date">Date</option>
            </CSelect>
            <CFormText className="help-block">{hasError('type') ? formState.errors.type[0] : "Select data type"}</CFormText>
          </CCol>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton  className="sidebar-dark text-white" type="submit">Submit</CButton>{' '}
        <CButton
          color="secondary"
          onClick={() =>  { type == 'edit' ? setEditModal(false) : setModal(false)}}
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
              Asset Data Fields
              {loggedInUser && loggedInUser.role === 'admin' ? <CButton variant="outline" active aria-pressed="true" className="float-right sidebar-dark text-white" onClick={() => setModal(!modal)} >
                  Add New Datapoint
                </CButton>: null}
            </CCardHeader>
            <CModal
              show={modal}
              onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>New Datapoint</CModalTitle>
              </CModalHeader>
            {dataForm(handleAddField, "add")}
            </CModal>
            <CCardBody>
              {datapoints ?
                (<CDataTable
                items={datapoints}
                fields={loggedInUser && loggedInUser.role === 'admin' ?adminFields: fields}
                itemsPerPage={10}
                pagination
                tableFilter
                sorter
                hover
                size={400}
                scopedSlots = {{
                  'actions':
                    (item)=>(
                     <td className="px-4">
                        <CButton className="pl-6" onClick={() => openEditModal(item)} color="primary" variant="ghost"><CIcon name="cil-pencil" color="primary" customClasses="c-sidebar-nav-icon" /></CButton>
                        <CButton className="pl-6"  onClick={() => openDeleteModal(item)} color="danger" variant="ghost"><CIcon name="cil-trash" customClasses="c-sidebar-nav-icon"/></CButton>
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
              <CModalBody>Are you sure you want to delete this asset category? </CModalBody>
              <CModalFooter>
                <CButton className="text-white bg-danger" type="submit" onClick={handleDeleteField}>Yes</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={() =>  setDeleteModal(false)}
                >Cancel</CButton>
              </CModalFooter>
            </CModal>
            <CModal
              show={editModal}
              onClose={setEditModal}
            >
              <CModalHeader closeButton> Confirm</CModalHeader>
              {dataForm(handleEditField, "edit")}
            </CModal>
          </CCard>
        </CCol>

      </CRow>


    </>
  )
}

export default AssetDataPoint;
