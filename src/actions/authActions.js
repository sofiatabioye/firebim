import axios from 'axios';
import toast from 'react-hot-toast';
import Config from '../config';

import setAuthorizationToken from '../utils/setAuthToken';


import {
  SET_CURRENT_USER,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_FAILURE, USER_SIGNUP_FAILURE,
  INVITE_USER_BEGINS, INVITE_USER_FAILURE, INVITE_USER_SUCCESS,
  REMOVE_USER_BEGINS, REMOVE_USER_SUCCESS, REMOVE_USER_FAILURE,
  GET_ACCESS_TOKEN, GET_ACCESS_TOKEN_FAILURE,
  CHANGE_PASSWORD_BEGINS, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_BEGINS, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_BEGINS, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  GET_USERS_BEGINS, GET_USERS_SUCCESS, GET_USERS_FAILURE,
  GET_USER_BEGINS, GET_USER_SUCCESS, GET_USER_FAILURE,
  DELETE_USER_BEGINS, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
  UPDATE_USER_BEGINS, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  GET_INVITES_BEGINS, GET_INVITES_SUCCESS, GET_INVITES_FAILS,
  DELETE_INVITE_BEGINS, DELETE_INVITE_SUCCESS, DELETE_INVITE_FAILURE,
  UPDATE_USER_PROFILE_BEGINS, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILURE
} from './actionTypes';


const BASE_API_URL = Config.BASE_API_URL

/**
 * @export
 * @param {{user: any}} user
 * @returns {{type: string, user: string}}  current user
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @export
 * @param {any} error
 * @returns {{type: string, error: any}} login failure error
 */
export function setCurrentUserFails(error) {
  return {
    type: USER_LOGIN_FAILURE,
    error
  };
}

/**
 * @export
 * @param {any} message
 * @returns {message} signup success message
 */
export function setNewUser(message) {
  return {
    type: USER_SIGNUP_SUCCESS,
    message
  };
}

/**
 * @export
 * @param {any} message
 * @returns {message} signup success message
 */
export function setNewUserFails(message) {
  return {
    type: USER_SIGNUP_FAILURE,
    message
  };
}

/**
 * @export
 * @param {any} message
 * @returns {message} forge token success message
 */
export function getForgeAccessToken(token) {
  return {
    type: GET_ACCESS_TOKEN,
    token
  };
}

/**
 * @export
 * @param {any} message
 * @returns {message} signup success message
 */
export function getForgeAccessTokenFails(message) {
  return {
    type: GET_ACCESS_TOKEN_FAILURE,
    message
  };
}

/**
 * @export
 * @param {any}
 * @returns {null} change password
 */
export function changePasswordBegins() {
  return {
    type: CHANGE_PASSWORD_BEGINS
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} change password success
 */
export function changePasswordSuccess(message) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    message,
  };
}

/**
 * @export
 * @param {any} error
 * @returns {error} change password failure
 */
export function changePasswordFails(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    error
  };
}

/**
 * @export
 * @param {any}
 * @returns {null} forgot password
 */
export function forgotPasswordBegins() {
  return {
    type: FORGOT_PASSWORD_BEGINS
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} forgot password success
 */
export function forgotPasswordSuccess(message) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    message,
  };
}

/**
 * @export
 * @param {any} error
 * @returns {error} forgot password failure
 */
export function forgotPasswordFails(error) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    error
  };
}

/**
 * @export
 * @param {any}
 * @returns {null} reset password
 */
export function resetPasswordBegins() {
  return {
    type: RESET_PASSWORD_BEGINS
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} reset password success
 */
export function resetPasswordSuccess(message) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    message,
  };
}

/**
 * @export
 * @param {any} error
 * @returns {error} forgot password failure
 */
export function resetPasswordFails(error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    error
  };
}

/**
 * @export
 * @param {any}
 * @returns {null} get users
 */
