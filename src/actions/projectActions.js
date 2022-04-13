import axios from 'axios';
import toast from 'react-hot-toast';
import Config from '../config';

import {
  GET_PROJECTS_BEGINS, GET_PROJECTS_FAIL, GET_PROJECTS_SUCCESS,
  ADD_PROJECT_BEGINS, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE,
  UPDATE_PROJECT_BEGINS,UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_BEGINS, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE,
  UPLOAD_MODEL_BEGINS, UPLOAD_MODEL_SUCCESS, UPLOAD_MODEL_FAILURE,
  UPDATE_PROJECT_MODELS_BEGINS, UPDATE_PROJECT_MODELS_SUCCESS, UPDATE_PROJECT_MODELS_FAILURE,
  DOWNLOAD_MODEL_BEGINS, DOWNLOAD_MODEL_SUCCESS, DOWNLOAD_MODEL_FAILURE,
  GET_PROJECT_USERS_BEGINS, GET_PROJECT_USERS_SUCCESS, GET_PROJECT_USERS_FAILURE, GET_ACCESS_TOKEN
} from "./actionTypes";

const BASE_API_URL = Config.BASE_API_URL
/**
 * @export
 * @params {null}
 * @returns {null} get project begins
 */
export function getProjectsBegins() {
  return {
    type: GET_PROJECTS_BEGINS,
  };
}
/**
 * @export
 * @params {projects, message}
 * @returns {projects} get project begins
 */
