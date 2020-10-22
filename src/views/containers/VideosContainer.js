import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import "../../../public/styles.css";

import {
  fetchingVideos,
  videoClickedAction,
  watchLaterAction,
} from "../../redux/videos/actions";
import VideosComponent from "../components/VideosComponent";
import WatchLaterConnected from "./WatchLaterContainer";
import CreatorsConnected from "./CreatorsContainer";
import { fireNotification } from "../../redux/notification/actions";

//Grabbing from Redux
const mapStateToProps = ({ videoList }) => {
  return {
    state: videoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideos: () => {
      dispatch(fetchingVideos());
    },
    onVideoClick: (video) => {
      dispatch(videoClickedAction(video));
    },
    addToWatchLater: (id) => {
      dispatch(watchLaterAction(id));
    },
    notification: (message) => {
      dispatch(fireNotification(message));
    },
  };
};

//Helper functions
const standardize = (string) => {
  const cleanString = /[\w]+/g;
  return string.match(cleanString).join("").toLowerCase();
};

//React
const VideosContainer = (props) => {
  const [videos, setVideos] = useState([]);
  const [watchLater, setWatchlater] = useState([]);
  //const [watchVideo, setWatchVideo] = useState({});

  useEffect(() => {
    props.fetchVideos();
  }, []);

  useEffect(() => {
    setVideos(props.state.videos);
  }, [props.state.videos]);

  const watchedVideo = (id) => {
    const updatedVideos = props.state.videos.map((item) => {
      if (id === item.id) {
        if (!item.watched) {
          item.watched = true;
        }
      }
      return item;
    });

    setVideos(updatedVideos);
  };

  //Video Clicked

  const videoClicked = (id) => {
    for (let element of videos) {
      if (element._id === id) {
        props.onVideoClick(element);
      }
    }
  };

  //add to watchLater

  const addToWatchLater = (id, title) => {
    props.addToWatchLater(id);
    props.notification(`"${title}" added to watch later!`);
  };

  const videoList = props.state.videos.slice(0, 6).map((video) => {
    return (
      <VideosComponent
        key={video._id}
        video={video}
        onClick={() => watchedVideo(video._id)}
        addToWL={() => addToWatchLater(video._id, video.title)}
        onWatchLater={video.onWatchLater}
        watchVideo={() => videoClicked(video._id)}
        category={standardize(video.category)}
      />
    );
  });

  return (
    <Fragment>
      <div
        className="col-3 watch-later-column"
        id="watch-later-column"
      >
        <CreatorsConnected />
        <h6 className="for-later-title">FOR LATER</h6>
        <WatchLaterConnected />
      </div>

     
      <div className="col-12 videos">
        <div className="tagline">
          <span className="tagline-text">
            Welcome to Gravel &nbsp;<img src="/public/imgs/forward-t.png" style={{width: "2rem", marginTop:"-8px", animation: "pulse 1s ease-out infinite"}}></img>
            {/* <i className="fa fa-video-camera video-icon" aria-hidden="true"></i>  */}
          </span>
          <br />
          <span className="tagline-text-small">
            Here are some videos we think you might like
          </span>
        </div>
        <div
          id="loader-wrapper"
          style={
            props.state.isFetching
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          <div id="loader"></div>
        </div>
        <div
          className="row card-deck"
          style={
            props.state.isFetching
              ? { visibility: "collapse" }
              : { visibility: "visible" }
          }
        >
          {videoList}
        </div>
      </div>
    </Fragment>
  );
};

//Connecting Redux with React
const VideoCardConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideosContainer);

export default VideoCardConnected;
