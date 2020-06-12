import * as actionTypes from "./actionTypes";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchBuzzStart = () => {
  return {
    type: actionTypes.FETCH_BUZZ_START,
  };
};

export const fetchBuzzSuccess = (buzz) => {
  return {
    type: actionTypes.FETCH_BUZZ_SUCCESS,
    buzz: buzz,
  };
};

export const fetchBuzzFailed = () => {
  return {
    type: actionTypes.FETCH_BUZZ_FAILED,
  };
};

export const initFetchBuzz = () => {
  return (dispatch) => {
    dispatch(fetchBuzzStart());

    axios
      .get("/api/buzz")
      .then((resp) => {
        dispatch(fetchBuzzSuccess(resp.data));
      })
      .catch((err) => {
        // console.log();
        dispatch(addBuzzFailed());
        toast.error(err.response.data.message);
      });
  };
};

export const addBuzzStart = () => {
  return {
    type: actionTypes.ADD_BUZZ_START,
  };
};

export const addBuzzSuccess = (newBuzz) => {
  return {
    type: actionTypes.ADD_BUZZ_SUCCESS,
    newBuzz: newBuzz,
  };
};

export const addBuzzFailed = () => {
  return {
    type: actionTypes.ADD_BUZZ_FAILED,
  };
};

export const initAddBuzz = (buzzBody) => {
  return (dispatch) => {
    dispatch(addBuzzStart());

    axios
      .post("/api/buzz", buzzBody)
      .then((resp) => {
        toast.success("Buzz Added successfully");
        dispatch(addBuzzSuccess(resp.data));
      })
      .catch((err) => {
        if(Array.isArray(err.response.data)){
          err.response.data.map(err => toast.error(err.message, {autoClose: 6000}));
        } else {
          toast.error(err.response.data.message)
        }
        dispatch(addBuzzFailed());
      });
  };
};

export const likeDislikeBuzz = (updatedBuzzList) => {
  return {
    type: actionTypes.LIKE_DISLIKE_BUZZ,
    updatedBuzzList,
  };
};

export const initLikeDislikeBuzz = (buttonType, buzzId, email) => {
  return (dispatch) => {
    const emailBody = {
      email,
    };
    axios
      .patch(`/api/buzz/${buttonType}/${buzzId}`, emailBody)
      .then((resp) => {
        dispatch(likeDislikeBuzz(resp.data));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
};

export const deleteBuzzStart = () => {
  return {
    type: actionTypes.DELETE_BUZZ_START
  };
}

export const deleteBuzzSuccess = (buzzId) => {
  return {
    type: actionTypes.DELETE_BUZZ_SUCCESSS,
    buzzId: buzzId
  };
}

export const deleteBuzzFailed = () => {
  return {
    type: actionTypes.DELETE_BUZZ_FAILED
  };
}

export const initDeleteBuzz = (buzzId) => {
  return dispatch => {
    dispatch(deleteBuzzStart());
    axios.delete(`/api/buzz/${buzzId}`)
        .then(resp => {
          console.log(resp.data);
          toast.success(resp.data.message);
          dispatch(deleteBuzzSuccess(buzzId));
        })
        .catch(err => {
          console.log(err);
          toast.error(err.response.data.message);
          dispatch(deleteBuzzFailed());
        })
  }
}