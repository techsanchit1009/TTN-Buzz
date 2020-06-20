import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  user: {},
  loading: false,
  authenticated: false
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_USER_START:
      return {
        ...state,
        loading: true
      };
    
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.userData.user,
        authenticated: action.userData.authenticated,
        loading: false,
      };

    case actionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        authenticated: false,
      } 
    default:
      return state;
  }
}

export default reducer;