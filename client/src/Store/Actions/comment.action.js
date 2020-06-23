import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCommentsStart = () => {
  return {
    type: actionTypes.FETCH_COMMENTS_START
  };
}

export const fetchCommentsSuccess = (comments) => {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    comments: comments
  };
}

export const fetchCommentsFailed = () => {
  return {
    type: actionTypes.FETCH_COMMENTS_FAILED
  };
}

export const initFetchComments = (buzzId) => {
  return dispatch => {
    dispatch(fetchCommentsStart());
    axios.get(`/api/comment/${buzzId}`)
        .then(resp => {
          dispatch(fetchCommentsSuccess(resp.data));
        })
        .catch(err => {
          dispatch(fetchCommentsFailed());
        });
  }
}