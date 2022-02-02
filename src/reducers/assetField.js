import {
  GET_ASSET_FIELDS_BEGINS,
  GET_ASSET_FIELDS_SUCCESS,
  GET_ASSET_FIELDS_FAILURE,
  ADD_ASSET_FIELDS_BEGINS,
  ADD_ASSET_FIELDS_SUCCESS,
  ADD_ASSET_FIELDS_FAILURE,
  UPDATE_ASSET_FIELDS_BEGINS,
  UPDATE_ASSET_FIELDS_SUCCESS,
  UPDATE_ASSET_FIELDS_FAILURE,
  DELETE_ASSET_FIELDS_BEGINS,
  DELETE_ASSET_FIELDS_SUCCESS,
  DELETE_ASSET_FIELDS_FAILURE
} from '../actions/actionTypes';

export default (state = { loading: false, message: '', errors: [], assetFields: [], }, action = {}, projects = [], accessToken={}) => {
  switch (action.type) {
    case GET_ASSET_FIELDS_BEGINS:
      return { ...state,
        loading: true
      };
    case GET_ASSET_FIELDS_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        assetFields: action.categories
      };
    case GET_ASSET_FIELDS_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case ADD_ASSET_FIELDS_BEGINS:
      return { ...state,
        loading: true
      };
    case ADD_ASSET_FIELDS_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        assetFields: state.assetFields.concat(action.field)
      };
    case ADD_ASSET_FIELDS_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case UPDATE_ASSET_FIELDS_BEGINS:
      return { ...state,
        loading: true
      };
    case UPDATE_ASSET_FIELDS_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        assetFields: state.assetFields.map(item => (
          item.id !== action.id ?  item : action.field))
      };
    case UPDATE_ASSET_FIELDS_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };

    case DELETE_ASSET_FIELDS_BEGINS:
      return { ...state,
        loading: true
      };
    case DELETE_ASSET_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
        assetFields: state.assetFields.filter(asset => asset.id !== action.id)
      };
    case DELETE_ASSET_FIELDS_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    default: return state;
  }
};
