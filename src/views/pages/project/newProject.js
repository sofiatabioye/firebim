import React, { useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import {
  CButton, CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CImg,
  CCol,
  CRow, CSwitch
} from '@coreui/react'
import Thumbnail from './thumbnail.png';

const BASE_API_URL = "https://adims.herokuapp.com/api";

const Project = () => {
  const [activeIndex] = useState(1)


  const handleDownload = async () => {
    toast.success('Download started! Please wait...')
    return await  axios.get(BASE_API_URL+ "/model/download", )
      .then(function (response) {
        toast.success('Downloading file..');
        const link = document.createElement("a");
        link.target = "_blank";
        link.download = response.data.filename;
        link.href = URL.createObjectURL(new Blob(response.data.buffer.data, {type:'application/octet-stream'}));
        link.click();
        toast.success('Download successful')
        return response;
      })
      .catch(function (error) {
        console.log(error);
        toast.error('downlaod failed');
      });
  }

  return (
    <CRow>

      <CCol xs="12" xl="12" className="my-4 border-bottom mb-5">
        <CButton className="float-right button2"  variant="outline">
          Upload New Model
        </CButton>
        <h1>Models</h1>
      </CCol>

      <CCol xs="12" xl="4" className="align-content-center m-auto">
        <CCard className="card-accent-dark shadow-lg">
          <CCardHeader className="text-center">
            <div className="d-block my-3">
              NewBridgeIFC.ifc
            </div>
            <CButtonGroup>
              <CLink to={'/project/model/asset'}> <CButton className="sidebar-dark text-white">View Assets Data</CButton></CLink>
              <CButton color="light">Download Asset Data</CButton>
            </CButtonGroup>

          </CCardHeader>
          <CCardBody className="text-center">
            <CLink to={'/model/viewer'}>
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

    </CRow>


  )
}

export default Project
