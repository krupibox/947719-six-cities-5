import browserHistory from "../../browser-history";
import {ActionType} from "../reducers/user";

export const redirect = (_store) => (next) => (action) => {
  console.log(action);
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
