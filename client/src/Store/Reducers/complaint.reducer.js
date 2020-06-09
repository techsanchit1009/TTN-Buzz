import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  complaints: [],
  loadingComplaints: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_COMPLIANT_START:
      return {
        ...state,
        loadingComplaints: true
      }
    
    case actionTypes.FETCH_COMPLIANT_SUCCESS:
      return {
        ...state,
        complaints: action.complaints,
        loadingComplaints: false
      }  

    case actionTypes.FETCH_COMPLAINT_FAILED:
      return {
        ...state,
        loadingComplaints: false
      }

    case actionTypes.ADD_COMPLAINT_START:
      return{
        ...state,
        loadingComplaints: true
      }

    case actionTypes.ADD_COMPLAINT_FAILED:
      return {
        ...state,
        loadingComplaints: false
      }
    
    case actionTypes.ADD_COMPLAINT_SUCCESS:
      const updatedComplaintsList = [
        action.newComplaint,
        ...state.complaints
      ];
      return {
        ...state,
        complaints: updatedComplaintsList,
        loadingComplaints: false
      } 

    case actionTypes.UPDATE_COMPLAINT:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default reducer;