import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow, CSwitch, CSpinner, CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CButton, CFormText
} from '@coreui/react'
import {changePassword} from "../../../actions/authActions";
import CIcon from "@coreui/icons-react";
import validate from "validate.js";

const schema = {
  formerPassword:  {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
  newPassword: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      minimum: 6,
      maximum: 32
    }
  },
  confirmPassword: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32,
      minimum: 6,
      message: "must be at least 6 characters"
    },
    equality: 'newPassword'
  }
}


const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState('password')
  const loggedInUser = useSelector(state => state.auth.user);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
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
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChangePassword = (event) => {
    event.preventDefault();
    if(formState.isValid) {
      dispatch(changePassword(formState.values))
    }
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
  }

  return (

    <CRow>

        <CCol xs="12" xl="6" className="align-content-center m-auto">
          <CCard className="card-accent-dark shadow-lg" size="lg">
            <CCardHeader className="text-center">
              <div className="d-block my-3">
                Change Password
              </div>
            </CCardHeader>
            <CCardBody className="text-center">
              <CForm onSubmit={handleChangePassword}>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type={inputType} name="formerPassword" placeholder="Current Password" autoComplete="current-password" onChange={handleChange} value={formState.formerPassword} />
                  <CFormText className="help-block"> {hasError('formerPassword') ? formState.errors.formerPassword[0] : null} </CFormText>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type={inputType} name="newPassword" placeholder="New Password" autoComplete="new-password"  onChange={handleChange} value={formState.newPassword}/>
                  <CFormText className="help-block"> {hasError('newPassword') ? formState.errors.newPassword[0] : null} </CFormText>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type={inputType} name="confirmPassword" placeholder="Confirm Password" autoComplete="confirm-password"  onChange={handleChange} value={formState.confirmPassword}/>
                  <div><CFormText className="d-block help-block"> {hasError('confirmPassword') ? formState.errors.confirmPassword[0] : null} </CFormText></div>
                </CInputGroup>
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

export default ChangePassword
