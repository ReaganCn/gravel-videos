import { HANDLE_CHANGE, GET_VIDEOS, GET_SEARCH_RESULTS, TOGGLE_SEARCH } from "./types";



const handleChangeAction = (event) => {
    return {
        type: HANDLE_CHANGE,
        event
    }
}

const getSearchPool = (data) => {
    return {
        type: GET_VIDEOS,
        data
    }

}
const toggleSearchAction = () => {
    return {
        type: TOGGLE_SEARCH,
    }
}

const searchResultsAction = (results) => {
    return {
        type: GET_SEARCH_RESULTS,
        results
    }
}



export {handleChangeAction, getSearchPool, searchResultsAction, toggleSearchAction};