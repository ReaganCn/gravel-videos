import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import WatchLaterComponent from "../components/WatchLaterComponent";
import { removeWatchLaterAction } from "../../redux/watchlater/actions";
import { videoClickedAction } from "../../redux/videos/actions";

//Grabbing from Redux
const mapStateToProps = ({ videoList }) => {
  return {
    state: videoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeVideo: (id) => {
      dispatch(removeWatchLaterAction(id));
    },
    playVideo: (video) => {
      dispatch(videoClickedAction(video));
    },
  };
};

//Helper functions
 
//-truncate description
const descriptionLength = 35;
const titleLength = 20;
const trucString = (str, num) => {
  if (str.length > num) {
    let trunc = str.substring(0, num);
    return trunc + "...";
  }
  return str;
};

//-time added to watchlater
const timeDiff = (then, now) => {
  let diff = now - then;
  diff /= 1000;
  var seconds = Math.round(diff);
  if (seconds < 60) {
    return seconds + "s";
  } else if (seconds > 60) {
    let min = Math.round(seconds / 60);
    return min + "min";
  } else if (seconds > 3600) {
    let hr = Math.round(seconds / 60);
    return hr + "h";
  }
};

const WatchLaterContainer = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(()=>{

  // },[currentTime])
const onVideoClick = (id) => {
  for (let element of props.state.videos) {
    if (element._id === id) {
      props.playVideo(element);
    }
  }
}


  const watchLaterMap = props.state.watchLater.slice(0, 3).map((element) => {
    return (
      <WatchLaterComponent
        key={element._id}
        video={element}
        diff={timeDiff(element.timeAdded, new Date())}
        description={trucString(element.description, descriptionLength)}
        onClick={() => props.removeVideo(element._id)}
        playVideo={()=> onVideoClick(element._id)}
      />
    );
  });

  return <div>{watchLaterMap}</div>;
};

const WatchLaterConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchLaterContainer);

export default WatchLaterConnected;
