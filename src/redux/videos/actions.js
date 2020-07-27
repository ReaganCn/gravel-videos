import {
  WATCHED,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  VIDEO_CLICKED,
  VIDEO_CLOSED,
  ADD_TO_WATCHLATER
} from "./types";
import videoData from "../../../VideosData";

const requestVideos = () => {
  return {
    type: FETCH_VIDEOS_REQUEST,
  };
};

const fetchVideos = (data) => {
  return {
    type: FETCH_VIDEOS_SUCCESS,
    data,
    receivedAt: Date.now(),
  };
};

const failedFetch = (error) => {
  return {
    type: FETCH_VIDEOS_FAILURE,
    error,
  };
};

const videoClickedAction = (video) => {
  return {
    type: VIDEO_CLICKED,
    video,
  };
};
 
const watchLaterAction = (id) => {
  return {
      type: ADD_TO_WATCHLATER,
      id
  }
}

const videoClosedAction = () => {
  return {
    type: VIDEO_CLOSED,
  };
};

//Async function for API calls
const fetchingVideos = () => {
  return (dispatch) => {
    dispatch(requestVideos());

    return fetch("https://gravel-videos-api-reagan.glitch.me/videos")
      .then((data) => data.json())
      .then((data) => {
        if (!data || data.length === 0) {
          dispatch(failedFetch("Did not get any data"));
        }
        dispatch(fetchVideos(data));
      })
      .catch((err) => console.log(err));
  };
};

export {
  fetchVideos,
  requestVideos,
  failedFetch,
  fetchingVideos,
  videoClickedAction,
  videoClosedAction,
  watchLaterAction
};
