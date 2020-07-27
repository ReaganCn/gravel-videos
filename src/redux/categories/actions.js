import {
  FETCH_CATEGORY_VIDEOS_REQUEST,
  FETCH_CATEGORY_VIDEOS_SUCCESS,
  FETCH_CATEGORY_VIDEOS_FAILURE,
  FETCH_VIDEOS_CATEGORIES,
  SET_ACTIVE_CATEGORY
} from "./types";

const fetchVideos = (data) => {
  return {
    type: FETCH_CATEGORY_VIDEOS_SUCCESS,
    data,
  };
};

const fetchVideosCategories = (data) => {
  return {
    type: FETCH_VIDEOS_CATEGORIES,
    data,
  };
};

const requestVideos = () => {
  return {
    type: FETCH_CATEGORY_VIDEOS_REQUEST,
  };
};

const fetchFailure = (err) => {
  return {
    type: FETCH_CATEGORY_VIDEOS_FAILURE,
    err,
  };
};

const fetchFilterVideos = (categoryName) => {
  return (dispatch) => {
    dispatch(requestVideos());

    return fetch(
      `https://gravel-videos-api-reagan.glitch.me/categories/${categoryName}`
    )
      .then((data) => data.json())
      .then((data) => {
        if (!data || data.length === 0) {
          dispatch(fetchFailure("No Data Received"));
        } else if (categoryName === "") {
          const newData = data.map((element)=> {
              element.active = false
              return element;
          })
          dispatch(fetchVideosCategories(newData));
        } else {
          dispatch(fetchVideos(data));
        }
      })
      .catch((err) => dispatch(fetchFailure(err)));
  };
};

const activeCategoryAction = (category) => {
    return {
      type: SET_ACTIVE_CATEGORY,
      category
    }
}


export {
  fetchVideos,
  requestVideos,
  fetchFailure,
  fetchFilterVideos,
  fetchVideosCategories,
  activeCategoryAction
};
