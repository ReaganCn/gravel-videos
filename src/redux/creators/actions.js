import {
  GET_CREATORS_REQUEST,
  GET_CREATORS_SUCCESS,
  GET_CREATORS_FAILURE,
  FOLLOW_CREATOR
} from "./types";

const fetchCreators = (data) => {
  return {
    type: GET_CREATORS_SUCCESS,
    data,
  };
};

const requestCreators = () => {
  return {
    type: GET_CREATORS_REQUEST,
  };
};

const fetchFailure = (err) => {
  return {
    type: GET_CREATORS_FAILURE,
    err,
  };
};

const followCreators = (id) => {
  return {
    type: FOLLOW_CREATOR,
    id
  }
}

const fetchingCreators = () => {
  return (dispatch) => {
    dispatch(requestCreators());

    return fetch(`https://gravel-videos-api-reagan.glitch.me/creators`)
      .then((data) => data.json())
      .then((data) => {
        if (!data || data.length === 0) {
          dispatch(fetchFailure("No Data Received"));
        } else {
          const newData = data.map((item)=>{
              item.followed = false;
              return item
          })
          dispatch(fetchCreators(newData));
        }
      })
      .catch((err) => dispatch(fetchFailure(err)));
  };
};

export { fetchCreators, requestCreators, fetchFailure, fetchingCreators, followCreators };
