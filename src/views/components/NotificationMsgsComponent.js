import React, { Fragment } from "react";

const NotificationMsgsComponent = (props) => {
  return (
    <Fragment>
      <span className="list-group-item notification-item">{props.message} </span>

    </Fragment>
  );
};

export default NotificationMsgsComponent;
