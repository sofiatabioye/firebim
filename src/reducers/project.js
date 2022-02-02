import {
 GET_PROJECTS_BEGINS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECT_USERS_BEGINS,
  GET_PROJECT_USERS_SUCCESS,
  GET_PROJECT_USERS_FAILURE,
  ADD_PROJECT_BEGINS,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  UPDATE_PROJECT_BEGINS,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_BEGINS,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from '../actions/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { loading: false, message: '', errors: [], projects: [], }, action = {}, _projects = [], _accessToken={}) => {
  switch (action.type) {
    case GET_PROJECTS_BEGINS:
      return { ...state,
        loading: true
      };
    case GET_PROJECTS_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        projects: action.projects
      };
    case GET_PROJECTS_FAIL:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case GET_PROJECT_USERS_BEGINS:
      return { ...state,
        loading: true
      };
    case GET_PROJECT_USERS_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        projects: state.projects.map(item => (
          item.id === action.id ?  action.users : item))
  
      };
    case GET_PROJECT_USERS_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case ADD_PROJECT_BEGINS:
      return { ...state,
        loading: true
      };
    case ADD_PROJECT_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        projects: state.projects.concat(action.project)
      };
    case ADD_PROJECT_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case UPDATE_PROJECT_BEGINS:
      return { ...state,
        loading: true
      };
    case UPDATE_PROJECT_SUCCESS:
      return { ...state,
        loading: false,
        message: action.message,
        projects: state.projects.map(item => (
            item.id === action.id ?  action.project : item))
      };
    case UPDATE_PROJECT_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    case DELETE_PROJECT_BEGINS:
      return { ...state,
        loading: true
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
        projects: state.projects.filter(project => project.id !== action.id)
      };
    case DELETE_PROJECT_FAILURE:
      return { ...state,
        loading: false,
        errors: action.errors
      };
    default: return state;
  }
};
