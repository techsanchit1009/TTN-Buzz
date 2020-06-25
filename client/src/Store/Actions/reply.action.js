import * as actionTypes from './actionTypes';
import axios from 'axios';
import { toast } from "react-toastify";
import { loadMoreBuzzStart } from './buzz.action';

export const fetchRepliesStart = () => {
  return {
    type: actionTypes.FETCH_REPLIES_START
  };
}

export const fetchRepliesSuccess = (replyData) => {
  return {
    type: actionTypes.FETCH_REPLIES_SUCCESS,
    replies: replyData.replies,
    totalReplies: replyData.totalReplies
  };
}

export const fetchRepliesFailed = () => {
  return {
    type: actionTypes.FETCH_REPLIES_FAILED
  };
}

export const initFetchReplies = (commentId) => {
  return dispatch => {
    dispatch(fetchRepliesStart());
    axios.get(`/api/commentReply/${commentId}`)
          .then(resp => {
            dispatch(fetchRepliesSuccess(resp.data));
          })
          .catch(err => {
            dispatch(fetchRepliesFailed());
          });
  }
}

export const loadMoreRepliesStart = () => {
  return {
    type: actionTypes.LOAD_MORE_REPLIES_START
  }
}

export const loadMoreRepliesSuccess = (replyData) => {
  return {
    type: actionTypes.LOAD_MORE_REPLIES_SUCCESS,
    replies: replyData.replies,
    totalReplies: replyData.totalReplies
  };
}

export const loadMoreRepliesFailed = () => {
  return {
    type: actionTypes.LOAD_MORE_REPLIES_FAILED
  }
}

export const initLoadMoreReplies = (commentId, pageNo) => {
  return dispatch => {
    dispatch(loadMoreRepliesStart());
    axios.get(`/api/commentReply/${commentId}/?page=${pageNo}`)
        .then(resp => {
          dispatch(loadMoreRepliesSuccess(resp.data));
        })
        .catch(err => {
          dispatch(loadMoreRepliesFailed());
        });
  }
}


export const addReplyStart = () => {
  return {
    type: actionTypes.ADD_REPLY_START
  }
}

export const addReplySuccess = (newReply) => {
  return{
    type: actionTypes.ADD_REPLY_SUCCESS,
    newReply: newReply
  };
}

export const addReplyFailed = () => {
  return {
    type: actionTypes.ADD_REPLY_FAILED
  }
}

export const initAddReply = (commentId, buzzId, replyBody) => {
  return dispatch => {
    dispatch(addReplyStart());
    axios.post(`/api/commentReply/${commentId}/${buzzId}`, replyBody)
          .then(resp => {
            toast.success('Reply added successfully!');
            dispatch(addReplySuccess(resp.data));
          })
          .catch(err => {
            toast.error('Failed to add Reply!');
            dispatch(addReplyFailed(err));
          })
  }
}