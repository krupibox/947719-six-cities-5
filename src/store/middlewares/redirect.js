import browserHistory from "@root/browser-history";
import {ActionType} from "../reducers/user/user-actions";

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
