import {

  GET_ACCESS_TOKEN,
  GET_ASSET_DATA,
  GET_ASSET_DATA_FAILS,
  UPDATE_ASSET_DATA_BEGINS,
  UPDATE_ASSET_DATA_FAILS, UPDATE_ASSET_DATA_SUCCESS

} from '../actions/actionTypes';

export default (state = { loading: false, message: '', errors: [], assets: [] }, action = {}) => {
  switch (action.type) {

    case GET_ACCESS_TOKEN:
      return { ...state,
        loading: false,
        accessToken: action.credentials
      };
    case GET_ASSET_DATA:
      return {
        ...state,
        loading: false,
        assets: action.data,
      };
    case GET_ASSET_DATA_FAILS:
      return { ...state,
        loading: false,
        uploadError: action.errors
      };
    case UPDATE_ASSET_DATA_BEGINS:
      return { ...state,
        loading: true
      };
    case UPDATE_ASSET_DATA_SUCCESS:
      return { ...state,
        loading: true,
        message: action.message,
        assets: state.assets.map(item => (
          item.id === action.id ?  action.data : item))
      };
      case UPDATE_ASSET_DATA_FAILS:
      return { ...state,
        errors: action.errors
      };


    default: return state;
  }
};
