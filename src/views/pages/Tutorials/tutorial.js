import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import YoutubeEmbed from '../../components/video/YoutubeEmbed';



const Tutorial = (props) => {
   return (

    <CRow>

        <CCol xs="12" xl="12" className="align-content-center m-auto">
          <CCard className="card-accent-dark shadow-lg" size="lg">
            <CCardHeader className="text-center">
              <div className="d-block my-3">
                TIES BIM Asset Tagging (REVIT)
              </div>
            </CCardHeader>
            <CCardBody className="text-center">
               <div className="py-2">
                   <h3 className="py-2">Step 1</h3>
                   <YoutubeEmbed embedId="3KQaU468PWs" />
               </div>
               
               <div className="py-2">
               <h3 className="py-2">Step 2</h3>
                   <YoutubeEmbed embedId="KFvSxaxHf6U" /></div>
               <div className="py-2">
               <h3 className="py-2">Step 3</h3>
                   <YoutubeEmbed embedId="MhijR8hd2Nc" />
                </div>
               <div className="py-2">
               <h3 className="py-2">Step 4</h3>
                   <YoutubeEmbed embedId="E7Ci42bVtOY" /></div>
               <div className="py-2">
               <h3 className="py-2">Step 5</h3>
                   <YoutubeEmbed embedId="P5uiRvrXu3E" /></div>
               <div className="py-2">
               <h3 className="py-2">Step 6</h3>
                   <YoutubeEmbed embedId="zgWKOPLf2go" /></div>
               <div className="py-2">
               <h3 className="py-2">Step 7</h3>
                   <YoutubeEmbed embedId="YA9pEY8jIHk" /></div>
               <div className="py-2">
               <h3 className="py-2">Step 8</h3>
                   <YoutubeEmbed embedId="LLrGkziBQF4" /></div>
               <div className="py-2">
                  <h3 className="py-2">Step 9</h3>
                   <YoutubeEmbed embedId="7hu5uFj0N9M" />
               </div>
             
            </CCardBody>
          </CCard>
        </CCol>

    </CRow>


  )
}

export default Tutorial
