import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol, CImg,
  CRow, CForm, CInputGroup, CInputGroupText, CInput, CButton, CFormText, CLabel
} from '@coreui/react';
import {updateUserProfile} from "../../../actions/authActions";
import CIcon from "@coreui/icons-react";
import validate from "validate.js";
import avatar from '../../images/user.png';

const schema = {
  firstName:  {
    // presence: {allowEmpty: true, message: 'is not required'},
    length: {
      minimum: 2,
      maximum: 32
    }
  },
  lastName: {
    // presence: {allowEmpty: true, message: 'is not required'},
    length: {
      minimum: 2,
      maximum: 32
    }
  },
  organisation: {
    // presence: {allowEmpty: true, message: 'is required'},
    length: {
      maximum: 45,
      minimum: 3,
      message: "must be at least 3 characters"
    },
  },
  address: {
    // presence: {allowEmpty: true, message: 'is required'},
    length: {
      maximum: 45,
      minimum: 3,
      message: "must be at least 3 characters"
    },
  }

}


const UserProfile = (props) => {
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState('password');
  const [selectedFile, setSelectedFile] = useState(undefined);
  const loggedInUser = useSelector(state => state.auth.profile);
  const [editImage, setEditImage] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
        firstName: loggedInUser ? loggedInUser.firstName : '',
        lastName: loggedInUser ? loggedInUser.lastName : '',
        address: loggedInUser ? loggedInUser.address: '',
        organisation: loggedInUser ? loggedInUser.organisation : '',
        image:  loggedInUser ? loggedInUser.image : null,
    
       },
    touched: {},
    errors: {}
  });

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
        [event.target.name]:
          event.target.type === 'file'
            ? setSelectedFile(event.target.files[0])
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
      
    }));
    
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    
    }));
  }, [formState.values]);

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    let formData = new FormData();
   
    if(formState.isValid && Object.keys(formState.values).length > 0 ) {
        if(selectedFile !== undefined && selectedFile.size <= 1000000 && editImage === true){
            formData.append('image', selectedFile);
        }
        formData.append('firstName', formState.values.firstName);
        formData.append('lastName', formState.values.lastName);
        formData.append('address', formState.values.address);
        formData.append('organisation', formState.values.organisation);
        dispatch(updateUserProfile(formData, loggedInUser.id));
    }
    
    setFormState({
      isValid: false,
      values: {
        firstName: formState.values.firstName,
        lastName: formState.values.lastName,
        address: formState.values.address,
        organisation: formState.values.organisation,
        image: formState.values.image
       },
      touched: {},
      errors: {}
    });
    setSelectedFile(undefined);
    setEditImage(false);
  }

  return (

    <CRow>

        <CCol xs="12" xl="6" className="align-content-center m-auto">
          <CCard className="card-accent-dark shadow-lg" size="lg">
            <CCardHeader className="text-center">
              <div className="d-block my-3">
                User Profile
              </div>
            </CCardHeader>
            <CCardBody className="text-center">
              <CForm onSubmit={handleUpdateProfile}>
                
                  <CImg 
                    src={loggedInUser && loggedInUser.image !== null ? "data:image/png;base64, " + loggedInUser.image: avatar }
                    fluid
                    height={150}
                    width={150}
                    align={"center"}
                    shape={"rounded-circle"}
                    className="mb-2" />
               
                 <CRow className="center text-center" >
                    <CCol md={{ span: 6, offset: 3 }}>
               { editImage ?
                 <CInputGroup className="mb-3 center" width={"50%"}>
                    <CInputGroupText component="image" htmlFor="inputGroupFile01"><span onClick={()=> setEditImage(!editImage)}><CIcon name="cil-x" color="sidebar-dark" /></span></CInputGroupText>
                    <CInput type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg" onChange={handleChange}  />
                    <div className="text-danger"><CFormText className="d-block help-block mt-2 text-danger">{selectedFile !== undefined && selectedFile.size > 1000000 ? 'File too large! Image cannot be larger than 1MB': null}</CFormText></div>
                </CInputGroup> : <div onClick={()=> setEditImage(!editImage)}> <CIcon name="cil-pencil" color="sidebar-dark" /> Change Profile Picture</div> }
                   </CCol>
                </CRow>
                <hr/>
                
                <CRow className="g-3 mb-3 mt-4">
                    <CCol xs>
                        <CLabel htmlFor="firstName" className="float-left">FirstName</CLabel>
                        <CInput placeholder="Enter First name" aria-label="First name" id="firstName" name="firstName" onChange={handleChange} value={formState.values.firstName || ''} />
                        <div><CFormText className="d-block help-block"> {hasError('firstName') ? formState.errors.firstName[0] : null} </CFormText></div>
                    </CCol>
                    <CCol xs>
                       <CLabel htmlFor="lastName" className="float-left">LastName</CLabel>
                        <CInput placeholder="Enter Last name" aria-label="Last name" name="lastName" onChange={handleChange} value={formState.values.lastName || ''} />
                        <div><CFormText className="d-block help-block"> {hasError('lastName') ? formState.errors.lastName[0] : null} </CFormText></div>
                    </CCol>
                    <CCol xs={12}>
                        <CLabel htmlFor="organisation" className="float-left mt-3">Organisation</CLabel>
                        <CInput id="organisation" placeholder="Organisation name" name="organisation" onChange={handleChange} value={formState.values.organisation || ''} />
                        <div><CFormText className="d-block help-block"> {hasError('organisation') ? formState.errors.organisation[0] : null} </CFormText></div>
                    </CCol>
                    <CCol xs={12}>
                        <CLabel htmlFor="address" className="float-left mt-3">Location</CLabel>
                        <CInput id="address" placeholder="Enter your address" name="address" onChange={handleChange} value={formState.values.address || ''} />
                        <div><CFormText className="d-block help-block"> {hasError('address') ? formState.errors.address[0] : null} </CFormText></div>
                    </CCol>
                    <CCol xs={12}>
                        <CLabel htmlFor="email" className="float-left mt-3">Email</CLabel>
                        <CInput id="email" placeholder="Enter email address" name="email" value={loggedInUser? loggedInUser.email : ''} disabled/>
                    </CCol>
                    <CCol xs={12}>
                        <CLabel htmlFor="role" className="float-left mt-3">Role</CLabel>
                        <CInput id="role" placeholder="Enter user role" name="role"  value={loggedInUser ?  loggedInUser.role : ''} disabled/>
                    </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <CButton type="submit" className="px-4 sidebar-dark text-white" disabled={!formState.isValid}>Submit</CButton>
                  </CCol>
                </CRow>
              </CForm>

            </CCardBody>
          </CCard>
        </CCol>

    </CRow>


  )
}

export default UserProfile
