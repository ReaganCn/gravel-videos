import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import WatchingComponent from "../components/WatchingComponent";

import { videoClosedAction } from "../../redux/videos/actions";
import { addViewsAction } from "../../redux/watching/actions";

//Redux

const mapStateToProps = ({ clickedVideo }) => {
  return {
    clickedVideo: clickedVideo.videoClicked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVideoClose: () => {
      dispatch(videoClosedAction());
    },
    addViews: (id) => {
      dispatch(addViewsAction(id));
    },
  };
};

//Some vanilla functions

const isEmpty = (obj) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

const formatDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const newDate = new Date(date);

  let month = newDate.getMonth();
  let year = newDate.getFullYear();
  return `${monthNames[month]} ${year}`;
};

const WatchingContainer = (props) => {
  const [watching, setWatching] = useState(false);
  const [videoWatching, setVideoWatching] = useState(null);

  useEffect(() => {
    setVideoWatching(props.clickedVideo);
  }, [props.clickedVideo]);

  useEffect(() => {
    if (!isEmpty(videoWatching)) {
      setWatching(true);
    } else {
      setWatching(false);
    }
  }, [videoWatching]);

  //Fix close window and cant reopen the same video bug --- FIXED

  const closeWindow = (id) => {
    setVideoWatching(null);
    props.onVideoClose();
    props.addViews(id);
    //console.log(formatDate(props.clickedVideo.uploadedat))
  };
 
  return (
    <Fragment>
      <WatchingComponent
        video={props.clickedVideo}
        onClose={() => closeWindow(props.clickedVideo._id)}
        watching={watching}
        date={formatDate(props.clickedVideo.uploadedat)}
      />
    </Fragment>
  );
};

const WatchingConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchingContainer);

export default WatchingConnected;
