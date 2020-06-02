import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchBuzzStart = () => {
  return {
    type: actionTypes.FETCH_BUZZ_START
  };
}

export const fetchBuzzSuccess = (buzz) => {
  return {
    type: actionTypes.FETCH_BUZZ_SUCCESS,
    buzz: buzz
  };
}

export const initFetchBuzz = () => {
  return dispatch => {
    dispatch(fetchBuzzStart());

    axios.get('http://localhost:5000/api/buzz')
        .then(resp => {
          dispatch(fetchBuzzSuccess(resp.data))
        });
  }
}

export const addBuzzStart = () => {
  return {
    type: actionTypes.ADD_BUZZ_START
  };
}

export const addBuzzSuccess = (newBuzz) => {
  return{
    type: actionTypes.ADD_BUZZ_SUCCESS,
    newBuzz: newBuzz
  };
}

export const initAddBuzz = (buzzBody) => {
  return dispatch => {
    dispatch(addBuzzStart());

    axios.post('http://localhost:5000/api/buzz', buzzBody)
          .then(resp => {
            // console.log(resp.data); 
            dispatch(addBuzzSuccess(resp.data));
          });
  }
}

export const likeDislikeBuzz = (updatedBuzzList) => {
  return {
    type: actionTypes.LIKE_DISLIKE_BUZZ,
    updatedBuzzList,
  }
}

export const initLikeDislikeBuzz = (buttonType, buzzId, email) => {
  return dispatch => {
      const emailBody = {
        email
      };
      axios.patch(`http://localhost:5000/api/buzz/${buttonType}/${buzzId}`, emailBody)
          .then(resp => {
            dispatch(likeDislikeBuzz(resp.data))
          });
  }
}



