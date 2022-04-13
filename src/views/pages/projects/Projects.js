import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import validate from 'validate.js';
import {
  CButton,
  CCard,
  CCardBody,
  CDataTable,
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
  CModalFooter, CImg, CCardHeader, CLink, CSelect, CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import Multiselect from 'multiselect-react-dropdown';
import {createProject, updateProject, deleteProject, uploadModel, getProjects} from '../../../actions/projectActions';
import { Link } from 'react-router-dom';


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
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOption, setSelected] = useState(null);
  const [editMode, setEditMode] = useState('add');
  const [update, setUpdated] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  
  const fields = ['projectTitle','purposeGroup', 'address','actions']
  
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
  

  const options=  [{name: '1(a) Flat', id: 1, category: 'Residential (Dwellings)'},
                   {name: '1(b) Terraced Building', id: 2, category: 'Residential (Dwellings)'},
                   {name: '1(c) Semi-Detached', id: 3, category: 'Residential (Dwellings)'},
                   {name: '2(a) Office Building', id: 4, category: 'Residential (Institutional)'},
                  ]

  const getPurposeGroups = (groupIds) => {
    let groups = groupIds.split(',');
    const groupNames  = groups.map((item) => {
      let option = options.find(i => i.id === parseInt(item))
      if(option){
        return option.name
      }
      return null
    });
    return groupNames.toString()
  }

  const selectedPurposeGroups = (groupIds) => {
    let groups = groupIds.split(',');
    const selectedGroups  = groups.map((item) => {
      return options.find(i => i.id === parseInt(item))
    });
    return selectedGroups
  }

  const handleAddProject = async(event) => {
    event.preventDefault();
    
    if(formState.isValid && !!selectedOption){
      let purposeGroup = selectedOption.selected.map(item => item.id).join(',');
      let formData = {...formState.values, ...{purposeGroup}}
      await dispatch(createProject(formData));
      setFormState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });
      setModal(false);
      setUpdated(true);
    }
    
  };
  const handleUpdateProject = async (event) => {
    event.preventDefault();
    
    if (formState.isValid && !!selectedOption){
        let purposeGroup = selectedOption.selected?.map(item => item.id).join(',');
        const update = {...formState.values, ...{purposeGroup}}
        await dispatch(updateProject(projecti._id, update)); 
        setSelected(null);
    }
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    setSelected(null);
    setModal(false);
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
    setModal(true);
    setProject(project);
    setSelected(!!project.purposeGroup ? selectedPurposeGroups(project.purposeGroup): {})
    setEditMode("edit")
    setFormState({
      isValid: true,
      values: project,
      touched: {},
      errors: {}
    });
    
  }
  const handleCloseEdit = () => {
    setModal(false);
    setProject({});
    setEditMode("add");
    setSelected(null);
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
    if(projecti._id){
      await dispatch(deleteProject(projecti._id));
      await setProject({});
      await dispatch(getProjects());
    }
    setDeleteModal(false);
  
  }
  const openViewModal = (project) => {
    setModal(false)
    setDeleteModal(false)
    setUploadModal(false)
    setViewModal(true)
    setProject(project)
  }

  const  handleSelected = (selected) => {
    setSelected({ selected });
  };


  const handleUpload = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('model', selectedFiles);
    formData.append('projectId', projecti._id);
    dispatch(uploadModel(formData));
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    setUpdated(true);
    dispatch(getProjects());
  };


  const projectForm = (handleSubmit) => {
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
            
            <CTextarea type="text" id="description" name="description" placeholder="Project description" onChange={handleChange} value={formState.values.description || ''} required />
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
          <Multiselect
            options={options} // Options to display in the dropdown
            selectedValues={selectedOption} // Preselected value to persist in dropdown
            onSelect={handleSelected} // Function will trigger on select event
            showCheckbox={true}
            groupBy={'category'}
            placeholder={"Select purpose group"}
            displayValue="name" // Property name to display in the dropdown options
            id="purposeGroup" 
            name="purposeGroup"
            required
            />
            {/* <CInput type="text" id="purposeGroup" name="purposeGroup" placeholder="Purpose Group" onChange={handleChange} value={formState.values.purposeGroup || ''} required /> */}
            <CFormText className="help-block">{hasError('purposeGroup') ? formState.errors.purposeGroup[0] : null}</CFormText>
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
           <CButton className="float-right sidebar-dark" color="primary" size="md" onClick={()=> setModal(true)}>
            Add New Project
          </CButton> 
          <h1>Projects</h1>
        </CCol>
       </CRow>
       <CRow>
          {projects && projects.length > 0 ?
          
          (
          //   projects.map((item, index) => (
          //       <CCol xs="6" xl="4" lg={4} md={3} className="my-2 border-bottom mb-5" key={index}>
          //           <CCard>
          //             <CCardHeader>{item.name}</CCardHeader>
          //             <CCardBody>
          //              <CLink to={"/viewer/"+ item.viewerurn}> <CImg src={"data:image/png;base64, "+ item.thumbnail}></CImg></CLink>
          //             </CCardBody>
          //           </CCard>
          //       </CCol>
            
          // ))
          <CDataTable
            items={projects}
            fields={fields}
            itemsPerPage={10}
            pagination
            tableFilter
            sorter
            hover
            scopedSlots = {{
              'projectTitle':
              (item) => (
                <td>
                {!!item.thumbnail ? <CImg
                src={"data:image/png;base64, "+item.thumbnail}
                align="left"
                fluid
                height={50}
                width={50}
                className="border block mr-2"
              />: null }{!!item.thumbnail ? <Link to={{pathname: "/projects/viewer/"+item.viewerurn, state: {project: item, isRef: false} }}><CLabel className="mt-2 block font-bold">{item.title}</CLabel></Link>: <CLabel className="mt-2 block font-bold">{item.title}</CLabel>}</td>
              ),
              'purposeGroup':
              (item) => (
                <td>{getPurposeGroups(item.purposeGroup)}</td>
              ),
              'actions':
                (item)=>(
                  <td className="px-4">
                    <CButton className="" color="info" variant="ghost" onClick={() => openViewModal(item)}><CIcon name="cil-description" color="info" customClasses="c-sidebar-nav-icon" /></CButton>
                   <CButton className="" color="primary" variant="ghost" onClick={() => handleEdit(item)}><CIcon name="cil-pencil" color="primary" customClasses="c-sidebar-nav-icon" /></CButton>
                   <CButton className="" color="info" variant="ghost" onClick={() => openUploadModal(item)}><FontAwesomeIcon icon={faCloudUploadAlt}></FontAwesomeIcon> {!item.modelStorageId ?  'Upload Model' : 'Update Model'}</CButton>
                   <CButton className="pr-3" color="danger" variant="ghost" onClick={() => openDeleteModal(item)}><CIcon name="cil-trash" customClasses="c-sidebar-nav-icon"/></CButton>
                  </td>
                )
            }}
        />
          )
          :<CSpinner />}

          <CModal
            show={modal}
            onClose={handleCloseEdit}
          >
            <CModalHeader closeButton>
              <CModalTitle>{editMode=== 'edit' ? 'Edit '+ projecti.title+ ' Project' : 'Create New FireBIM Project'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
               {projectForm(editMode=== 'add' ? handleAddProject: handleUpdateProject)}
            </CModalBody>
          </CModal>
          <CModal
            show={deleteModal}
            onClose={setDeleteModal}
            alignment="center"
          >
             <CModalHeader>
             <CModalTitle>Delete {projecti.title}</CModalTitle>
            </CModalHeader> 
            <CModalBody>
            Are you sure you want to delete this project? 
               {/* {projectForm(editMode=== 'add' ? handleAddProject: handleUpdateProject)} */}
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" onClick={handleDelete}>
                Yes
              </CButton>
              <CButton color="primary" onClick={() => setDeleteModal(false)}>No</CButton>
            </CModalFooter>
          </CModal>
          <CModal show={uploadModal}
              onClose={openUploadModal}>
              <CModalHeader closeButton> Upload Model</CModalHeader>
              <CForm onSubmit={handleUpload}>
                <CModalBody>
                  <CFormGroup>
                    <input type="file" name="model" id="model" accept=".rvt" onChange={handleChange} required />
                  </CFormGroup>
                  {uploading ? 
                    <div className="float-left"><CSpinner size="sm"/> Uploading...</div> 
                  : null } 
                </CModalBody>
                <CModalFooter>
                  <CButton className="text-white bg-info" type="submit">Submit</CButton>{' '}
                  <CButton
                    color="secondary"
                    onClick={() =>  setUploadModal(false)}
                  >Cancel</CButton>
                </CModalFooter>
              </CForm>
      </CModal>
          <CModal
            show={viewModal}
            onClose={setViewModal}
          >
            <CModalHeader closeButton>
              <CModalTitle>{projecti?.title} Project</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                <CCol xs="12" md="4">
                  <CLabel><b>Project ID</b></CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CLabel>{projecti.projectId}</CLabel>
                </CCol>
                <CCol xs="12" className="my-3 border-top"></CCol>
                <CCol xs="12" md="4">
                  <CLabel><b>Project Description</b></CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CLabel>{projecti.description}</CLabel>
                </CCol>
                <CCol xs="12" md="4">
                  <CLabel><b>Project Address</b></CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CLabel>{projecti.address}</CLabel>
                </CCol>
                <CCol xs="12" md="4">
                  <CLabel><b>Project Client</b></CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CLabel>{projecti.client}</CLabel>
                </CCol>
                <CCol xs="12" md="4">
                  <CLabel><b>Project Agent</b></CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CLabel>{projecti.agent}</CLabel>
                </CCol>
                <CCol xs="12" className="my-3 border-top"></CCol>
                <CCol xs="12" md="4">
                  <CLabel><b>Project Purpose Group</b></CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CLabel>{!!projecti.purposeGroup ? getPurposeGroups(projecti.purposeGroup): ''}</CLabel>
                </CCol>
              </CRow>
            </CModalBody>

          </CModal>

        </CRow>
      
         

    </>
  )
}

export default Projects
