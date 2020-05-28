import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  buzzList: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_BUZZ_START:
      return {
        ...state,
        loading: true
      }
    
    case actionTypes.FETCH_BUZZ_SUCCESS:
      return{
        ...state,
        buzzList: action.buzz,
        loading: false
      }

    case actionTypes.ADD_BUZZ_START:
      return{
        ...state,
        loading: true
      };

    case actionTypes.ADD_BUZZ_SUCCESS:
      const updatedBuzzList = state.buzzList.concat(action.newBuzz);
      return {
        ...state,
        buzzList: updatedBuzzList,
        loading: false
      };
    
    default:
      return state;
  }
}

export default reducer;