import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  buzzList: [],
  loadingBuzz: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_BUZZ_START:
      return {
        ...state,
        loadingBuzz: true
      }
    
    case actionTypes.FETCH_BUZZ_SUCCESS:
      return{
        ...state,
        buzzList: action.buzz,
        loadingBuzz: false
      }

    case actionTypes.FETCH_BUZZ_FAILED:
      return{
        ...state,
        loadingBuzz:false
      }

    case actionTypes.ADD_BUZZ_START:
      return{
        ...state,
        loadingBuzz: true
      };

    case actionTypes.ADD_BUZZ_FAILED:
      return {
        ...state,
        loadingBuzz: false
      }

    case actionTypes.ADD_BUZZ_SUCCESS:
      const updatedBuzzList = [
        action.newBuzz,
        ...state.buzzList
      ]
      return {
        ...state,
        buzzList: updatedBuzzList,
        loadingBuzz: false
      };

    case actionTypes.LIKE_DISLIKE_BUZZ:
        return{
          ...state,
          buzzList: action.updatedBuzzList
        }
    
    case actionTypes.DELETE_BUZZ_START:
        return {
          ...state,
          loadingBuzz: true
        }

    case actionTypes.DELETE_BUZZ_FAILED:
      return {
        ...state,
        loadingBuzz: false
      }

    case actionTypes.DELETE_BUZZ_SUCCESSS:
      const buzzListAfterDelete = state.buzzList.filter(buzz => buzz._id !== action.buzzId )
      return {
        ...state,
        buzzList: buzzListAfterDelete,
        loadingBuzz: false
      }
    default:
      return state;
  }
}

export default reducer;