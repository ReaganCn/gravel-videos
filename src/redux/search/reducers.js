import { HANDLE_CHANGE, GET_VIDEOS, GET_SEARCH_RESULTS, TOGGLE_SEARCH } from "./types";

const defaultState =  {
    searchResults: [],
    searchQuery: "",
    videos: [],
    show: false,
}

const searchReducer = ( state = defaultState, action ) => {
    switch (action.type) {
        case HANDLE_CHANGE:
            const newState =  Object.assign({}, state)
            newState.searchQuery = action.event.target.value
            return newState;
        case GET_VIDEOS:
            return Object.assign({}, state, {
                videos: action.data
            })
        case GET_SEARCH_RESULTS:
            return Object.assign({}, state, {
                searchResults: action.results
            })
        case TOGGLE_SEARCH:
            return Object.assign({}, state , {
               show: state.show ? false : true 
            })
        default:
            return state
    }
}

export default searchReducer;