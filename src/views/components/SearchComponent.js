import React, { Fragment } from "react";

const SearchComponent = (props) => {
  return (
    <Fragment>
      {/* <input
        className="form-control mr-sm-2 search-box"
        type="search"
        placeholder="search"
        aria-label="Search"
        value={props.searchquery}
        onChange= {props.onChange}
      /> */}

<form action="">
  <input type="text" placeholder="Search"value={props.searchquery} onChange= {props.onChange}/>
  <i className="fa fa-search" aria-hidden="true"></i>
</form>

    </Fragment>
  );
};

export default SearchComponent;
