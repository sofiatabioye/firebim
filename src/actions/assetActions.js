import axios from 'axios';
import toast from 'react-hot-toast';
import Config from '../config';

import {
  GET_ASSET_CATEGORY_BEGINS,
  GET_ASSET_CATEGORY_SUCCESS,
  GET_ASSET_CATEGORY_FAILURE,
  ADD_ASSET_CATEGORY_BEGINS,
  ADD_ASSET_CATEGORY_SUCCESS,
  ADD_ASSET_CATEGORY_FAILURE,
  GET_ASSET_FIELDS_BEGINS,
  GET_ASSET_FIELDS_SUCCESS,
  GET_ASSET_FIELDS_FAILURE,
  ADD_ASSET_FIELDS_BEGINS,
  ADD_ASSET_FIELDS_SUCCESS,
  ADD_ASSET_FIELDS_FAILURE,
  UPDATE_ASSET_FIELDS_BEGINS,
  UPDATE_ASSET_FIELDS_SUCCESS,
  UPDATE_ASSET_FIELDS_FAILURE,
  UPDATE_ASSET_CATEGORY_BEGINS,
  UPDATE_ASSET_CATEGORY_SUCCESS,
  UPDATE_ASSET_CATEGORY_FAILURE,
  DELETE_ASSET_CATEGORY_BEGINS,
  DELETE_ASSET_CATEGORY_SUCCESS,
  DELETE_ASSET_CATEGORY_FAILURE,
  DELETE_ASSET_FIELDS_BEGINS,
  DELETE_ASSET_FIELDS_SUCCESS,
  DELETE_ASSET_FIELDS_FAILURE,

} from './actionTypes';
import {updateModelFailure} from "./projectActions";

// const BASE_API_URL = "http://localhost:4000/api";
// const BASE_API_URL = "https://adims.herokuapp.com/api";
const BASE_API_URL = Config.BASE_API_URL
// "https://advancedlogisticsapi-nqt92.ondigitalocean.app/api";

/**
 * @export
 * @params {null}
 * @returns {null} get asset category begins
 */
export function getAssetCategoryBegins() {
  return {
    type: GET_ASSET_CATEGORY_BEGINS,
  };
}
/**
 * @export
 * @params {projects, message}
 * @returns {projects} get asset category success
 */
