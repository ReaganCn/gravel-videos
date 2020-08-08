import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import CategoriesNavComponent from "../../components/CategoriesNavComponent";
import { fetchFilterVideos, activeCategoryAction } from "../../../redux/categories/actions";
//import {  } from "../../../../public/javascript";


const standardize = (string) => {
  const cleanString = /[\w]+/g;
  return string.match(cleanString).join("").toLowerCase();
};

//console.log(standardString("Computer Science"))

//redux
const mapStateToProps = ({ categories }) => {
  return {
    state: categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (categoryName) => {
      dispatch(fetchFilterVideos(categoryName));
    },
    activeCategory: (category) => {
      dispatch(activeCategoryAction(category));
    },
  };
};

//React
const CategoriesNavContainer = (props) => {
  const [active, setActive] = useState(false);
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    props.fetchCategories("");
  }, []);

  useEffect(()=> {
    setCategories(props.state.categories)
  },[props.state.categories])


  const clickLink = (category, id) => {
    props.activeCategory(category)
    const newCategories = categories.map((element)=> {
      if (element._id === id){
          element.active = true;
      }else {
        element.active = false;
      }
      return element;
    })
    setCategories(newCategories);
  }

  const categoryList = categories.map((element) => {
    return (
      <CategoriesNavComponent
        key={element._id}
        onClick= {()=> clickLink(element.category, element._id) }
        category={element.category}
        id={standardize(element.category)}
        active={element.active}
      />
    );
  });
  return (
    <Fragment>
      <h1 class="section-header" style={props.state.isFetching ? { visibility: "hidden"} : {visibility: "visible"} }>Categories</h1>
      <nav className="navbar navbar-expand-lg navbar-dark categories-navigation navbar-expand">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav" id="links-container">
          {categoryList}

        </div>
      </div>
    </nav>
    </Fragment>

  );
};

//React-Redux
const CategoriesNavConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesNavContainer);

export default CategoriesNavConnected;
