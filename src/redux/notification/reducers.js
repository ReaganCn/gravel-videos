import {
  FIRE_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "./types";

const defaultState = {
  count: 0,
  messages: [],
  notificationId: 100
};

const notificationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FIRE_NOTIFICATION:
      return Object.assign({}, state, {
        count: state.count +1,
        messages: [ action.message, ...state.messages,],
        notificationId: state.notificationId+1
      });

    case CLEAR_NOTIFICATIONS:
      return Object.assign({}, state, {
        count: 0
      })
    default:
      return state;
  }
};

export { notificationReducer };
