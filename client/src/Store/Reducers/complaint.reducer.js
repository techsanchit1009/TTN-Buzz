import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  complaints: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_COMPLIANT_START:
      return {
        ...state,
        loading: true
      }
    
    case actionTypes.FETCH_COMPLIANT_SUCCESS:
      return {
        ...state,
        complaints: action.complaints,
        loading: false
      }  

    case actionTypes.ADD_COMPLAINT_START:
      return{
        ...state,
        loading: true
      }
    
    case actionTypes.ADD_COMPLAINT_SUCCESS:
      const updatedComplaintsList = state.complaints.concat(action.newComplaint)
      return {
        ...state,
        loading: false,
        complaints: updatedComplaintsList
      } 
    default:
      return state;
  }
}

export default reducer;