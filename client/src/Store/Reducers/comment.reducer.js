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
        comments: action.comments
      };

    case actionTypes.FETCH_COMMENTS_FAILED:
      return {
        ...state,
        loadingComments: false
      };

    default:
      return state;
  }
};

export default reducer;