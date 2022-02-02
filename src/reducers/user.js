import {
 GET_USERS_BEGINS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  INVITE_USER_BEGINS,
  INVITE_USER_SUCCESS,
  INVITE_USER_FAILURE,
  DELETE_USER_BEGINS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_BEGINS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../actions/actionTypes';

export default (state = { loading: false, message: '', errors: [], users: [], }, action = {}) => {
  switch (action.type) {
    case GET_USERS_BEGINS:
      return { ...state,
        loading: true
      };
    case GET_USERS_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        users: action.data
      };
    case GET_USERS_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case INVITE_USER_BEGINS:
      return { ...state,
        loading: true
      };
    case INVITE_USER_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        users: !state.users.find(user=> user.email === action.data.email) ? state.users.concat(action.data) : state.users
      };
    case INVITE_USER_FAILURE:
      return { ...state,
        loading: false,
        errors: action.error
      };
    case UPDATE_USER_BEGINS:
      return { ...state,
        loading: true
      };
    case UPDATE_USER_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        users: state.users.map(item => (
          item.id !== action.id ?  item : action.data))
      };
    case UPDATE_USER_FAILURE:
      return { ...state,
        loading: false,
        errors: action.error
      };
    case DELETE_USER_BEGINS:
      return { ...state,
        loading: true
      };
    case DELETE_USER_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        users: state.users.filter(user => user.id !== action.id)
      };
    case DELETE_USER_FAILURE:
      return { ...state,
        loading: false,
        errors: action.error
      };
    default: return state;
  }
};
