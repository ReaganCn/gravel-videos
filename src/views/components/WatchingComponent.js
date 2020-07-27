import React, { useEffect, useState } from "react";

const WatchingComponent = (props) => {
 
  return ( 
<div className="watch-container" style={ props.watching === false ? {display: "none"} : {display: "block"} }>
    <div className="col-12 now-watching">
    <div className="watching-container">
      <video
        src={props.video.videourl}
        className="the-video"
        controls
      ></video>
      <div className="video-details">
  <h4 className="watching-title">{props.video.title}</h4>
        <h6 className="watching-creator">{props.video.creator}</h6>
        <small className="views">{props.video.views} views</small>
  <small className="date-uploaded">Uploaded: {props.date}</small>

        <p className="watching-description">
        {props.video.description}
        </p>
      </div>
    </div>
  </div>
  <div id="x" onClick={props.onClose}>✖</div>
  {/* <i className="fa fa-times exit" style={{color: "white"}} onClick={props.onClose} aria-hidden="true"></i> */}
  </div>
  )
};

export default WatchingComponent;
