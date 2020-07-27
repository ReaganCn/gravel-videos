import React, { useEffect, useState } from "react";

const WatchLaterComponent = (props) => {
  return (
    <div className="list-group watch-later-items"  style={{cursor: "pointer"}}>
                     
      <div className="list-group-item list-group-item-action">

        <div onClick = {props.playVideo} className="d-flex w-100 justify-content-between">
          <h6 className="mb-1 card-title">{props.video.title}</h6>
          <small>{props.diff} ago</small>

        </div>

        <small>{props.description}</small>
      
      </div>
      <button className="btn btn-sm remove-watchlater-button" alt="remove video" onClick= {props.onClick}>x</button>
    </div>
  );
};

export default WatchLaterComponent;
