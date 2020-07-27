import React, { Fragment } from "react";
//import { NavLink, Switch, Route, BrowserRouter } from "react-router-dom";

import CategoriesNavConnected from "./CategoriesNavContainer";
import { CategoriesContainerConnected } from "./CategoriesContainer";

const CategoriesSection = () => {
  return (
    <Fragment>
      <CategoriesNavConnected />
      <CategoriesContainerConnected />
    </Fragment>
  );
};

export default CategoriesSection;
