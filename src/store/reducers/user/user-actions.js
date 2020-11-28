import {UserAdapter} from '@root/adapters';

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
  payload: UserAdapter.parse(info),
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});
