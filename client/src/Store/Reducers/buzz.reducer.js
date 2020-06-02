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
      const buzzData = action.buzz.map(buzz => (
        {
          ...buzz,
          likes: buzz.likedBy.length,
          dislikes: buzz.dislikedBy.length
        }
      ));
      return{
        ...state,
        buzzList: buzzData,
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

    case actionTypes.LIKE_BUZZ:
      let buzzToUpdateIndex = state.buzzList.findIndex(buzz => buzz._id === action.buzzId);

      const updatedBuzz = {
        ...state.buzzList[buzzToUpdateIndex],
        likes: state.buzzList[buzzToUpdateIndex].likes + 1
      }
      state.buzzList[buzzToUpdateIndex] = updatedBuzz;
      return {
        ...state,
        buzzList: [
          ...state.buzzList,
        ]
      }

      // case actionTypes.DISLIKE_BUZZ:
      //   let buzzToUpdateIndex = state.buzzList.findIndex(buzz => buzz._id === action.buzzId);

      //   const updatedBuzz = {
      //     ...state.buzzList[buzzToUpdateIndex],
      //     likes: state.buzzList[buzzToUpdateIndex].dislikes + 1
      //   }
      //   state.buzzList[buzzToUpdateIndex] = updatedBuzz;
      //   return {
      //     ...state,
      //     buzzList: [
      //       ...state.buzzList,
      //     ]
      //   }


      case actionTypes.LIKE_DISLIKE_BUZZ:

        return{
          ...state,
          buzzList: action.updatedBuzzList
        }

    
    default:
      return state;
  }
}

export default reducer;