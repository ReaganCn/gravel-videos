import React from "react";

//import { NavLink } from "react-router-dom";

const activeStyle = {
  borderBottom: "2px solid whitesmoke",
  cursor: "pointer",
  color: "white",
}

const inActiveStyle = {

}

const CategoriesNavComponent = (props) => {

  return (
    <a className="nav-item nav-link categories-link" style ={props.active ? activeStyle: inActiveStyle } id={props.id} onClick={props.onClick}>
      {props.category}
    </a>
  );
};

export default CategoriesNavComponent;
