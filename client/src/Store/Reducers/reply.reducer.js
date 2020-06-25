import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  replies: [],
  loadingReplies: false,
  totalReplies: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_REPLIES_START:
      return {
        ...state,
        loadingReplies: true
      }
    
    case actionTypes.FETCH_REPLIES_SUCCESS:
      return{
        ...state,
        replies: action.replies,
        loadingReplies: false,
        totalReplies: action.totalReplies
      }

    case actionTypes.FETCH_REPLIES_FAILED:
      return {
        ...state,
        loadingReplies: false
      }

    case actionTypes.LOAD_MORE_REPLIES_START:
      return {
        ...state,
        loadingReplies: true
      }

    case actionTypes.LOAD_MORE_REPLIES_SUCCESS:
      return {
        ...state,
        replies: [...state.replies, ...action.replies],
        totalReplies: action.totalReplies,
        loadingReplies: false
      }
    
    case actionTypes.LOAD_MORE_REPLIES_FAILED:
      return {
        ...state,
        loadingReplies: false
      }

    case actionTypes.ADD_REPLY_START:
      return {
        ...state,
        loadingReplies: true,
      }

    case actionTypes.ADD_REPLY_SUCCESS:
      const updatedReplyList = [
        action.newReply,
        ...state.replies
      ];
      return {
        ...state,
        replies: updatedReplyList,
        loadingReplies: false,
      }

    case actionTypes.ADD_REPLY_FAILED:
      return{
        ...state,
        loadingReplies: false
      }

    default:
      return state
  }
}

export default reducer;