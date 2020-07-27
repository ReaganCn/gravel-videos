import { HANDLE_CHANGE, GET_VIDEOS, GET_SEARCH_RESULTS } from "./types";



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

const searchResultsAction = (results) => {
    return {
        type: GET_SEARCH_RESULTS,
        results
    }
}



export {handleChangeAction, getSearchPool, searchResultsAction};