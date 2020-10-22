import React, { Fragment } from "react";
import MediaQuery from "react-responsive";

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

<form action="" className="form-large">
  <input type="text" placeholder="Search"value={props.searchquery} onChange= {props.onChange}/>
  <i className="fa fa-search" aria-hidden="true"></i>
</form>

<MediaQuery query="(max-width: 640px)">
<form action="" className="form-sm" style={props.state.show ? {display : "block"} : {display: "none"}}>
  <input type="text" placeholder="Search"value={props.searchquery} onChange= {props.onChange}/>
  <i className="fa fa-search" aria-hidden="true"></i>
</form>
</MediaQuery>
    </Fragment>
  );
};

export default SearchComponent;
