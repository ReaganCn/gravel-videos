import { REMOVE_FROM_WATCHLATER } from "./types";


const removeWatchLaterAction = (id) => {
    return {
        type: REMOVE_FROM_WATCHLATER,
        id
    }
  }

export { removeWatchLaterAction }