import {
  GET_ASSET_CATEGORY_BEGINS,
  GET_ASSET_CATEGORY_SUCCESS,
  GET_ASSET_CATEGORY_FAILURE,
  ADD_ASSET_CATEGORY_BEGINS,
  ADD_ASSET_CATEGORY_SUCCESS,
  ADD_ASSET_CATEGORY_FAILURE,
  UPDATE_ASSET_CATEGORY_BEGINS,
  UPDATE_ASSET_CATEGORY_SUCCESS,
  UPDATE_ASSET_CATEGORY_FAILURE,
  DELETE_ASSET_CATEGORY_BEGINS,
  DELETE_ASSET_CATEGORY_SUCCESS,
  DELETE_ASSET_CATEGORY_FAILURE, UPDATE_ASSET_FIELDS_BEGINS, UPDATE_ASSET_FIELDS_SUCCESS, UPDATE_ASSET_FIELDS_FAILURE
} from '../actions/actionTypes';

export default (state = { loading: false, message: '', errors: [], assetCategories: [], }, action = {}, projects = [], accessToken={}) => {
  switch (action.type) {
    case GET_ASSET_CATEGORY_BEGINS:
      return { ...state,
        loading: true
      };
    case GET_ASSET_CATEGORY_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        assetCategories: action.categories
      };
    case GET_ASSET_CATEGORY_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case ADD_ASSET_CATEGORY_BEGINS:
      return { ...state,
        loading: true
      };
    case ADD_ASSET_CATEGORY_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        assetCategories: state.assetCategories.concat(action.category)
      };
    case ADD_ASSET_CATEGORY_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case UPDATE_ASSET_CATEGORY_BEGINS:
      return { ...state,
        loading: true
      };
    case UPDATE_ASSET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
        assetCategories: state.assetCategories.map(item => (
          item.id === action.id ?  action.category : item))
    };
    case UPDATE_ASSET_CATEGORY_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case DELETE_ASSET_CATEGORY_BEGINS:
      return { ...state,
        loading: true
      };
    case DELETE_ASSET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
        assetCategories: state.assetCategories.filter(asset => asset.id !== action.id)
      };
    case DELETE_ASSET_CATEGORY_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    default: return state;
  }
};