export function getProjectsSuccess(projects, message) {
  return {
    type: GET_PROJECTS_SUCCESS,
    projects,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} get project begins
 */
export function getProjectsFailure(error) {
  return {
    type: GET_PROJECTS_FAIL,
    error
  };
}
/**
 * @export
 * @params {null}
 * @returns {null} get project users begins
 */
 export function getProjectUsersBegins() {
  return {
    type: GET_PROJECT_USERS_BEGINS,
  };
}
/**
 * @export
 * @params {project, message}
 * @returns {project} get project users success
 */
export function getProjectUsersSuccess(users, id, message) {
  return {
    type: GET_PROJECT_USERS_SUCCESS,
    users,
    id,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} get project users fails
 */
export function getProjectUsersFailure(error) {
  return {
    type: GET_PROJECT_USERS_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} add project begins
 */
export function addProjectBegins() {
  return {
    type: ADD_PROJECT_BEGINS,
  };
}
/**
 * @export
 * @params {project, message}
 * @returns {project} add project success
 */
export function addProjectSuccess(project, message) {
  return {
    type: ADD_PROJECT_SUCCESS,
    project,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} add project fails
 */
export function addProjectFailure(error) {
  return {
    type: ADD_PROJECT_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} update project begins
 */
export function updateProjectBegins() {
  return {
    type: UPDATE_PROJECT_BEGINS,
  };
}
/**
 * @export
 * @params {project, message}
 * @returns {project} update project success
 */
export function updateProjectSuccess(project, id, message) {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    project,
    id,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} update project fails
 */
export function updateProjectFailure(error) {
  return {
    type: UPDATE_PROJECT_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} delete project begins
 */
export function deleteProjectBegins() {
  return {
    type: DELETE_PROJECT_BEGINS,
  };
}
/**
 * @export
 * @params {project, message}
 * @returns {project} delete project success
 */
export function deleteProjectSuccess(message, id) {
  return {
    type: DELETE_PROJECT_SUCCESS,
    message,
    id
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} delete project fails
 */
export function deleteProjectFailure(error) {
  return {
    type: DELETE_PROJECT_FAILURE,
    error
  };
}


/**
 * @export
 * @params {null}
 * @returns {null} upload project model begins
 */
export function uploadModelBegins() {
  return {
    type: UPLOAD_MODEL_BEGINS,
  };
}
/**
 * @export
 * @params {message}
 * @returns {message} upload project model success
 */
export function uploadModelSuccess(message) {
  return {
    type: UPLOAD_MODEL_SUCCESS,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {error} upload project model fails
 */
export function uploadModelFailure(error) {
  return {
    type: UPLOAD_MODEL_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} download project model begins
 */
export function downloadModelBegins() {
  return {
    type: DOWNLOAD_MODEL_BEGINS,
  };
}
/**
 * @export
 * @params {message}
 * @returns {message} download project model success
 */
export function downloadModelSuccess(message) {
  return {
    type: DOWNLOAD_MODEL_SUCCESS,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {error} download project model fails
 */
export function downloadModelFailure(error) {
  return {
    type: DOWNLOAD_MODEL_FAILURE,
    error
  };
}


/**
 * @export
 * @params {null}
 * @returns {null} update project model begins
 */
export function updateModelBegins() {
  return {
    type: UPDATE_PROJECT_MODELS_BEGINS,
  };
}
/**
 * @export
 * @params {message}
 * @returns {message} update project model success
 */
export function updateModelSuccess(message) {
  return {
    type: UPDATE_PROJECT_MODELS_SUCCESS,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {error} update project model fails
 */
export function updateModelFailure(error) {
  return {
    type: UPDATE_PROJECT_MODELS_FAILURE,
    error
  };
}

/**
 * @export
 * @params {message}
 * @returns {error} update project model fails
 */
 export function getForgeToken(token) {
  return {
    type: GET_ACCESS_TOKEN,
    token
  };
}

/**
 * @export
 * @param {null}
 * @returns {projects} get projects
 */
export function getProjects() {

  return (dispatch) => {
    dispatch(getProjectsBegins())
    return axios.get(BASE_API_URL + '/projects')
      .then((response) => {
        // console.log(response)
        dispatch(getProjectsSuccess(response.data.data, response.data.message));
      })
      .catch((error) => {
        console.log(error.response)
        dispatch(getProjectsFailure(error.message))
      });
  }
}
/**
 * @export
 * @param {null}
 * @returns {project} create new project
 */
export function createProject(data) {

  return (dispatch) => {
    dispatch(addProjectBegins())
    return axios.post(BASE_API_URL + '/project/create', JSON.stringify(data), {headers: {
      'Content-Type': 'application/json'
    }})
      .then((response) => {
        dispatch(addProjectSuccess(response.data.data, "Project created successfully"));
        toast.success("Project created successfully");
      })
      .catch((error) => {
        let errorMessage = error.response.data.error ? error.response.data.error : error.response.data.message;
        dispatch(addProjectFailure(errorMessage));
        toast.error(errorMessage);
      });
  }
}

/**
 * @export
 * @param {projectId}
 * @returns {project} update project
 */
export function updateProject(projectId, data) {

  return (dispatch) => {
    dispatch(updateProjectBegins())
    return axios.put(BASE_API_URL + '/project/'+ projectId, data, {headers: {
        'Content-Type': 'application/json'
      }})
      .then((response) => {
        dispatch(updateProjectSuccess(response.data.data.project, projectId, "Project updated successfully"));
        toast.success("Project updated successfully");
       
      })
      .catch((error) => {
       
        let errorMessage = error.response.data.error ? error.response.data.error : error.response.data.message;
        dispatch(updateProjectFailure(errorMessage));
        toast.error(errorMessage);
      });
  }
}

/**
 * @export
 * @param {projectId}
 * @returns {project} update project
 */
export function deleteProject(projectId) {

  return (dispatch) => {
    dispatch(deleteProjectBegins())
    return axios.delete(BASE_API_URL + `/project/${projectId}`)
      .then((response) => {
        dispatch(deleteProjectSuccess("Project deleted successfully", projectId));
        toast.success("Project deleted successfully");
      })
      .catch((error) => {
   
        let errorMessage = error.response.data.errors ? error.response.data.errors.message : error.response.data.message
        dispatch(deleteProjectFailure(errorMessage));
        toast.error(errorMessage);
      });
  }
}

/**
 * @export
 * @param {projectId}
 * @returns {project} upload model to project
 */
export function uploadModel(data) {
  return (dispatch) => {
    dispatch(uploadModelBegins());
    return axios.post(BASE_API_URL + "/project/upload", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        dispatch(uploadModelSuccess("Model uploaded successfully"));
        toast.success("Model uploaded successfully");
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(uploadModelFailure(errorMessage));
        toast.error(errorMessage);
      });
  }
}

/**
 * @export
 * @param {modelId}
 * @returns {message} update model of project
 */
export function updateModel(modelId, data) {
  return (dispatch) => {
    dispatch(updateModelBegins());
    return axios.put(BASE_API_URL + "/model/"+ modelId, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {

        dispatch(updateModelSuccess("Updated completed successfully"));
        toast.success("Updated completed successfully");
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(updateModelFailure(errorMessage));
        toast.error(errorMessage);
      });
  }
}


/**
 * @export
 * @param {modelId, fileName}
 * @returns {model} download project model
 */
export function downloadModel(modelId, fileName) {
  return (dispatch) => {
    dispatch(downloadModelBegins());
    toast.success('Download started! Please wait...')
    return  axios.get(BASE_API_URL+ "/model/download/"+ modelId)
      .then(function (response) {
        toast.success('Downloading file..');
        const link = document.createElement("a");
        link.target = "_blank";
        link.download = fileName;
        link.href = URL.createObjectURL(new Blob([response.data, {type: "octet/stream"}]));
        link.click();
        toast.success('Download successful');
        dispatch(downloadModelSuccess("Download successful"));
      })
      .catch(function (error) {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message;
        dispatch(downloadModelFailure(errorMessage));
        toast.error('download failed');
      });
  }
}

/**
 * @export
 * @param {projectId}
 * @returns {project} update project
 */
 export function getProjectUsers(projectId) {

  return (dispatch) => {
    dispatch(getProjectUsersBegins())
    return axios.get(BASE_API_URL + `/project/${projectId}/users`)
      .then((response) => {
        console.log(response.data.data.length)
        if(response && response.data.data && response.data.data.length > 1){
         //  console.log("got here", response.data.data)
          dispatch(getProjectUsersSuccess(response.data.data, projectId, "Project users fetched successfully"));
        }
       
      })
      .catch((error) => {
       
        let errorMessage = error.response.data && error.response.data.message ? error.response.data.errors.message : error.response.data.message
        // dispatch(getProjectUsersFailure(errorMessage));
        console.log(errorMessage)
        toast.error(errorMessage);
      });
  }
}