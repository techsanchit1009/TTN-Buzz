import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    axios.get('http://localhost:5000/auth/success', {withCredentials: true})
        .then(resp => {
          dispatch(fetchUserSuccess(resp.data));
        })
        .catch(err => {
          dispatch(fetchUserFailed());
        });
  };
}

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
}