import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  complaints: [],
  loadingComplaints: false,
  totalComplaints: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_COMPLAINT_START:
      return {
        ...state,
        loadingComplaints: true
      }
    
    case actionTypes.FETCH_COMPLAINT_SUCCESS:
      return {
        ...state,
        complaints: action.complaints,
        loadingComplaints: false,
        totalComplaints: action.totalComplaints
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