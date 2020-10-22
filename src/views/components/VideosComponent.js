import React from "react";

let watchedStyle = {
  color: "grey",
};

let buttonStyle = {
  display: "none",
}; 

const VideosComponent = (props) => {
  return (
    <div className="col-sm-4 ">
      <div className="card video-card">
        <div className="video-thumbnail">
          <img
            onClick={props.watchVideo}
            className="card-img-top"
            src={`public/imgs/${props.category}.png`}
            alt="Card image cap"
          />
          <small className="video-duration">{props.video.cleanDuration}</small>
          <a className="watch-later-button" id="watch-later-button">
            <i
              className="fa fa-clock-o"
              onClick={props.addToWL}
              style={
                props.onWatchLater
                  ? { visibility: "hidden" }
                  : { visibility: "visible" }
              }
            ></i>
            <small className="watch-later-text">add to watchlater</small>
          </a>
        </div>
        <div className="card-body" onClick={props.watchVideo}>
          <h5
            className="card-title"
            onClick={props.onClick}
            // style={props.video.watched ? watchedStyle : { color: "white" }}
          >
            
            {props.video.title}
          </h5>
          <p className="card-text">{props.video.creator}</p>
          <small className="views">{props.video.views !== 1 ? `${props.video.views} views` : `${props.video.views} view`} </small>
        </div>
      </div>
    </div>
  );
};

export default VideosComponent;
