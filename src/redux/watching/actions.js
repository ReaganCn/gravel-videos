import { CLOSE, VIDEO_WATCHED } from "./types";

const closeAction = () => {
  return {
    type: CLOSE,
  };
};

const addViewsAction = (id) => {
  return {
    type: VIDEO_WATCHED,
    id,
  };
};

export { closeAction, addViewsAction };
