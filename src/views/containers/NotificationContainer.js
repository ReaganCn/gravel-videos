import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import NotificationComponent from "../components/NotificationComponent";
import { clearNotifications } from "../../redux/notification/actions";
import NotificationMsgsComponent from "../components/NotificationMsgsComponent";

//Redux

const mapStateToProps = ({ notification }) => {
  return {
    state: notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickBell: () => {
      dispatch(clearNotifications());
    },
  };
};

//Some vanilla functions

const NotificationContainer = (props) => {
  const [items, setItems] = useState(false);

  const notificationClick = () => {
    props.clickBell();
    items ? setItems(false) : setItems(true);
  };

  const messages = props.state.messages.slice(0,7).map((item, index) => {
    return <NotificationMsgsComponent message={item} key={index} />;
  });

  return (
    <Fragment>
      <i className="fa fa-search search-toggle" ariaHidden="true"></i>
      <NotificationComponent
        count={props.state.count}
        onClickBell={() => notificationClick()}
      />
      <div>

      <ul
        className="notification-messages"
        style={items ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        <div className="notif-top">
          <span><p className="notifications-header">Notifications</p></span>
  </div>
        {messages}
      </ul>
      </div>


      <img
        className="profile-image"
        src="/public/imgs/profile-image.png"
        alt=""
      />
    </Fragment>
  );
};

const NotificationConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);

export default NotificationConnected;
