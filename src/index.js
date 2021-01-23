import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/rootStore";

import VideoCardConnected from "./views/containers/VideosContainer";
import SearchConnected from "./views/containers/SearchContainer";
import WatchingConnected from "./views/containers/WatchingContainer";
// import CategoriesSection from "./views/containers/categories-section/CategoriesSection";
// import { NavLink, Switch, Route, BrowserRouter } from "react-router-dom";
import NotificationConnected from "./views/containers/NotificationContainer";

const Main = () => {
  return (
    <Provider store={store}>
      <VideoCardConnected />
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

ReactDOM.render(
  <Provider store={store}>
    <SearchConnected />
  </Provider>,
  document.getElementById("search-box")
);

ReactDOM.render(
  <Provider store={store}>
    <WatchingConnected />
  </Provider>,
  document.getElementById("watch-container")
);

// ReactDOM.render(
//   <Provider store={store}>
//     <CategoriesSection />
//   </Provider>,
//   document.getElementById("categories-wrapper")
// );

ReactDOM.render(
  <Provider store={store}>
    <NotificationConnected />
  </Provider>,
  document.getElementById("top-right")
);
