import browserHistory from "../../browser-history";
import {ActionType} from "../reducers/user";

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload); // url
  }

  return next(action);
};
