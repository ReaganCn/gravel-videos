import {
  GET_CREATORS_REQUEST,
  GET_CREATORS_SUCCESS,
  GET_CREATORS_FAILURE,
  FOLLOW_CREATOR
} from "./types";

const defaultState = {
  isFetching: undefined,
  creators: [],
};

const creatorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CREATORS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_CREATORS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        creators: action.data,
      });
    case GET_CREATORS_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.err,
      });
    case FOLLOW_CREATOR:
      const newCreators =  state.creators.map ((item)=> {
        if(item._id === action.id){
            item.followed ? item.followed = false : item.followed = true
        }
        return item
      })
      return Object.assign({}, state, {
        creators: newCreators 
      })
    default:
      return state;
  }
};

export { creatorsReducer };
