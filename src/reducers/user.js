/* eslint-disable import/no-anonymous-default-export */
import {
 GET_USERS_BEGINS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  INVITE_USER_BEGINS,
  INVITE_USER_SUCCESS,
  INVITE_USER_FAILURE,
  GET_INVITES_BEGINS,
  GET_INVITES_SUCCESS,
  GET_INVITES_FAILS,
  DELETE_INVITE_BEGINS,
  DELETE_INVITE_SUCCESS,
  DELETE_INVITE_FAILURE,
  DELETE_USER_BEGINS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_BEGINS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../actions/actionTypes';

export default (state = { loading: false, message: '', errors: [], users: [], invites: [] }, action = {}) => {
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
      case GET_INVITES_BEGINS:
        return { ...state,
          loading: true
        };
      case GET_INVITES_SUCCESS:
        return { ...state,
          loading: false,
          message: action.message,
          invites: action.data
        };
      case GET_INVITES_FAILS:
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
        invites: !state.invites.find(user=> user.email === action.data.email) ? state.invites.concat(action.data) : state.invites
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
      case DELETE_INVITE_BEGINS:
        return { ...state,
          loading: true
        };
      case DELETE_INVITE_SUCCESS:
        return { ...state,
          loading: false,
          message: action.message,
          invites: state.invites.filter(user => user.id !== action.id)
        };
      case DELETE_INVITE_FAILURE:
        return { ...state,
          loading: false,
          errors: action.error
        };
    default: return state;
  }
};
