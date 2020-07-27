import {
  FIRE_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "./types";

const fireNotification = (message) => {
  return {
    type: FIRE_NOTIFICATION,
    message,
  };
};

const clearNotifications = () => {
  return {
    type: CLEAR_NOTIFICATIONS
  }
}


export { fireNotification, clearNotifications };
