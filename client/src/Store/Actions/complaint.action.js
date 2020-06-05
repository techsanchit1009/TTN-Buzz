import * as actionTypes from './actionTypes';
import axios from 'axios';
import { toast } from "react-toastify";


export const fetchComplaintStart = () => {
  return{
    type: actionTypes.FETCH_COMPLIANT_START
  };
}

export const fetchComplaintSuccess = (fetchedComplaints) => {
  return {
    type: actionTypes.FETCH_COMPLIANT_SUCCESS,
    complaints: fetchedComplaints
  };
}

export const initFetchUserComplaints = (id) => {
  return dispatch => {
    dispatch(fetchComplaintStart());
    axios.get(`http://localhost:5000/api/complaint?complaintBy=${id}`)
        .then(resp => {
          dispatch(fetchComplaintSuccess(resp.data));
        });
  }
}

export const initFetchAllComplaints = () => {
  return dispatch => {
    dispatch(fetchComplaintStart());
    axios.get(`http://localhost:5000/api/complaint`)
        .then(resp => {
          dispatch(fetchComplaintSuccess(resp.data));
        });
  }
}

export const addComplaintStart = () => {
  return {
    type: actionTypes.ADD_COMPLAINT_START
  };
}

export const addComplaintSuccess = (newComplaint) => {
  return {
    type: actionTypes.ADD_COMPLAINT_SUCCESS,
    newComplaint: newComplaint
  };
}

export const initAddComplaint = (complaintBody) => {
  return dispatch => {
    dispatch(addComplaintStart());
    axios.post('http://localhost:5000/api/complaint', complaintBody)
         .then(resp => {
           window.location.reload(false);
           dispatch(addComplaintSuccess(resp.data));
         });
  }
}

export const updateComplaint = () => {
  return {
    type: actionTypes.UPDATE_COMPLAINT
  };
}

export const initUpdateComplaintStatus = (complaintId, updatedStatus) => {
  return dispatch => {
    const updateBody = {
      status: updatedStatus,
    };
    axios.patch(`http://localhost:5000/api/complaint?complaintId=${complaintId}`, updateBody)
          .then(resp => {
            // console.log(resp.data);
            toast.success(resp.data);
            dispatch(updateComplaint());
          });
  };
}

export const initUpdateComplaintAssignee = (complaintId, assignedTo) => {
  return dispatch => {
    const updateBody = {
      assignedTo: assignedTo
    };
    axios.patch(`http://localhost:5000/api/complaint?complaintId=${complaintId}`, updateBody)
          .then(resp => {
            console.log(resp.data);
            toast.success(`Complaint assigned to ${assignedTo}`);
            dispatch(updateComplaint());
          });
  }
}