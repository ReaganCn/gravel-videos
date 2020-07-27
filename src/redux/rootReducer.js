import { combineReducers } from "redux";
import {
  videoReducer,
  videoClickedReducer,
  watchLaterReducer,
} from "./videos/reducers";
import searchReducer from "./search/reducers";
import {
  categoriesReducer,
  switchCategoriesReducer,
} from "./categories/reducers";
import { creatorsReducer } from "./creators/reducers";
import { notificationReducer } from "./notification/reducers";

const rootReducer = combineReducers({
  videoList: videoReducer,
  searchHandler: searchReducer,
  clickedVideo: videoClickedReducer,
  categories: categoriesReducer,
  watchLater: watchLaterReducer,
  activeCategory: switchCategoriesReducer,
  creatorsList: creatorsReducer,
  notification: notificationReducer
});

export default rootReducer;
