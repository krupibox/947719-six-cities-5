import {updateState} from '../../utils/update-state';

import AuthorizationStatus from "../../consts/authorization-status";
import APIRoute from "../../consts/api-route";
import AppRoute from "../../consts/app-route";

// stateToProps
const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationEmail: ``,
};

// Actions
export const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SAVE_AUTHORIZATION_EMAIL: `SAVE_AUTHORIZATION_EMAIL`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
};

// ActionCreators (mapDispatchToProps) (2)
export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const saveAuthorizationData = (authorizationEmail) => ({
  type: ActionType.SAVE_AUTHORIZATION_EMAIL,
  payload: authorizationEmail,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

// Selectors (async thunk func) (1)
export const checkAuth = () => (dispatch, _getState, api) => (
  // api.get(APIRoute.LOGIN) // temporary
  api.get(APIRoute.LOGIN, {email: `Oliver.conner@gmail.com`, password: `12345678`})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH))) // normal redux dispatch
    .catch((err) => {
      throw err;
    })
);

// {login: this.loginRef.current.value, password: this.passwordRef.current.value}
// destructuring to {login: email, password}
export const login = ({login: email, password}) => (dispatch, getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH))) // if ok change auth status
    .then(() => dispatch(saveAuthorizationData(email))) // if ok change auth status
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
);


// Reducer (mapDispatchToProps for updating stateToProps) (3)
export const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return updateState(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SAVE_AUTHORIZATION_EMAIL:
      return updateState(state, {
        authorizationEmail: action.payload,
      });
  }

  return state;
};
