import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import YoutubeEmbed from '../../components/video/YoutubeEmbed';



const WebTutorial = (props) => {
   return (

    <CRow>

        <CCol xs="12" xl="12" className="align-content-center m-auto">
          <CCard className="card-accent-dark shadow-lg" size="lg">
            <CCardHeader className="text-center">
              <div className="d-block my-3">
                TIES Cloud-based Logistics
              </div>
            </CCardHeader>
            <CCardBody className="text-center">
               <YoutubeEmbed embedId="HyX210K6LVc" />
            </CCardBody>
          </CCard>
        </CCol>

    </CRow>


  )
}

export default WebTutorial
