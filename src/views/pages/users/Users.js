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
import validate from "validate.js";
import {inviteUser, deleteUser, updateUser, getUsers, deleteUserInvite} from "../../../actions/authActions";

const schemaAdmin = {
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
  }
}
const schema = {
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
  project: {
    presence: {allowEmpty: true, message: 'is required'},
    length: {
      maximum: 64
    }
  },
}


const fields = ['firstName', 'lastName', 'email','role', 'project', 'actions'];

const Users = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState(undefined);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const projects = useSelector(state => state.project.projects);
  const users = useSelector(state => state.user.users);
  const invites = useSelector(state => state.user.invites);

  useEffect(() => {
    const errors = formState.role === 'admin' ? validate(formState.values, schema): validate(formState.values, schemaAdmin);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

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
    if(userType === 'invite'){
      dispatch(deleteUserInvite(user.id));
    } else {
      dispatch(deleteUser(user._id));
    }
    setUser({});
    setDeleteModal(false);
    dispatch(getUsers());
  }
  const handleUpdateUser = (event) => {
    event.preventDefault();
    dispatch(updateUser({name: formState.values.name, role: formState.values.role}, user.id));
    setUser({});
    setModal(false);
  }
  const openDeleteModal =(field, type) => {
    setDeleteModal(true);
    setUser(field);
    setUserType(type);
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
              Users 
              <CButton variant="outline" active aria-pressed="true" className="float-right sidebar-dark text-white relative" onClick={() => setModal(!modal)} >
                 Invite User
              </CButton>
            </CCardHeader>
           
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
                    ),
                  'project':
                   (item)=> (
                    <td className="px-4">
                    {item.project}
                    </td>
                   )

                }}
              />
            </CCardBody>
          </CCard>
          <CModal
              show={modal}
              onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>{edit ? "Update User":  "Invite New User" }</CModalTitle>
              </CModalHeader>
              <CForm className="form-horizontal" onSubmit={handleInvite}>
              <CModalBody>
                 <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email">Email Address</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="Enter Email..." 
                        onChange={handleChange} 
                        value={formState.values.email || ''} 
                        required 
                      />
                      <CFormText className="help-block">{hasError('email') ? formState.errors.email[0] : null}</CFormText>
                    </CCol>
                  </CFormGroup> 
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="role">Role</CLabel>
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
                        <option value="basic">Basic</option>
                        <option value="admin">Admin</option>
                      </CSelect>
                      <CFormText className="help-block">{hasError('role') ? formState.errors.role[0] : null}</CFormText>
                    </CCol>
                  </CFormGroup>
                  {formState.values.role === 'basic' ?
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="project">Project</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        custom
                        name="project"
                        id="project"
                        onChange={handleChange}
                        value={formState.values.project || ''}
                      >
                        <option value="">Please select</option>
                        {projects && projects.length>0  ? projects.map((project) => 
                          <option value={project._id}>{project.title}</option>
                        ): null}
                      </CSelect>
                      <CFormText className="help-block">{hasError('project') ? formState.errors.project[0] : null}</CFormText>
                    </CCol>
                  </CFormGroup> : null }
                 
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
          <CModal
            show={deleteModal}
            onClose={setDeleteModal}
          >
            <CModalHeader closeButton> Confirm</CModalHeader>
            <CModalBody>Are you sure you want to delete this {userType === undefined? 'user': 'invite'}? </CModalBody>
            <CModalFooter>
              <CButton className="text-white bg-danger" type="submit" onClick={handleDeleteField}>Yes</CButton>{' '}
              <CButton
                color="secondary"
                onClick={() =>  setDeleteModal(false)}
              >Cancel</CButton>
            </CModalFooter>
          </CModal>

        </CCol>
        <CCol xs="12" lg="12" className="mt-4">
        <CCard className="shadow-lg">
            <CCardHeader>
              Invites
            </CCardHeader>  
            <CCardBody>
              <CDataTable
                items={invites && invites.length >0 ? invites: []}
                fields={['email', 'role', 'project', 'actions']}
                itemsPerPage={10}
                pagination
                tableFilter
                sorter
                hover
                scopedSlots = {{
                  'actions':
                    (item)=>(
                      <td className="px-4">
                        <CButton className="pl-6" color="danger" variant="ghost" onClick={() => openDeleteModal(item, 'invite')}><CIcon name="cil-trash" customClasses="c-sidebar-nav-icon"/></CButton>
                      </td>
                    ),
                  'project':
                   (item)=> (
                    <td className="px-4">
                    {projects.find((project)=> project._id === item.project)?.title}
                    </td>
                   )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>


    </>
  )
}

export default Users
