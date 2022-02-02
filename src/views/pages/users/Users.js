import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
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
import CIcon from '@coreui/icons-react'
import userData from './userData';
import validate from "validate.js";
import {inviteUser, deleteUser, updateUser} from "../../../actions/authActions";


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
  name: {
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
  email: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
  projectId: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
}


const fields = ['name', 'email', 'actions'];

const Users = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [user, setUser] = useState({});
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const projects = useSelector(state => state.project.projects);
  // const users = useSelector(state => state.user.users);
  const users = userData;

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    // console.log(event);
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
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleInvite = event => {
    event.preventDefault();
    if (formState.isValid){
      dispatch(inviteUser(formState.values));
    }
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    setModal(false);
    return false;
  };


  const handleDeleteField = (event) => {
    event.preventDefault();
    dispatch(deleteUser(user.id));
    setUser({});
    setDeleteModal(false);
  }
  const handleUpdateUser = (event) => {
    event.preventDefault();
    dispatch(updateUser({name: formState.values.name, role: formState.values.role}, user.id));
    setUser({});
    setModal(false);
  }
  const openDeleteModal =(field) => {
    setDeleteModal(true);
    setUser(field);
  }

  const openEditModal =(field) => {
    setEdit(true);
    setModal(true);
    setFormState({
      isValid: true,
      values: field,
      touched: {},
      errors: {}
    });
    setUser(field);
  }
  const handleCloseEdit = () => {
    setModal(false);
    setEdit(false);
    setFormState({
      isValid: true,
      values: {},
      touched: {},
      errors: {}
    });
  }

  return (
    <>

      <CRow>
        <CCol xs="12" lg="12">
          <CCard className="shadow-lg">
            <CCardHeader>
              User
              <CButton variant="outline" active aria-pressed="true" className="float-right sidebar-dark text-white" onClick={() => setModal(!modal)} >
                 Invite User
              </CButton>

            </CCardHeader>
            <CModal
              show={modal}
              onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>{edit ? "Update User":  "Invite New User" }</CModalTitle>
              </CModalHeader>
              <CForm className="form-horizontal" onSubmit={edit? handleUpdateUser :handleInvite }>
              <CModalBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="name">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" id="name" name="name" placeholder="Enter User Name..." onChange={handleChange} value={formState.values.name || ''} required />
                      <CFormText className="help-block">Please enter your username</CFormText>
                    </CCol>
                  </CFormGroup>
                {edit ? null : <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email">Email Address</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" id="email" name="email" placeholder="Enter Email..." onChange={handleChange} value={formState.values.email || ''} required />
                      <CFormText className="help-block">Please enter your email</CFormText>
                    </CCol>
                  </CFormGroup> }
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="role">Access Role</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        custom
                        name="role"
                        id="role"
                        onChange={handleChange}
                        value={formState.values.role || ''}
                        required
                      >
                        <option value="">Please select</option>
                        <option value="design">Designer</option>
                        <option value="manufacture">Manufacturer</option>
                        <option value="installation">Installation</option>
                        <option value="delivery">Delivery</option>
                        <option value="admin">Admin</option>
                      </CSelect>
                      <CFormText className="help-block">Select access roles</CFormText>
                    </CCol>
                  </CFormGroup>
                {edit? null : <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="role">Project</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="projectId"
                      id="projectId"
                      onChange={handleChange}
                      value={formState.values.projectId || ''}
                      required
                    >
                      <option value="">Please select</option>
                      {projects && projects.length > 0 ? projects.map(project => (
                        <option value={project.id} key={project.id}>{project.title}</option>)) : null
                      }
                    </CSelect>
                    <CFormText className="help-block">Select access roles</CFormText>
                  </CCol>
                </CFormGroup> }
              </CModalBody>
              <CModalFooter>
                <CButton className="text-white sidebar-dark" type="submit">Submit</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={() =>  handleCloseEdit()}
                >Cancel</CButton>
              </CModalFooter>
            </CForm>
            </CModal>
            <CCardBody>
              <CDataTable
                items={users}
                fields={fields}
                itemsPerPage={10}
                pagination
                tableFilter
                sorter
                hover
                scopedSlots = {{
                  'actions':
                    (item)=>(
                      <td className="px-4">
                        <CButton className="pl-6 px-3" color="primary" variant="ghost" onClick={() => openEditModal(item)}><CIcon name="cil-pencil" color="info" customClasses="c-sidebar-nav-icon" /></CButton>
                        <CButton className="pl-6" color="danger" variant="ghost" onClick={() => openDeleteModal(item)}><CIcon name="cil-trash" customClasses="c-sidebar-nav-icon"/></CButton>
                      </td>
                    )

                }}
              />
            </CCardBody>
          </CCard>
          <CModal
            show={deleteModal}
            onClose={setDeleteModal}
          >
            <CModalHeader closeButton> Confirm</CModalHeader>
            <CModalBody>Are you sure you want to delete this user? </CModalBody>
            <CModalFooter>
              <CButton className="text-white bg-danger" type="submit" onClick={handleDeleteField}>Yes</CButton>{' '}
              <CButton
                color="secondary"
                onClick={() =>  setDeleteModal(false)}
              >Cancel</CButton>
            </CModalFooter>
          </CModal>

        </CCol>

      </CRow>


    </>
  )
}

export default Users
