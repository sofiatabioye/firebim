import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
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
import CIcon from '@coreui/icons-react';
import assetData from './assetCategoryData';
import {createAssetCategory, deleteAssetCategory, updateAssetCategory} from "../../../actions/assetActions";
import validate from "validate.js";


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
};
const schema = {
  title: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
  role: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
}



const AssetCategory = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [category, setCategory] = useState({});
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const categories = useSelector(state => state.assetCategory.assetCategories);
  const loggedInUser = useSelector(state => state.auth.user);
  let fields =  [ 'title', 'role','AssetFieldCount'];
  let adminfields = [ 'title', 'role','AssetFieldCount',  'actions'];


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

  const handleAddCategory = event => {
    event.preventDefault();
    if (formState.isValid){
      dispatch(createAssetCategory(formState.values));
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
  const handleDeleteCategory = () => {
      // event.preventDefault();
      dispatch(deleteAssetCategory(category.id));
      setCategory({});
      setDeleteModal(false);
  }

  const handleEditCategory = event => {
    event.preventDefault();
    dispatch(updateAssetCategory(category.id, formState.values));
    setCategory({});
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    setEditModal(false);
  }

  const openDeleteModal =(category) => {
    setDeleteModal(true);
    setCategory(category);
  }

  const openEditModal =(category) => {
    setEditModal(true);
    setFormState({
      isValid: true,
      values: category,
      touched: {},
      errors: {}
    });
    setCategory(category);
  }

  return (
    <>

      <CRow>
        <CCol xs="12" lg="12">
          <CCard className="shadow-lg">
            <CCardHeader>
              Asset Data Categories
              {loggedInUser && loggedInUser.role === 'admin' ? <CButton variant="outline" active aria-pressed="true" className="float-right sidebar-dark text-white" onClick={() => setModal(!modal)} >
                  Add New Category
                </CButton> : null }

            </CCardHeader>
            <CModal
              show={modal}
              onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>New Category</CModalTitle>
              </CModalHeader>
              <CForm className="form-horizontal" onSubmit={handleAddCategory}>
              <CModalBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" id="title" name="title" placeholder="Enter Category..." onChange={handleChange} value={formState.values.title || ''} required />
                      <CFormText className="help-block"> {hasError('title') ? formState.errors.title[0] : "Please enter your category"} </CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-password">Access Role</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                        <CSelect
                          custom
                          name="role"
                          id="role"
                          autoComplete="name"
                          onChange={handleChange}
                          value={formState.values.role || ''}
                          required
                        >
                          <option value="">Please select </option>
                          <option value="design">Design</option>
                          <option value="manufacture">Manufacture</option>
                          <option value="delivery">Delivery</option>
                          <option value="installation">Installation</option>

                        </CSelect>
                       <CFormText className="help-block"> {hasError('role') ? formState.errors.role[0] : "Select access roles"} </CFormText>
                    </CCol>
                  </CFormGroup>

              </CModalBody>
              <CModalFooter>
                <CButton className="text-white sidebar-dark" type="submit">Submit</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={() =>  setModal(false)}
                >Cancel</CButton>
              </CModalFooter>
              </CForm>
            </CModal>
            <CCardBody>
              {categories ?
                <CDataTable
                items={categories}
                fields={loggedInUser && loggedInUser.role === 'admin' ? adminfields : fields}
                itemsPerPage={10}
                pagination
                tableFilter
                sorter
                hover
                scopedSlots =
                  {{
                  'actions':
                    (item)=>(
                      <td className="px-4">
                        <CButton className="pl-6" onClick={() => openEditModal(item)} color="primary" variant="ghost"><CIcon name="cil-pencil" color="primary" customClasses="c-sidebar-nav-icon" /></CButton>
                        <CButton className="pl-6"  onClick={() => openDeleteModal(item)} color="danger" variant="ghost"><CIcon name="cil-trash" customClasses="c-sidebar-nav-icon"/></CButton>
                      </td>
                    )
                }}
                /> : <div>Loading ...</div>}
            </CCardBody>
            <CModal
              show={deleteModal}
              onClose={setDeleteModal}
            >
              <CModalHeader closeButton> Confirm</CModalHeader>
                <CModalBody>Are you sure you want to delete this asset category? </CModalBody>
                <CModalFooter>
                  <CButton className="text-white bg-danger" type="submit" onClick={()=> handleDeleteCategory()}>Yes</CButton>{' '}
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
              <CForm className="form-horizontal" onSubmit={handleEditCategory}>
                <CModalBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" id="title" name="title" placeholder="Enter Category..." onChange={handleChange} value={formState.values.title || ''} required />
                      <CFormText className="help-block"> {hasError('title') ? formState.errors.title[0] : "Please enter your category"} </CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-password">Access Role</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        custom
                        name="role"
                        id="role"
                        autoComplete="name"
                        onChange={handleChange}
                        value={formState.values.role || ''}
                        required
                      >
                        <option value="">Please select </option>
                        <option value="design">Design</option>
                        <option value="manufacture">Manufacture</option>
                        <option value="delivery">Delivery</option>
                        <option value="installation">Installation</option>

                      </CSelect>
                      <CFormText className="help-block"> {hasError('role') ? formState.errors.role[0] : "Select access roles"} </CFormText>
                    </CCol>
                  </CFormGroup>
                </CModalBody>
              <CModalFooter>
                <CButton className="text-white bg-info" type="submit" onClick={()=> handleEditCategory()}>Submit</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={() =>  setEditModal(false)}
                >Cancel</CButton>
              </CModalFooter></CForm>
            </CModal>
          </CCard>
        </CCol>

      </CRow>


    </>
  )
}

export default AssetCategory
