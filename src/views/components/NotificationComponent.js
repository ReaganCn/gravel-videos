import React, { Fragment } from "react";

const NotificationComponent = (props) => {

  return (
    <Fragment>
              <i className="fa fa-bell notification" aria-hidden="true" onClick={props.onClickBell}>
              <div className="badge" style={props.count === 0 ? {visibility: "hidden"} : {visibility: "visible"}}><span className="notification-badge">{props.count <100 ? props.count : "99+" }</span></div>
              </i>
    </Fragment>
  );
};

export default NotificationComponent;
