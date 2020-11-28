import {
  ActionType,
  requireAuthorization,
  saveAuthorizationData,
  redirectToRoute
} from './user-actions';

import {
  AuthorizationStatus,
  AppRoute
} from '@root/consts';

import {UserAdapter} from '@root/adapters';
import {TestMock} from '@root/__mocks__/mocks';

const {info} = TestMock;
const status = AuthorizationStatus.AUTH;

describe(`User actions work correctly`, () => {
  it(`Action requireAuthorization work correctly`, () => {
    expect(requireAuthorization(status)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    });
  });

  it(`Action saveAuthorizationData work correctly`, () => {
    expect(saveAuthorizationData(info)).toEqual({
      type: ActionType.SAVE_AUTHORIZATION_DATA,
      payload: UserAdapter.parse(info),
    });
  });

  it(`Action redirectToRoute work correctly`, () => {
    expect(redirectToRoute(AppRoute.LOGIN)).toEqual({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: AppRoute.LOGIN,
    });
  });
});
