import * as actionTypes from './actionTypes';
import axios from 'axios';
import { toast } from "react-toastify";


export const fetchComplaintStart = () => {
  return{
    type: actionTypes.FETCH_COMPLAINT_START
  };
}

export const fetchComplaintFailed = () => {
  return{
    type: actionTypes.FETCH_COMPLAINT_FAILED
  };
}

export const fetchComplaintSuccess = (complaintData) => {
  return {
    type: actionTypes.FETCH_COMPLAINT_SUCCESS,
    complaints: complaintData.complaints,
    totalComplaints: complaintData.totalComplaints
  };
}

export const initFetchUserComplaints = (id, page) => {
  return dispatch => {
    dispatch(fetchComplaintStart());
    axios.get(`/api/complaint?complaintBy=${id}&page=${page}`)
        .then(resp => {
          dispatch(fetchComplaintSuccess(resp.data));
        })
        .catch(err => {
          toast.error(err.response.data.message);
          dispatch(fetchComplaintFailed());
        });
  }
}

export const initFetchAllComplaints = (page) => {
  return dispatch => {
    dispatch(fetchComplaintStart());
    axios.get(`/api/complaint?page=${page}`)
        .then(resp => {
          dispatch(fetchComplaintSuccess(resp.data));
        })
        .catch(err => {
          toast.error(err.response.data.message);
          dispatch(fetchComplaintFailed());
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

export const addComplaintFailed = () => {
  return {
    type: actionTypes.ADD_COMPLAINT_FAILED
  };
}

export const initAddComplaint = (complaintBody) => {
  return dispatch => {
    dispatch(addComplaintStart());
    axios.post('/api/complaint', complaintBody)
         .then(resp => {
          toast.success(`Complaint registered! | ID: ${resp.data.issueId}`);
          dispatch(addComplaintSuccess(resp.data));
         })
        .catch(err => {
          if(Array.isArray(err.response.data)){
            err.response.data.map(err => toast.error(err.message, {autoClose: 6000}));
          } else {
            toast.error(err.response.data.message)
          }
          dispatch(addComplaintFailed());
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
    axios.patch(`/api/complaint?complaintId=${complaintId}`, updateBody)
          .then(resp => {
            toast.success(resp.data);
            dispatch(updateComplaint());
          })
          .catch(err => toast.error(err.response.data.message));
  };
}

export const initUpdateComplaintAssignee = (complaintId, assignedTo) => {
  return dispatch => {
    const updateBody = {
      assignedTo: assignedTo
    };
    axios.patch(`/api/complaint?complaintId=${complaintId}`, updateBody)
          .then(resp => {
            toast.success(`Complaint assigned to ${assignedTo}`);
            dispatch(updateComplaint());
          })
          .catch(err => toast.error(err.response.data.message));

  }
}