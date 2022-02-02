import React from "react";
import PropTypes from "prop-types";
import {CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CButton, 
  CForm, CFormGroup, CCol, CLabel, CInput, CValidFeedback, CFormText, CInvalidFeedback
} from '@coreui/react';



const ProjectModal = ({ showModal, closeModal, setModal, editMode, project, handleProject , formState, hasError, handleChange}) => {
 
  const ProjectForm =  (
    <CForm className="form-horizontal" onSubmit={handleProject}>
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
      <CFormGroup className="float-right pt-3">
      <CButton className="text-white sidebar-dark" type="submit">Submit</CButton>{' '}
          <CButton
            color="secondary"
            onClick={() =>  setModal(false)}
          >Cancel</CButton>
      </CFormGroup>
      
  </CForm>
  );

  return (
    <CModal
    show={showModal}
    onClose={()=>{setModal(false)}}
     >
        <CModalHeader closeButton>
        <CModalTitle className="text-lg-center">{project.title ? project.title: 'Add New Project'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
           {ProjectForm}
        </CModalBody>
        
    </CModal>
)}

ProjectModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    handleProject: PropTypes.func.isRequired
  };
  
export default ProjectModal;