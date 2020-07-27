import React, { Fragment } from "react";

const CreatorsComponent = (props) => {

  return (
    <Fragment>
      <span>
        <img
          className="creator-image"
          src="/public/imgs/creator-avatar.png"
          alt=""
        />
        {`${props.creator.firstName} ${props.creator.lastName}`}
  <button typeof="button" className="btn btn-outline-secondary follow-button btn-sm" onClick={props.onClick}>{props.followed ? "✓" : "+"}</button>
  </span>
      <br />
    </Fragment>
  );
};

export default CreatorsComponent;
