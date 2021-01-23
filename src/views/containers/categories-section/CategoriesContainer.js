import React, { useEffect, useState, Fragment } from "react";
//import { useLocation, Route } from "react-router-dom";
import { connect } from "react-redux";

import CategoriesComponent from "../../components/CategoriesComponent";
import { fetchFilterVideos } from "../../../redux/categories/actions";
import { videoClickedAction, watchLaterAction } from "../../../redux/videos/actions"
import VideosComponent from "../../components/VideosComponent";
import { fireNotification } from "../../../redux/notification/actions";

let catRegex = new RegExp("[^/]", "g");

//Redux

const mapStateToProps = ({ categories, videoList, activeCategory }) => {
  return {
    state: categories,
    videos: videoList,
    category: activeCategory
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideos: (categoryName) => {
      dispatch(fetchFilterVideos(categoryName));
    },
    onVideoClick: (video) => {
      dispatch(videoClickedAction(video));
    },
    addToWatchLater: (id) => {
      dispatch(watchLaterAction(id));
    },
    notification: (message) => {
      dispatch(fireNotification(message))
    }
  };
};

//Helper functions
const standardize = (string) => {
  const cleanString = /[\w]+/g;
  return string.match(cleanString).join("").toLowerCase();
};

//React
const CategoriesContainer = (props) => {
  const [category, setcategory] = useState([])

  const randomCategory = Math.floor(Math.random()*props.state.categories.length)

  useEffect(() => {
    if (props.state.categories.length !== 0){
      props.fetchVideos(props.state.categories[randomCategory].category)
    }
  }, [props.state.categories])

  useEffect(()=> {
    if (props.category.activeCategory !== ""){
      props.fetchVideos(props.category.activeCategory)
    }
  }, [props.category.activeCategory])

  const videoClicked = (id) => {
    for (let element of props.state.categoryVideos) {
      if (element._id === id) {
        props.onVideoClick(element);
      }
    }
  };

  const addToWatchLater = (id, title) => {
    props.addToWatchLater(id)
    props.notification(`"${title}" added to watch later!`)
}


const categoryVideosMap = props.state.categoryVideos.map( video => {
  
  return <VideosComponent 
  key={video._id}
  video={video}
  // onClick={() => watchedVideo(video._id)}
  addToWL={() => addToWatchLater(video._id, video.title)}
  onWatchLater={video.onWatchLater}
  watchVideo={() => videoClicked(video._id)}
  category ={standardize(video.category)}
  />
})

return <Fragment>

  
  <div className="">
        <div className="card-deck ">{categoryVideosMap}</div>
      </div>
  </Fragment>;
};

const CategoriesContainerConnected = connect(mapStateToProps, mapDispatchToProps)(
  CategoriesContainer
);

export {CategoriesContainerConnected};
