import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import validate from 'validate.js';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CValidFeedback,
  CInvalidFeedback,
  CInput,
  CFormText,
  CSpinner,
  CModalFooter, CImg, CCardHeader, CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import Multiselect from 'multiselect-react-dropdown';
import {createProject, updateProject, deleteProject, uploadModel, getProjects} from '../../../actions/projectActions';
import Thumbnail from "../project/thumbnail.png";


const schema = {
  title: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
  description: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 32
    }
  },
}


const Projects = () => {
  const [modal, setModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [projecti, setProject] = useState({});
  const [uploadModal, setUploadModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOption, setSelected] = useState(null);
  const datapoints = useSelector(state => state.assetField.assetFields);
  const projectt = useSelector(state => state.project.projects)
  const [update, setUpdated] = useState(false);
  
  const [projectDatapoints, setDatapoints] = useState([]);
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const loggedInUser = useSelector(state => state.auth.user);
  
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
    if(update){
      dispatch(getProjects());
      setUpdated(false);
    }

  }, [formState.values, update]);
  



  const handleAddProject = async(event) => {
    event.preventDefault();
    console.log(formState)
    let formData = !!selectedOption ? {...formState.values,...{assetFields: selectedOption.map(item => item.id)}} : formState.values
    if (formState.isValid){
      await dispatch(createProject(formData));
    }
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    await setModal(false);
    setUpdated(true);
  };
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  const handleUpdateProject = async (event) => {
    event.preventDefault();
    if (formState.isValid){
  
      let data = JSON.stringify({title: formState.values.title, address: formState.values.address, description: formState.values.description}, getCircularReplacer());
      await dispatch(updateProject(projecti.id, data));
    }
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    await setSelected(null);
    await setProjectModal(false);
    setUpdated(true);
  };

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
            ? setSelectedFiles(event.target.files[0])
           : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));

  };


  const openUploadModal = (project) => {
    setUploadModal(!uploadModal);
    setProject(project);
  }

  const handleEdit = (project) => {
    setProjectModal(true);
    setProject(project);
    setFormState({
      isValid: true,
      values: project,
      touched: {},
      errors: {}
    });
  }
  const handleCloseEdit = () => {
    setProjectModal(false);
    setProject({});
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
  }

  const openDeleteModal =(project) => {
    setModal(false);
    setDeleteModal(true);
    setProject(project);
  };
  const handleDelete = async () => {
   
    if(projecti.id){
      await dispatch(deleteProject(projecti.id));
      await setProject({});
      await dispatch(getProjects());
    }
    setDeleteModal(false);
  
  }

  const handleUpload = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('sourceData', selectedFiles);
    formData.append('title', projecti.title);
    formData.append('projectId', projecti.id);
    dispatch(uploadModel(formData));
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    setUpdated(true);
  };


  const projectForm = (handleSubmit, editMode) => {
    return (
      <CForm className="form-horizontal" onSubmit={handleSubmit}>
        <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="hf-email">Project Name</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="title" name="title" placeholder="Enter Project Name" onChange={handleChange} value={formState.values.title || ''} required />
            <CValidFeedback>Looks good! </CValidFeedback>
            <CInvalidFeedback> Please enter valid title </CInvalidFeedback>
            <CFormText className="help-block"> {hasError('title') ? formState.errors.title[0] : null} </CFormText>
          </CCol>
          <CCol md="3">
            <CLabel htmlFor="projectId">Project ID</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="projectId" name="projectId" placeholder="Project ID" onChange={handleChange} value={formState.values.projectId || ''} required/>
            <CFormText className="help-block">{hasError('projectId') ? formState.errors.projectId[0] : null}</CFormText>
          </CCol>
          <CCol xs="12" className="my-3 border-top"></CCol>
          <CCol xs="12"><CLabel className="uppercase font-bold py-2" color="primary">Project details</CLabel></CCol>
          <CCol md="3">
            <CLabel htmlFor="description">Description of proposed works</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="description" name="description" placeholder="Project description" onChange={handleChange} value={formState.values.description || ''} required />
            <CFormText className="help-block">{hasError('description') ? formState.errors.description[0] : null}</CFormText>
          </CCol>
          <CCol md="3">
            <CLabel htmlFor="address">Project Address</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="address" name="address" placeholder="Project address" onChange={handleChange} value={formState.values.address || ''} required />
            <CFormText className="help-block">{hasError('address') ? formState.errors.address[0] : null}</CFormText>
          </CCol>
          <CCol md="3">
            <CLabel htmlFor="client">Client</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="client" name="client" placeholder="Client" onChange={handleChange} value={formState.values.client || ''} required />
            <CFormText className="help-block">{hasError('client') ? formState.errors.client[0] : null}</CFormText>
          </CCol>
          <CCol md="3">
            <CLabel htmlFor="client">Agent</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="agent" name="agent" placeholder="Agent" onChange={handleChange} value={formState.values.agent || ''} required />
            <CFormText className="help-block">{hasError('agent') ? formState.errors.agent[0] : null}</CFormText>
          </CCol>
          <CCol xs="12" className="my-3 border-top"></CCol>
          <CCol md="3" className="mt-3">
            <CLabel htmlFor="purposeGroup" className="uppercase font-bold">Purpose Group</CLabel>
          </CCol>
          <CCol xs="12" md="9" className="mt-3">
            <CInput type="text" id="purposeGroup" name="purposeGroup" placeholder="Purpose Group" onChange={handleChange} value={formState.values.purposeGroup || ''} required />
            <CFormText className="help-block">{hasError('purposeGroup') ? formState.errors.purposeGroup[0] : null}</CFormText>
          </CCol>
          {/* </span> */}
        </CFormGroup>
        <CModalFooter>
          <CButton className="text-white sidebar-dark" type="submit">Submit</CButton>{' '}
          <CButton
            color="secondary"
            onClick={() =>  editMode === 'edit' ? handleCloseEdit()  : setModal(false)}
          >Cancel</CButton>
        </CModalFooter>
      </CForm>
    )
  }

  const projects = useSelector(state => state.project.projects);

  return (
    <>

      <CRow>
        <CCol xs="12" xl="12" className="my-4 border-bottom mb-5">
           <CButton className="float-right sidebar-dark" color="primary" size="md" onClick={()=> setModal(true)}>
            Add New Project
          </CButton> 
          <h1>Projects</h1>
        </CCol>
       </CRow>
       <CRow>
          {projects && projects.length > 0 ?
          (projects.map((item, index) => (
                <CCol xs="6" xl="4" lg={4} md={3} className="my-2 border-bottom mb-5" key={index}>
                    <CCard>
                      <CCardHeader>{item.name}</CCardHeader>
                      <CCardBody>
                       <CLink to={"/viewer/"+ item.viewerurn}> <CImg src={"data:image/png;base64, "+ item.thumbnail}></CImg></CLink>
                      </CCardBody>
                    </CCard>
                </CCol>
            
          ))):<CSpinner />}

          <CModal
            show={modal}
            onClose={setModal}
          >
            <CModalHeader closeButton>
              <CModalTitle>Create New FireBIM Project</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {projectForm(handleAddProject, "add")}
            </CModalBody>

          </CModal>
        </CRow>
      


    </>
  )
}

export default Projects
