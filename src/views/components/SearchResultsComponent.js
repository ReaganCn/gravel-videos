import React, { Fragment } from "react";

const SearchResultsComponent = (props) => {
  return (
    <Fragment>
        <li className="list-group-item results-item" onClick={props.playVideo} style={{cursor: "pointer"}}>{props.title}</li>
    </Fragment>
  );
};

export default SearchResultsComponent;
