import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faUsers } from "@fortawesome/free-solid-svg-icons";




const Dashboard = (props) => {
  const projects = useSelector(state => state.project.projects);

 

  return (
    <>
     <CRow>
       <CCol xs="6" lg={'6'} className="h-50">
         <CCard accentColor="primary" textColor="primary">
           <CCardBody>
             <CRow style={{textAlign:"center"}}>
               <CCol lg="3" md="3" sm="12"> <FontAwesomeIcon icon={faBuilding} size="2x" /></CCol>
               <CCol lg="9" md="9" sm="12"> <span className="text-lg text-lg-center"> {projects ? projects.length: 'Loading...'} </span>
                 <span className="d-block text-uppercase text-muted font-weight-bold text-sm-start">Project</span></CCol>
             </CRow>

           </CCardBody>
         </CCard>
       </CCol>
       <CCol xs="6" lg={'6'} className="h-50">
         <CCard accentColor="info" textColor="info">
           <CCardBody>
           <CRow style={{textAlign:"center"}}>
             <CCol lg="3" md="3" sm="12"><FontAwesomeIcon icon={faUsers} size="2x"/> </CCol>
             <CCol lg="9" md="9" sm="12">
                 <span className="text-lg text-lg-center"> 3 </span>
                 <span className="d-block text-uppercase text-muted font-weight-bold text-sm-start"> Users</span>
             </CCol>
           </CRow>
           </CCardBody>
         </CCard>
       </CCol>
       <CCol xs="12" lg={'12'} className="h-50">
         <CCard accentColor="success" textColor="info">
             <CCardHeader>
               <h2>FIRE BIM</h2>
             </CCardHeader>
           <CCardBody>
             About us
           </CCardBody>
         </CCard>
       </CCol>
      
    
     </CRow>
    </>
  )
}


export default Dashboard;
