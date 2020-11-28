import {
  requireAuthorization,
  saveAuthorizationData,
  redirectToRoute
} from './user-actions';
import {AuthorizationStatus} from "@root/consts/authorization-status";
import {APIRoute} from "@root/consts/api-route";
import {AppRoute} from "@root/consts/app-route";

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
