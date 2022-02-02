import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import toast from 'react-hot-toast';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CImg,
  CCol,
  CTabs,
  CNavItem,
  CNav,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CSpinner,
  CModal,
  CModalHeader,
  CForm,
  CModalBody,
  CFormGroup,
  CInput,
  CModalFooter,
  CDataTable,
  CSelect, CProgressBar
} from '@coreui/react'
import Thumbnail from './thumbnail.png';
import {downloadModel, getProjects, updateModel, getProjectUsers} from "../../../actions/projectActions";
import {uploadModelData, downloadModelData} from "../../../actions/modelActions";
import {inviteUser, removeUser} from "../../../actions/authActions";
import CIcon from "@coreui/icons-react";



const Project = (props) => {

  const modelId = props.match.params.modelId;

  const projects = useSelector(state => state.project.projects);
  const users = useSelector(state => state.user.users);
  const loggedInUser = useSelector(state => state.auth.user);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadDataModal, setUploadDataModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [unInviteModal, setUnInviteModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [project, setProject] = useState({});
  const dispatch = useDispatch();

  
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() =>{
    
    let project =  projects.length > 0  ? projects.find(proj => proj.id === Number(props.match.params.projectId)) : {};
    setProject(project)
  
  }, [props.match.params.projectId, projects])

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
  }


  const handleDownload = async (modelId, fileName) => {
    dispatch(downloadModel(modelId, fileName));
  }

  const handleDownloadAssetData = async () => {
    dispatch(downloadModelData(project.model.id, project.title));
  }

  const openUploadModal = () => {
    setUploadModal(!uploadModal);
  }
  const openInviteModal = () => {
    setInviteModal(!inviteModal);
  }
  const openUnInviteModal = (userId) => {
    setSelectedUser(userId);
    setUnInviteModal(!unInviteModal);
  }
  const openUploadAssetModal = () => {
    setUploadDataModal(true);
  }

  const handleInvite = async (event) =>{
    event.preventDefault();
    const user = users && users.length > 0 ? users.find(item => item.email === formState.values.email) : null;
    if (formState.isValid){
      await dispatch(inviteUser({...formState.values, ...{projectId: project.id, name: user.name, role: user.role}})).then(async () => {
        setFormState({
          isValid: false,
          values: {},
          touched: {},
          errors: {}
        });
        setInviteModal(false);
        await dispatch(getProjects());
        await setUpdated(true);

      });
    }

  }


  const handleUnInviteUser = async (event) => {
    event.preventDefault();
    dispatch(removeUser({projectId: project.id, userId: selectedUser})).then(async()=>{
      await setUnInviteModal(false);
      await setUpdated(true);
      setSelectedUser(0);
      dispatch(getProjects());
    });
  }

  const handleUpload = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('sourceData', selectedFiles);
    formData.append('title', formState.values.title);
    try {
      setUploading(true);
      await dispatch(updateModel(project.model.id, formData)).then((response) => {
        setUploading(false);
        setUploadModal(false);
        setFormState({
          isValid: false,
          values: {},
          touched: {},
          errors: {}
        });
        setSelectedFiles(undefined);
        setUpdated(true);
      });
      
    }
    catch(error){
      toast.error("error uploading model");
    }
    
    
  };

 const handleUploadAssetData = async (event) => {
   event.preventDefault();
   let formData = new FormData();
   formData.append('file', selectedFiles);
   try {
    setUploading(true);
    await dispatch(uploadModelData(project.model.id, formData)).then(()=>{
      setUploading(false);
      setUploadDataModal(false);
      setFormState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });
      setSelectedFiles(undefined);
      setUpdated(true);
    });
   }
    catch(error){
      toast.error("error uploading asset data");
    }
   
 }

  useEffect(() => {
    if(loggedInUser.role !== 'admin'){
      dispatch(getProjectUsers(props.match.params.projectId))
    }
    
  }, [props.match.params.projectId, loggedInUser, dispatch])

  useEffect(() => {

    setFormState(formState => ({
      ...formState,
      isValid:  true,
      errors:  {}
    }));

    if(updated){
      dispatch(getProjects());
    }

  }, [updated, props.match.params.projectId, dispatch]);


  return (
    <>
    
     <CRow>
      <CCol xs="12" xl="12" className="my-4 border-bottom mb-4">
        <h1 className="text-uppercase font-2xl py-2">{project ? project.title: 'Model'}</h1>
        <h2 className="py-2 font-xl"><b>Description:</b> {project ? project.description: null}</h2>
        <h2 className="py-2 font-xl"><b>Location:</b> {project ? project.address: null} </h2>
    
        <span className="float-right">
           {project ?
             <CButtonGroup>
               {loggedInUser && loggedInUser.role === "admin" ?<CButton color="warning" className="text-white" onClick={handleDownloadAssetData}>
               <i className="fa fa-download"></i> Download Asset Data
               </CButton>: null}
               {loggedInUser && loggedInUser.role === "admin" ? <CButton color="info" className="text-white" onClick={() => openUploadAssetModal()}><i className="fa fa-upload"></i> Upload Assets Data</CButton>: null}
               <CLink to={'/project/model/'+ modelId + '/assets'}> <CButton color="primary" className="sidebar-dark text-white"><i className="fa fa-eye"></i> View Assets Data</CButton></CLink>
             </CButtonGroup>
           : null }
        </span>
      </CCol>
 
     </CRow>
      {project && project.model ?
        (<CRow>
          <CCol xs="12" xl="6" className="align-content-end m-auto">
            <CCard className="card-accent-dark shadow-lg" size="lg">
              <CCardHeader className="text-center">
                <div className="d-block my-3">
                  {project.model.title} ({project.model.fileName})
                </div>
                {loggedInUser && loggedInUser.role === "admin" && project ? <CButtonGroup>

                <CButton color="info" onClick={() => openUploadModal()}>
                    Update Model
                  </CButton> 
                   <CButton color="light" onClick={() => handleDownload(project.model.id, project.model.fileName)}>Download Model</CButton>
                </CButtonGroup>: null}

              </CCardHeader>
              <CCardBody className="text-center">
                <CLink to={'/model/'+ project.model.fileName + '/' +modelId+ '/viewer'}>
                  <CImg
                    src={Thumbnail}
                    align="center"
                    fluid
                    className="mx-auto my-auto w-100"
                  />
                </CLink>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs="12" xl="6" className="mt-0">
          <CTabs activeTab="home" className="align-items-center ">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="home">
                  Users
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="home">
                <CCard className="shadow-none" size="lg">
                  <CCardBody className="text-left">
                    {loggedInUser && loggedInUser.role === "admin" && project ? <CButton className="float-right button2"  variant="outline" onClick={() => openInviteModal()}>
                      Invite User
                    </CButton> : null}
                    <div className="userSections py-4">
                      <CDataTable
                        items={project && project.user ? project.user: []}
                        fields={ loggedInUser && loggedInUser.role === "admin" ?['name','email', 'role', 'action']: ['name','email', 'role']}
                        itemsPerPage={10}
                        pagination
                        tableFilter
                        sorter
                        hover
                        scopedSlots = {{
                          'action':
                            (item)=>(
                              <td className="px-4">
                                <CButton className="pl-6"  color="warning" variant="ghost" onClick={() => openUnInviteModal(item.id)}><CIcon name="cil-trash" customClasses="c-sidebar-nav-icon"/></CButton>
                              </td>
                            )
                        }}
                        />
                    </div>
                  </CCardBody>
                </CCard>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>

       </CRow>) : <CSpinner />}

      <CModal show={uploadModal}
               onClose={openUploadModal}>
        <CModalHeader closeButton> Upload Model</CModalHeader>
        <CForm onSubmit={handleUpload}>
          <CModalBody>
            <CFormGroup>
              <CInput type="text" id="title" name="title" placeholder="Enter Model Name" onChange={handleChange} value={formState.values.title || ''} required />
            </CFormGroup>
            <CFormGroup>
              <input type="file" name="model" id="model" accept=".ifc" onChange={handleChange} required />
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
      <CModal show={inviteModal}
              onClose={openInviteModal}>
        <CModalHeader closeButton>Invite User ({project? project.title : null})</CModalHeader>
        <CForm onSubmit={handleInvite}>
          <CModalBody>
            <CFormGroup>
              <CSelect
                custom
                name="email"
                id="email"
                autoComplete="email"
                onChange={handleChange}
                value={formState.values.email || ''}
                required
              >
                <option value="">Please select</option>
                {users && users.length > 0 ? users.map(user => user.role !== 'admin' ?
                  <option value={user.email} key={user.id}>{user.email} ({user.role})</option> : null
                ) : ''}
              </CSelect>
            </CFormGroup>

          </CModalBody>
          <CModalFooter>
            <CButton className="text-white bg-info" type="submit">Submit</CButton>{' '}
            <CButton
              color="secondary"
              onClick={() =>  setInviteModal(false)}
            >Cancel</CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      <CModal show={uploadDataModal}
              onClose={openUploadAssetModal}>
        <CModalHeader closeButton> Upload CSV File</CModalHeader>
        <CForm onSubmit={handleUploadAssetData}>
          <CModalBody>
            <CFormGroup>
              <input type="file" name="csvFile" id="csvFile" accept=".csv" onChange={handleChange} required />
            </CFormGroup>
            {uploading ? 
              <div className="float-left"><CSpinner size="sm"/> Uploading...</div> 
             : null } 
          </CModalBody>
          <CModalFooter>
            <CButton className="text-white bg-info" type="submit">Submit</CButton>{' '}
            <CButton
              color="secondary"
              onClick={() =>  setUploadDataModal(false)}
            >Cancel</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
      <CModal
        show={unInviteModal}
        onClose={setUnInviteModal}
      >
        <CModalHeader closeButton> Confirm</CModalHeader>
        <CModalBody>Are you sure you want to remove this user from this project? </CModalBody>
        <CModalFooter>
          <CButton className="text-white bg-danger" type="submit" onClick={handleUnInviteUser}>Yes</CButton>{' '}
          <CButton
            color="secondary"
            onClick={() =>  setUnInviteModal(false)}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>

    </>


  )
}

export default Project
