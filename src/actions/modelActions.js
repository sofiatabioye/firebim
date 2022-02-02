import axios from 'axios';
import toast from 'react-hot-toast';
import Config from '../config';

import {
  UPLOAD_MODEL_DATA_BEGINS,
  UPLOAD_MODEL_DATA_SUCCESS,
  UPLOAD_MODEL_DATA_FAILURE,
  DOWNLOAD_MODEL_DATA_BEGINS,
  DOWNLOAD_MODEL_DATA_FAILURE,
  DOWNLOAD_MODEL_DATA_SUCCESS
} from "./actionTypes";


const BASE_API_URL = Config.BASE_API_URL

/**
 * @export
 * @params {null}
 * @returns {null} upload project model data begins
 */
export function uploadModelDataBegins() {
  return {
    type: UPLOAD_MODEL_DATA_BEGINS,
  };
}
/**
 * @export
 * @params {message}
 * @returns {message} upload project model data success
 */
export function uploadModelDataSuccess(message) {
  return {
    type: UPLOAD_MODEL_DATA_SUCCESS,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {error} upload project model data fails
 */
export function uploadModelDataFailure(error) {
  return {
    type: UPLOAD_MODEL_DATA_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} download project model data begins
 */
export function downloadModelDataBegins() {
  return {
    type: DOWNLOAD_MODEL_DATA_BEGINS,
  };
}
/**
 * @export
 * @params {message}
 * @returns {message} download project model data success
 */
export function downloadModelDataSuccess(message) {
  return {
    type: DOWNLOAD_MODEL_DATA_SUCCESS,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {error} download project model data fails
 */
export function downloadModelDataFailure(error) {
  return {
    type: DOWNLOAD_MODEL_DATA_FAILURE,
    error
  };
}


/**
 * @export
 * @param {projectId}
 * @returns {project} upload model data to project
 */
export function uploadModelData(modelId, data) {
 
  return (dispatch) => {
    dispatch(uploadModelDataBegins());
    return axios.post(BASE_API_URL + "/model/upload-components/"+ modelId, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        dispatch(uploadModelDataSuccess(response.data.message));
        toast.success("Asset data uploaded successfully");
      })
      .catch((error) => {
        
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(uploadModelDataFailure(errorMessage));
        toast.error("Error uploading assets data");
      });
  }
}


/**
 * @export
 * @param {modelId, fileName}
 * @returns {model} download project model data
 */
export function downloadModelData(modelId, fileName) {
  return (dispatch) => {
    dispatch(downloadModelDataBegins());
    toast.success('Download started! Please wait...')
    return  axios.get(BASE_API_URL+ "/model/download-components/"+ modelId)
      .then(function (response) {
        toast.success('Downloading file..');
        const link = document.createElement("a");
        link.target = "_blank";
        link.download = fileName + ".csv";
        link.href = 'data:text/csv;charset=utf-8,' + encodeURI(response.data);
        link.click();
        toast.success('Download successful');
        dispatch(downloadModelDataSuccess("Download successful"));
      })
      .catch(function (error) {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message;
        dispatch(downloadModelDataFailure(errorMessage));
        toast.error('download failed');
      });
  }
}

