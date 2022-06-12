/* eslint-disable import/no-anonymous-default-export */
import isEmpty from 'lodash/isEmpty';

import { SET_CURRENT_USER, USER_LOGIN_FAILURE, SIGN_UP, USER_SIGNUP_FAILURE,
  CHANGE_PASSWORD_BEGINS, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_BEGINS, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_BEGINS, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  GET_USER_BEGINS, GET_USER_SUCCESS, GET_USER_FAILURE,
  UPDATE_USER_PROFILE_BEGINS, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILURE

} from '../actions/actionTypes';

export default (state = { user: [], profile:[], loading: false, errors: [], success: [] }, action = {}) => {

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        errors: action.error
      };
    case SIGN_UP:
      return [...state,
        {
          loading: false,
          user: action.user
        }];
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        errors: action.error
      };
    case GET_USER_BEGINS:
      return {...state,
        loading: true
      };
    case GET_USER_SUCCESS:
      return {...state,
        message: action.message,
        profile: action.data
      };
    case GET_USER_FAILURE:
      return {...state,
        errors: action.error
      };
      case UPDATE_USER_PROFILE_BEGINS:
      return { ...state,
        loading: true
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        profile: action.data
      };
    case UPDATE_USER_PROFILE_FAILURE:
      return { ...state,
        loading: false,
        errors: action.error
      };
    case CHANGE_PASSWORD_BEGINS:
      return {...state,
        loading: true
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {...state,
      success: action.message
      };
    case CHANGE_PASSWORD_FAILURE:
      return {...state,
        errors: action.error
      };
    case FORGOT_PASSWORD_BEGINS:
      return {...state,
        loading: true
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {...state,
        success: action.message
      };
    case FORGOT_PASSWORD_FAILURE:
      return {...state,
        errors: action.error
      };
    case RESET_PASSWORD_BEGINS:
      return {...state,
        loading: true
      };
    case RESET_PASSWORD_SUCCESS:
      return {...state,
        success: action.message
      };
    case RESET_PASSWORD_FAILURE:
      return {...state,
        errors: action.error
      }

    default: return state;
  }
};
