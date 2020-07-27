import {
  WATCHED,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  VIDEO_CLICKED,
  VIDEO_CLOSED,
  ADD_TO_WATCHLATER,
} from "./types";

import { VIDEO_WATCHED } from "../watching/types";

import { REMOVE_FROM_WATCHLATER } from "../watchlater/types";
//import {defaultState} from "../rootStore"

const defaultState = {
  isFetching: true,
  videos: [],
  videoClicked: {},
  watchLater: [],
};

const adjust = (time) => {
  time = Math.round(time);
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

const formatDuration = (dur) => {
  let seconds = Math.round(dur);
  const format = "HH:MM:SS";
  const toMinAndSeconds = (secs) => {
    let min = secs / 60;
    let s = secs % 60;
    return {
      min: min,
      s: s,
    };
  };
  const toHrsAndMins = (mins) => {
    let hr = mins / 60;
    let min = mins % 60;
    return {
      hr: hr,
      min: min,
    };
  };
  if (seconds < 60) {
    return `00:${adjust(seconds)}`;
  } else if (seconds > 59 && seconds < 3600) {
    return `${adjust(toMinAndSeconds(seconds).min)}:${adjust(
      toMinAndSeconds(seconds).s
    )}`;
  } else if (seconds > 3599) {
    const min = toMinAndSeconds(seconds).min;
    const s = toMinAndSeconds(seconds).s;
    return `${adjust(toHrsAndMins(min).hr)}:${adjust(
      toHrsAndMins(min).min
    )}:${adjust(s)}`;
  }
};

const videoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case WATCHED:
      const newState = state.videos.map((video) => {
        if (action.id === video.id) {
          if (!video.watched) {
            video.watched = true;
          }
          return video;
        }
      });
      return newState;
    case FETCH_VIDEOS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_VIDEOS_SUCCESS:
      const newVideos = action.data.map((video) => {
        video.cleanDuration = formatDuration(video.duration);
        return video;
      });
      return Object.assign({}, state, {
        isFetching: false,
        videos: newVideos,
        lastUpdated: action.receivedAt,
      });
    case FETCH_VIDEOS_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        error: action.error,
      });
    case ADD_TO_WATCHLATER:
      const watchLaterVideo = state.videos.filter((video) => {
        if (action.id === video._id) {
          video.onWatchLater = true;
          video.timeAdded = new Date();
        }
        return action.id === video._id;
      });
      return Object.assign({}, state, {
        watchLater: [...watchLaterVideo, ...state.watchLater],
      });
    case REMOVE_FROM_WATCHLATER:
      const newWatchLater = state.watchLater.filter((item) => {
        if (action.id === item._id) {
          item.onWatchLater = false;
        }
        return action.id !== item._id;
      });

      return Object.assign({}, state, {
        watchLater: newWatchLater,
      });
    case VIDEO_WATCHED:
      const watchedVideos = state.videos.map((element) => {
        if (element._id === action.id) {
          element.views += 1;
        }

        return element;
      });
      return Object.assign({}, state, {
        videos: watchedVideos,
      });
    default:
      return state;
  }
};

const watchLaterReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const videoClickedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case VIDEO_CLICKED:
      return Object.assign({}, state, {
        videoClicked: action.video,
      });
    case VIDEO_CLOSED:
      return Object.assign({}, state, {
        videoClicked: {},
      });
    default:
      return state;
  }
};

export { videoReducer, videoClickedReducer, watchLaterReducer, formatDuration };
