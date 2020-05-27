import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  user: {},
  sessionData: {},
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
        sessionData: action.userData.cookie,
        authenticated: action.userData.authenticated,
        loading: false,
      };

    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        user: {},
        authenticated: false,
        sessionData: {}
      } 
    default:
      return state;
  }
}

export default reducer;