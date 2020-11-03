import {updateState} from '../../utils/update-state';

import AuthorizationStatus from "../../consts/authorization-status";
import APIRoute from "../../consts/api-route";
import AppRoute from "../../consts/app-route";

// stateToProps
const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

// Actions
export const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
};

// ActionCreators (mapDispatchToProps) (2)
export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

// Selectors (async thunk func) (1)
export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH))) // normal redux dispatch
    .catch((err) => {
      throw err;
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH))) // if ok change auth status
    .then(() => dispatch(redirectToRoute(AppRoute.RESULT)))
);

// Reducer (mapDispatchToProps for updating stateToProps) (3)
export const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return updateState(state, {
        authorizationStatus: action.payload,
      });
  }

  return state;
};
