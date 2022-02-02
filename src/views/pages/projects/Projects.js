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
const defaultAssetfields = ["TIES_0101_DesPh_Category", 
"TIES_0105_DesPh_UniqueAssetID", "TIES_0111_DesPh_DesignedBy", "TIES_0111_DesPh_ContactNumber", "TIES_0115_DesPh_Status",
 "TIES_0116_DesPh_MaterialAndEC","IES_0201_ManPh_Manufacturer", "TIES_0207_ManPh_ManufacturedBy", "TIES_0208_ManPh_ManufacturedByContactNumber", "TIES_0215_ManPh_WarehouseAddress", "TIES_0217_ManPh_StoredBy", "TIES_0218_ManPh_StoredByContactNumber",
 "TIES_0301_DelPh_DeliveryCompanyName", "TIES_0306_DelPh_CollectedBy", "TIES_0307_DelPh_CollectedByContactNumber", "TIES_0309_DelPh_VehicleRegistrationNumber",
 "TIES_0401_InsPh_ConstructionSiteName", "TIES_0402_InsPh_ConstructionSiteAddress", "TIES_0405_InsPh_CollectedBy", "TIES_0406_InsPh_CollectedByContactNumber", "TIES_0414_InsPh_CraneType", "TIES_0426_InsPh_InstallationDateInstalledBy", "TIES_0427_InsPh_InstallationDateInstalledByContactNumber"
];

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
    let formData = !!selectedOption ? {...formState.values,...{assetFields: selectedOption.map(item => item.id)}} : formState.values
    if (formState.isValid && !!selectedOption){
      
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
            <CLabel htmlFor="hf-email">Title</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="title" name="title" placeholder="Enter Project Title" onChange={handleChange} value={formState.values.title || ''} required />
            <CValidFeedback>Looks good! </CValidFeedback>
            <CInvalidFeedback> Please enter valid title </CInvalidFeedback>
            <CFormText className="help-block"> {hasError('title') ? formState.errors.title[0] : 'Please enter title'} </CFormText>
          </CCol>
          <CCol md="3">
            <CLabel htmlFor="description">Description</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="description" name="description" placeholder="Project Description" onChange={handleChange} value={formState.values.description || ''} required/>
            <CFormText className="help-block">{hasError('description') ? formState.errors.description[0] : 'Please enter description'}</CFormText>
          </CCol>
          <CCol md="3">
            <CLabel htmlFor="address">Address</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput type="text" id="address" name="address" placeholder="Project Address" onChange={handleChange} value={formState.values.address || ''} required />
            <CFormText className="help-block">{hasError('address') ? formState.errors.address[0] : 'Please enter address'}</CFormText>
          </CCol>
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
           <CButton className="float-right sidebar-dark" color="primary" size="lg" onClick={()=> setModal(true)}>
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
        </CRow>
         


    </>
  )
}

export default Projects
