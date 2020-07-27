import {
  FETCH_VIDEOS_REQUEST,
  FETCH_CATEGORY_VIDEOS_SUCCESS,
  FETCH_CATEGORY_VIDEOS_FAILURE,
  FETCH_VIDEOS_CATEGORIES,
  SET_ACTIVE_CATEGORY,
} from "./types";
import { ADD_TO_WATCHLATER } from "../videos/types";
import { REMOVE_FROM_WATCHLATER } from "../watchlater/types";
import {formatDuration} from "../videos/reducers"
import { VIDEO_WATCHED } from "../watching/types";


const defaultState = {
  isFetching: true,
  categoryVideos: [],
  categories: [],
};
 
const categoriesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_VIDEOS_SUCCESS:
      const newVideos = action.data.map (video => {
        video.cleanDuration = formatDuration(video.duration)
        return video
      })
      return Object.assign({}, state, {
        isFetching: false,
        categoryVideos: newVideos,
      });
    case FETCH_CATEGORY_VIDEOS_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.err,
      });
    case FETCH_VIDEOS_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        categories: action.data,
      });
    case ADD_TO_WATCHLATER:
      const watchLaterVideo = state.categoryVideos.map((video) => {
        if (action.id === video._id) {
          video.onWatchLater = true;
        }
        return video;
      });
      return Object.assign({}, state, {
        categoryVideos: watchLaterVideo,
      });
    case REMOVE_FROM_WATCHLATER:
      const newWatchLater = state.categoryVideos.map((video) => {
        if (action.id === video._id) {
          video.onWatchLater = false;
        }
        return video;
      });
      return Object.assign({}, state, {
        watchLater: newWatchLater,
      });
    case VIDEO_WATCHED:
      const watchedVideos = state.categoryVideos.map((element) => {
        if (element._id === action.id) {
          element.views += 1;
        }

        return element;
      });
      return Object.assign({}, state, {
        categoryVideos: watchedVideos,
      });
    default:
      return state;
  }
};

const switchCategoriesReducer =  (state = {activeCategory: ""}, action) => {
    switch (action.type) {
      case SET_ACTIVE_CATEGORY:
        return Object.assign({}, state, {
          activeCategory: action.category
        })
      default:
        return state
    }
}

export {categoriesReducer, switchCategoriesReducer};