export function getAssetCategorySuccess(categories, message) {
  return {
    type: GET_ASSET_CATEGORY_SUCCESS,
    categories,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} get asset category fails
 */
export function getAssetCategoryFailure(error) {
  return {
    type: GET_ASSET_CATEGORY_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} add asset category begins
 */
export function addAssetCategoryBegins() {
  return {
    type: ADD_ASSET_CATEGORY_BEGINS,
  };
}
/**
 * @export
 * @params {category, message}
 * @returns {category} add asset category success
 */
export function addAssetCategorySuccess(category, message) {
  return {
    type: ADD_ASSET_CATEGORY_SUCCESS,
    category,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} add asset category fails
 */
export function addAssetCategoryFailure(error) {
  return {
    type: ADD_ASSET_CATEGORY_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} update asset category begins
 */
export function updateAssetCategoryBegins() {
  return {
    type: UPDATE_ASSET_CATEGORY_BEGINS,
  };
}
/**
 * @export
 * @params {category, message}
 * @returns {category} update asset category success
 */
export function updateAssetCategorySuccess(category,id, message) {
  return {
    type: UPDATE_ASSET_CATEGORY_SUCCESS,
    category,
    id,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} update asset category fails
 */
export function updateAssetCategoryFailure(error) {
  return {
    type: UPDATE_ASSET_CATEGORY_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} delete asset category begins
 */
export function deleteAssetCategoryBegins() {
  return {
    type: DELETE_ASSET_CATEGORY_BEGINS,
  };
}
/**
 * @export
 * @params {message}
 * @returns {category} delete asset category success
 */
export function deleteAssetCategorySuccess(message, id) {
  return {
    type: DELETE_ASSET_CATEGORY_SUCCESS,
    message,
    id
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} delete asset category fails
 */
export function deleteAssetCategoryFailure(error) {
  return {
    type: DELETE_ASSET_CATEGORY_FAILURE,
    error
  };
}

// asset fields


/**
 * @export
 * @params {null}
 * @returns {null} get asset field begins
 */
export function getAssetFieldBegins() {
  return {
    type: GET_ASSET_FIELDS_BEGINS,
  };
}
/**
 * @export
 * @params {projects, message}
 * @returns {projects} get asset field success
 */
export function getAssetFieldSuccess(categories, message) {
  return {
    type: GET_ASSET_FIELDS_SUCCESS,
    categories,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} get asset field fails
 */
export function getAssetFieldFailure(error) {
  return {
    type: GET_ASSET_FIELDS_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} add asset field begins
 */
export function addAssetFieldBegins() {
  return {
    type: ADD_ASSET_FIELDS_BEGINS,
  };
}
/**
 * @export
 * @params {category, message}
 * @returns {category} add asset field success
 */
export function addAssetFieldSuccess(field, message) {
  return {
    type: ADD_ASSET_FIELDS_SUCCESS,
    field,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} add asset field fails
 */
export function addAssetFieldFailure(error) {
  return {
    type: ADD_ASSET_FIELDS_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} update asset field begins
 */
export function updateAssetFieldBegins() {
  return {
    type: UPDATE_ASSET_FIELDS_BEGINS,
  };
}
/**
 * @export
 * @params {category, message}
 * @returns {category} update asset field success
 */
export function updateAssetFieldSuccess(field, id, message) {
  return {
    type: UPDATE_ASSET_FIELDS_SUCCESS,
    field,
    id,
    message
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} update asset field fails
 */
export function updateAssetFieldFailure(error) {
  return {
    type: UPDATE_ASSET_FIELDS_FAILURE,
    error
  };
}

/**
 * @export
 * @params {null}
 * @returns {null} delete asset field begins
 */
export function deleteAssetFieldBegins() {
  return {
    type: DELETE_ASSET_FIELDS_BEGINS,
  };
}
/**
 * @export
 * @params {message}
 * @returns {category} delete asset field success
 */
export function deleteAssetFieldSuccess(message, id) {
  return {
    type: DELETE_ASSET_FIELDS_SUCCESS,
    message,
    id
  };
}
/**
 * @export
 * @params {message}
 * @returns {null} delete asset field fails
 */
export function deleteAssetFieldFailure(error) {
  return {
    type: DELETE_ASSET_FIELDS_FAILURE,
    error
  };
}


/**
 * @export
 * @param {null}
 * @returns {categories} get asset categories
 */
export function getAssetCategories() {

  return (dispatch) => {
    dispatch(getAssetCategoryBegins())
    return axios.get(BASE_API_URL + '/assetcategories')
      .then((response) => {
        dispatch(getAssetCategorySuccess(response.data.data, response.data.message));
      })
      .catch((error) => {
        dispatch(getAssetCategoryFailure(error))
      });
  }
}
/**
 * @export
 * @param {null}
 * @returns {category} create new asset category
 */
export function createAssetCategory(data) {

  return (dispatch) => {
    dispatch(addAssetCategoryBegins())
    return axios.post(BASE_API_URL + '/assetcategories', data)
      .then((response) => {
        dispatch(addAssetCategorySuccess(response.data.data, "Category created successfully"));
        toast.success("Category created successfully");
      })
      .catch((error) => {
        dispatch(addAssetCategoryFailure(error.message));
        toast.error(error.message);
      });
  }
}

/**
 * @export
 * @param {assetId, data}
 * @returns {asset} update asset category
 */
export function updateAssetCategory(assetId, data) {
  return (dispatch) => {
    dispatch(updateAssetCategoryBegins())
    return axios.put(BASE_API_URL + '/assetcategories/'+ assetId, data)
      .then((response) => {

        dispatch(updateAssetCategorySuccess(response.data.data.assetCategory, assetId, response.data.message));
        toast.success("Asset updated successfully");
      })
      .catch((error) => {
        dispatch(updateAssetCategoryFailure(error));
        toast.error(error.message);
      });
  }
}

/**
 * @export
 * @param {assetId}
 * @returns {message} delete category
 */
export function deleteAssetCategory(assetId) {

  return (dispatch) => {
    dispatch(deleteAssetCategoryBegins())
    return axios.delete(BASE_API_URL + `/assetcategories/${assetId}`)
      .then((response) => {
        dispatch(deleteAssetCategorySuccess("Category deleted successfully", assetId));
        toast.success("Category deleted successfully");
      })
      .catch((error) => {
        dispatch(deleteAssetCategoryFailure(error.message));
        toast.error(error.message);
      });
  }
}

/**
 * @export
 * @param {null}
 * @returns {fields} get asset fields
 */
export function getAssetFields() {

  return (dispatch) => {
    dispatch(getAssetFieldBegins())
    return axios.get(BASE_API_URL + '/assetfields')
      .then((response) => {
        dispatch(getAssetFieldSuccess(response.data.data, response.data.message));
      })
      .catch((error) => {
        dispatch(getAssetFieldFailure(error.message))
      });
  }
}
/**
 * @export
 * @param {null}
 * @returns {field} create new asset field
 */
export function createAssetField(data) {

  return (dispatch) => {
    dispatch(addAssetFieldBegins())
    return axios.post(BASE_API_URL + '/assetfields', data)
      .then((response) => {
        dispatch(addAssetFieldSuccess(response.data.data, "Field created successfully"));
        toast.success("Asset Datapoint created successfully");
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(addAssetFieldFailure(errorMessage));
        toast.error(errorMessage);
      });
  }
}

/**
 * @export
 * @param {assetId, data}
 * @returns {asset} update asset field
 */
export function updateAssetField(assetId, data)
{
  console.log(data, assetId, '$$$$$$')
  return (dispatch) => {
    dispatch(updateAssetFieldBegins())
    return axios.put(BASE_API_URL + '/assetfields/'+ assetId, data)
      .then((response) => {
        // console.log(response.data.data.assetField,assetId, response.data.message );
        dispatch(updateAssetFieldSuccess(response.data.data.assetField, assetId, response.data.message));
        toast.success("Asset field updated successfully");
      })
      .catch((error) => {
        // console.log(error.response);
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(updateAssetFieldFailure(errorMessage));
        toast.error(errorMessage);
      });
  }
}

/**
 * @export
 * @param {assetId}
 * @returns {message} delete field
 */
export function deleteAssetField(assetId) {

  return (dispatch) => {
    dispatch(deleteAssetFieldBegins())
    return axios.delete(BASE_API_URL + `/assetfields/${assetId}`)
      .then((response) => {
        dispatch(deleteAssetFieldSuccess("Asset field deleted successfully", assetId));
        toast.success("Asset field deleted successfully");
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        console.log(errorMessage);
        dispatch(deleteAssetFieldFailure(errorMessage));
        toast.error(errorMessage);
      });
  }
}
