import * as actionTypes from './actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  };
};

export const fetchUserSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    userData: userData
  };
};

export const fetchUserFailed = () => {
  return {
    type: actionTypes.FETCH_USER_FAILED
  };
};

export const initFetchUser = () => {
  return dispatch => {
    dispatch(fetchUserStart());
    axios.get('/auth/user', {withCredentials: true})
        .then(resp => {
          if(resp.data.authenticated){
            dispatch(fetchUserSuccess(resp.data));
          }
        })
        .catch(err => {
          dispatch(fetchUserFailed());
        });
  };
}

export const userLogoutSuccess = () => {
  return {
    type: actionTypes.USER_LOGOUT_SUCCESS
  };
}

export const initUserLogout = () => {
  return dispatch => {
    axios.get('/auth/logout')
          .then(resp => {
            toast.success(resp.data.message);
            dispatch(userLogoutSuccess());
          })
          .catch(err => {
            toast.error('Logout Failed');
          });
  }
}