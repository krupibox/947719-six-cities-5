import {updateState} from '../../../utils/update-state';
import ModelUser from '../../../models/model-user';
import {AuthorizationStatus} from "../../../consts/authorization-status";
import {APIRoute} from "../../../consts/api-route";
import {AppRoute} from "../../../consts/app-route";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationInfo: {},
};

export const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SAVE_AUTHORIZATION_DATA: `SAVE_AUTHORIZATION_DATA`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
};

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const saveAuthorizationData = (info) => ({
  type: ActionType.SAVE_AUTHORIZATION_DATA,
  payload: ModelUser.parse(info),
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(saveAuthorizationData(data));
    }).catch(() => {
      dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(saveAuthorizationData(data));
      dispatch(redirectToRoute(AppRoute.ROOT));
    })
);

export const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return updateState(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SAVE_AUTHORIZATION_DATA:
      return updateState(state, {
        authorizationInfo: action.payload,
      });
  }

  return state;
};
