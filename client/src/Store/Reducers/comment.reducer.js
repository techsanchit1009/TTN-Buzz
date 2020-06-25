import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  comments: [],
  loadingComments: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_COMMENTS_START:
      return {
        ...state,
        loadingComments: true
      };
    
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loadingComments: false,
        comments: action.comments,
        totalComments: action.totalComments
      };

    case actionTypes.FETCH_COMMENTS_FAILED:
      return {
        ...state,
        loadingComments: false
      };

    case actionTypes.LOAD_MORE_COMMENTS_START:
      return {
        ...state,
        loadingComments: true
      }

    case actionTypes.LOAD_MORE_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, ...action.comments],
        loadingComments: false
      }

    case actionTypes.LOAD_MORE_COMMENTS_FAILED:
      return {
        ...state,
        loadingComments: false
      };
    
    case actionTypes.ADD_COMMENT_START:
      return{
        ...state,
        loadingComments: true
      };

    case actionTypes.ADD_COMMENT_SUCCESS:
      const updatedCommentsList = [
        action.newComment,
        ...state.comments
      ];
      return {
        ...state,
        comments: updatedCommentsList,
        loadingComments: false
      }

    case actionTypes.ADD_COMPLAINT_FAILED:
      return {
        ...state,
        loadingComments: false
      }


    case actionTypes.DELETE_COMMENT_START:
      return {
        ...state,
        loadingComments: true
      }

    case actionTypes.DELETE_COMMENT_SUCCESS:
      const commentListAfterDelete = state.comments.filter(comment => comment._id !== action.commentId);
      return{
        ...state,
        comments: commentListAfterDelete,
        loadingComments: false
      };

    case actionTypes.DELETE_COMMENT_FAILED:
      return{
        ...state,
        loadingComments: false
      }

    default:
      return state;
  }
};

export default reducer;