import React from "react";
import PropTypes from "prop-types";
import {CForm, CFormGroup, CCol, CLabel, CInput, CValidFeedback, CFormText, CInvalidFeedback} from '@coreui/react';

const ProjectForm = (handleSubmit, formState, hasError, handleChange) => {
   
    return (
    <CForm className="form-horizontal" onSubmit={handleSubmit}>
        <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="hf-email">Title</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="title" name="title" placeholder="Enter Project Title" onChange={handleChange} value={formState.values.title || ''} required />
            <CValidFeedback>Looks good! </CValidFeedback>
            <CInvalidFeedback> Please enter valid title </CInvalidFeedback>
            <CFormText className="help-block"> {hasError('title') ? formState.errors.title[0] : ''} </CFormText>
          </CCol>
          <CCol md="3">
            <CLabel htmlFor="description">Description</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="description" name="description" placeholder="Project Description" onChange={handleChange} value={formState.values.description || ''} required/>
            <CFormText className="help-block">{hasError('description') ? formState.errors.description[0] : ''}</CFormText>
          </CCol>
          <CCol md="3">
            <CLabel htmlFor="address">Location</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="address" name="address" placeholder="Project Location" onChange={handleChange} value={formState.values.address || ''} required />
            <CFormText className="help-block">{hasError('address') ? formState.errors.address[0] : ''}</CFormText>
          </CCol>
          
        </CFormGroup>
        
      </CForm>
)
    }

ProjectForm.propTypes = {
    // editMode: PropTypes.string.isRequired,
    hasError: PropTypes.func.isRequired,
    formState: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };
  
export default ProjectForm;