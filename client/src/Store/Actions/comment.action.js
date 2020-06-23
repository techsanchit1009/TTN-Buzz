import * as actionTypes from "./actionTypes";
import axios from "axios";
import { toast } from "react-toastify";

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

export const addCommentStart = () => {
  return {
    type: actionTypes.ADD_COMMENT_START
  };
}

export const addCommentSuccess = (newComment) => {
  return {
    type: actionTypes.ADD_COMMENT_SUCCESS,
    newComment: newComment
  };
}

export const addCommentFailed = () => {
  return {
    type: actionTypes.ADD_COMMENT_FAILED
  };
}

export const initAddComment = (buzzId, commentBody) => {
  return dispatch => {
    dispatch(addCommentStart());
    axios.post(`/api/comment/${buzzId}`, commentBody)
          .then(resp => {
            console.log(resp.data);
            toast.success('Comment added!');
            dispatch(addCommentSuccess(resp.data));
          })
          .catch(err => {
            toast.error('Failed to Add Comment!');
            dispatch(addCommentFailed());
          });
  }
}


export const deleteCommentStart = () => {
  return {
    type: actionTypes.DELETE_COMMENT_START
  };
}

export const deleteCommentSuccess = (commentId) => {
  return {
    type: actionTypes.DELETE_COMMENT_SUCCESS,
    commentId: commentId
  };
}

export const deleteCommentFailed = () => {
  return {
    type: actionTypes.DELETE_COMMENT_FAILED
  };
}

export const initDeleteComment = (commentId) => {
  return dispatch => {
    dispatch(deleteCommentStart());
    axios.delete(`/api/comment/${commentId}`)
        .then(resp => {
          console.log(resp.data);
          toast.success(resp.data.message);
          dispatch(deleteCommentSuccess(commentId))
        })
        .catch(err => {
          toast.error('Failed to delete comment!');
          dispatch(deleteCommentFailed());
        });
  }
}