export function getUsersBegins() {
  return {
    type: GET_USERS_BEGINS
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} get users success
 */
export function getUsersSuccess(data, message) {
  return {
    type: GET_USERS_SUCCESS,
    data,
    message,
  };
}


/**
 * @export
 * @param {any} error
 * @returns {error} get users failure
 */
 export function getUsersFails(error) {
  return {
    type: GET_USERS_FAILURE,
    error
  };
}
/**
 * @export
 * @param {any}
 * @returns {null} get user invites
 */
 export function getInvitesBegins() {
  return {
    type: GET_INVITES_BEGINS
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} get user invites success
 */
export function getInvitesSuccess(data, message) {
  return {
    type: GET_INVITES_SUCCESS,
    data,
    message,
  };
}


/**
 * @export
 * @param {any} error
 * @returns {error} get users failure
 */
 export function getInvitesFails(error) {
  return {
    type: GET_INVITES_FAILS,
    error
  };
}
/**
 * @export
 * @param {any}
 * @returns {null} get user
 */
 export function getUserBegins() {
  return {
    type: GET_USER_BEGINS
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} get user success
 */
export function getUserSuccess(data, message) {
  return {
    type: GET_USER_SUCCESS,
    data,
    message,
  };
}


/**
 * @export
 * @param {any} error
 * @returns {error} get user failure
 */
 export function getUserFails(error) {
  return {
    type: GET_USER_FAILURE,
    error
  };
}


/**
 * @export
 * @param {any}
 * @returns {null} update access data begins
 */
export function updateUserBegins() {
  return {
    type: UPDATE_USER_BEGINS,
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} update user success message
 */
export function updateUserSuccess(message, data, id) {
  return {
    type: UPDATE_USER_SUCCESS,
    message,
    data,
    id
  };
}

/**
 * @export
 * @param {any} error
 * @returns {error} error message
 */
export function updateUserFails(error) {
  return {
    type: UPDATE_USER_FAILURE,
    error
  };
}

/**
 * @export
 * @param {any}
 * @returns {null} update access data begins
 */
 export function updateUserProfileBegins() {
  return {
    type: UPDATE_USER_PROFILE_BEGINS,
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} update user success message
 */
export function updateUserProfileSuccess(message, data, id) {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    message,
    data,
    id
  };
}

/**
 * @export
 * @param {any} error
 * @returns {error} error message
 */
export function updateUserProfileFails(error) {
  return {
    type: UPDATE_USER_PROFILE_FAILURE,
    error
  };
}
/**
 * @export
 * @param {userId}
 * @returns {null} delete user
 */
export function deleteUserBegins() {
  return {
    type: DELETE_USER_BEGINS
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} delete users success
 */
export function deleteUserSuccess(id, message) {
  return {
    type: DELETE_USER_SUCCESS,
    id,
    message,
  };
}

/**
 * @export
 * @param {any} error
 * @returns {error} delete users failure
 */
export function deleteUserFails(error) {
  return {
    type: DELETE_USER_FAILURE,
    error
  };
}

/**
 * @export
 * @param {userId}
 * @returns {null} delete user invite
 */
 export function deleteInviteBegins() {
  return {
    type: DELETE_INVITE_BEGINS
  };
}

/**
 * @export
 * @param {any} data
 * @returns {data} delete user invite success
 */
export function deleteInviteSuccess(id, message) {
  return {
    type: DELETE_INVITE_SUCCESS,
    id,
    message,
  };
}

/**
 * @export
 * @param {any} error
 * @returns {error} delete user invite failure
 */
export function deleteInviteFails(error) {
  return {
    type: DELETE_INVITE_FAILURE,
    error
  };
}

/**
 * @export
 * @param {any} history
 * @returns {void}
 */
export function logout(history) {
  return dispatch => {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user')
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login')
    toast.success('You have logged out successfully');
  };
}


/**
 * @export
 * @param {any}
 * @returns {message} invite user begins
 */
export function inviteUserBegins() {
  return {
    type: INVITE_USER_BEGINS,
  };
}

/**
 * @export
 * @param {string} message, user
 * @returns {message} invite user success
 */
export function inviteUserSuccess(message, data) {
  return {
    type: INVITE_USER_SUCCESS,
    message,
    data
  };
}

/**
 * @export
 * @param {any}
 * @returns {error} invite user fails
 */
export function inviteUserFails(error) {
  return {
    type: INVITE_USER_FAILURE,
    error
  };
}

/**
 * @export
 * @param {any}
 * @returns {message} remove user begins
 */
export function removeUserBegins() {
  return {
    type: REMOVE_USER_BEGINS,
  };
}

/**
 * @export
 * @param {string} message, user
 * @returns {message} remove user success
 */
export function removeUserSuccess(message, data) {
  return {
    type: REMOVE_USER_SUCCESS,
    message,
    data
  };
}

/**
 * @export
 * @param {any}
 * @returns {error} remove user fails
 */
export function removeUserFails(error) {
  return {
    type: REMOVE_USER_FAILURE,
    error
  };
}


/**
 * @export
 * @param {any} userData
 * @param {any} history
 * @returns {function(*): Promise<AxiosResponse<T>>} logged in user
 */
export function login(userData, history) {

  return (dispatch) => axios.post(BASE_API_URL + '/login', userData)
    .then((response) => {
      const token = response.data.data.token;
      const user = response.data.data;
      localStorage.setItem('x-access-token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthorizationToken(token);
      dispatch(setCurrentUser(user));
      toast.success('You are signed In');
      history.push('/');

    })
    .catch((err) => {
      const error = err.response.errors ? Object.values(err.response.data.errors).join(', ') : err.response.data.message;
      dispatch(setCurrentUserFails(error));
      toast.error("Incorrect username/password");
    });
}

/**
 * @export
 * @param {any} userData
 * @param {any} history
 * @returns {user} newly created and logged in user
 */
export function signup(userData, token, history) {
  console.log(userData)
  return (dispatch) => axios.post(BASE_API_URL + `/signup/${token}`, userData)
    .then((response) => {
      dispatch(setNewUser(response.data.message));
      console.log(response);
      toast.success('Sign up was successful. Kindly confirm your email and sign in');
      history.push('/sign-in');
    })
    .catch((err) => {
      console.log(err.response);
      let error = err.response.data.errors ? Object.values(err.response.data.errors).join(', ') : err.response.data.message;
      dispatch(setNewUserFails(err.response.data.message));
      toast.error(error);
    });
}

/**
 * @export
 * @param {any} history
 * @returns {user} get new forge token for viewer
 */
export function getForgeToken() {

  return (dispatch) => axios.get( BASE_API_URL + '/forge/oauth/token')
      .then((response) => {
        dispatch(getForgeAccessToken(response.data));
      })
      .catch((error) =>
        error
      );
}

/**
 * @export
 * @param {any} history
 * @returns {user} get new forge token for viewer
 */
export function getModelData() {
  return (dispatch) => axios.get( BASE_API_URL + '/forge/mysqlsetup')
    .then((response) => {
      dispatch(getForgeAccessToken(response.data));
    })
    .catch((error) =>{
        dispatch(getForgeAccessTokenFails(error));
    });
}

/**
 * @export
 * @param {any} history
 * @returns {user} invite user
 */
export function inviteUser(data) {
  return (dispatch) => {
    dispatch(inviteUserBegins())
    return axios.post(BASE_API_URL + "/user/invite", data)
      .then(function (response) {
        toast.success("Invite sent successfully");
        dispatch(inviteUserSuccess("Invite sent successfully", response.data.data ));

      })
      .catch(function (error) {
        let errorMessage = error.response.data.errors ? JSON.stringify(error.response.data.errors) : error.response.data.message
        dispatch(inviteUserFails(errorMessage));
        toast.error(errorMessage)
      });
  }
}

/**
 * @export
 * @param {any} history
 * @returns {user} invite user
 */
export function removeUser(data) {
  return (dispatch) => {
    dispatch(removeUserBegins())
    return axios.post(BASE_API_URL + "/remove-user", data)
      .then(function (response) {
        // console.log(response);
        toast.success("User removed from project successfully");
        dispatch(removeUserSuccess("User removed from project successfully", response.data.data ));

      })
      .catch(function (error) {
        // console.log(error.response);
        let errorMessage = error.response.data.errors ? error.response.data.errors.message : error.response.data.message
        dispatch(removeUserFails(errorMessage));
        toast.error(errorMessage)
      });
  }
}

/**
 * @export
 * @param {any} history
 * @returns {user} change password
 */
export function changePassword(data) {
  return (dispatch) => {
    dispatch(changePasswordBegins())
    return axios.put(BASE_API_URL + "/users/password", data)
      .then(function (response) {
        if(response.status === 204){
          toast.success("Password changed successfully");
          dispatch(changePasswordSuccess('Password changed successfully'));
        }

      })
      .catch(function (error) {
        let errorMessage = error.response.data.errors ? error.response.data.errors.message : error.response.data.message
        dispatch(changePasswordFails(errorMessage));
        toast.error(errorMessage)
      });
  }
}


/**
 * @export
 * @param {any} history
 * @returns {user} forgot password
 */
export function forgotPassword(data) {
  return (dispatch) => {
    dispatch(forgotPasswordBegins())
    return axios.post(BASE_API_URL + "/password/request-reset", data)
      .then(function (response) {
          toast.success(response.data.message);
          dispatch(forgotPasswordSuccess(response.data.message));

      })
      .catch(function (error) {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(forgotPasswordFails(errorMessage));
        toast.error(errorMessage)
      });
  }
}

/**
 * @export
 * @param {any} history
 * @returns {user} reset password
 */
export function resetPassword(data, history) {
  return (dispatch) => {
    dispatch(resetPasswordBegins())
    return axios.post(BASE_API_URL + "/reset-password", data)
      .then(function (response) {
        toast.success("Password reset successful");
        dispatch(resetPasswordSuccess("Password reset successful"));
        history.push("/login");
      })
      .catch(function (error) {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(resetPasswordFails(errorMessage));
        toast.error(errorMessage)
      });
  }
}

/**
 * @export
 * @param {any}
 * @returns {user} get users
 */
export function getUsers() {
  return (dispatch) => {
    dispatch(getUsersBegins())
    return axios.get(BASE_API_URL + "/users")
      .then(function (response) {
        dispatch(getUsersSuccess(response.data.data, response.data.message));

      })
      .catch(function (error) {
        console.log(error.response);
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(getUsersFails(errorMessage));
      });
  }
}

export function getInvites() {
  return (dispatch) => {
    dispatch(getInvitesBegins())
    return axios.get(BASE_API_URL + "/user/invites")
      .then(function (response) {
        dispatch(getInvitesSuccess(response.data.data, response.data.message));

      })
      .catch(function (error) {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(getInvitesFails(errorMessage));
      });
  }
}


/**
 * @export
 * @param {any}
 * @returns {user} get user
 */
 export function getUser(userId) {
  return (dispatch) => {
    dispatch(getUserBegins())
    return axios.get(BASE_API_URL + "/user/"+ userId)
      .then(function (response) {
        dispatch(getUserSuccess(response.data.data, response.data.message));

      })
      .catch(function (error) {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(getUserFails(errorMessage));
      });
  }
}

/**
 * @export
 * @param {userId}
 * @returns {message} delete user
 */
export function deleteUser(userId) {

  return (dispatch) => {
    dispatch(deleteUserBegins())
    return axios.delete(BASE_API_URL + `/user/${userId}`)
      .then((response) => {
        dispatch(deleteUserSuccess( userId, "User deleted successfully",));
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        console.log(error.response);
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(deleteUserFails(errorMessage));
        toast.error(errorMessage);
      });
  }
}
/**
 * @export
 * @param {userId}
 * @returns {message} update user
 */
export function updateUser(data, userId) {

  return (dispatch) => {
    dispatch(updateUserBegins())
    return axios.put(BASE_API_URL + `/user/${userId}`, data)
      .then((response) => {
        // console.log(response);
        dispatch(updateUserSuccess("User updated successfully", response.data.data,  userId ));
        toast.success("User updated successfully");
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(updateUserFails(errorMessage));
        toast.error(errorMessage);
      });
  }
}

/**
 * @export
 * @param {userId}
 * @returns {message} update user
 */
 export function updateUserProfile(data, userId) {

  return (dispatch) => {
    dispatch(updateUserProfileBegins())
    return axios.put(BASE_API_URL + `/user/${userId}`, data)
      .then((response) => {
        // console.log(response);
        dispatch(updateUserProfileSuccess("User updated successfully", response.data.data,  userId ));
        toast.success("User updated successfully");
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(updateUserProfileFails(errorMessage));
        toast.error(errorMessage);
      });
  }
}

/**
 * @export
 * @param {userId}
 * @returns {message} delete user invite
 */
 export function deleteUserInvite(userId) {

  return (dispatch) => {
    dispatch(deleteUserBegins())
    return axios.delete(BASE_API_URL + `/invite/${userId}`)
      .then((response) => {
        dispatch(deleteInviteSuccess( userId, "User invite deleted successfully",));
        toast.success("User invite deleted successfully");
      })
      .catch((error) => {
        console.log(error.response);
        let errorMessage = error.response.data.errors ? error.response.data.message : error.response.data.message
        dispatch(deleteInviteFails(errorMessage));
        toast.error(errorMessage);
      });
  }
}