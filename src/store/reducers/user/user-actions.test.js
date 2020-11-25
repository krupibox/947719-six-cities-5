import {ActionType} from './user';
import {requireAuthorization, saveAuthorizationData, redirectToRoute} from './user';
import {AppRoute} from "../../../consts/app-route";
import {AuthorizationStatus} from "../../../consts/authorization-status";
import ModelUser from '../../../models/model-user';
import {info} from '../../../__mocks__/mocks';

const status = AuthorizationStatus.AUTH;


describe(`Actions work correctly`, () => {
  it(`Action requireAuthorization work correctly`, () => {
    expect(requireAuthorization(status)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    });
  });

  it(`Action saveAuthorizationData work correctly`, () => {
    expect(saveAuthorizationData(info)).toEqual({
      type: ActionType.SAVE_AUTHORIZATION_DATA,
      payload: ModelUser.parse(info),
    });
  });

  it(`Action redirectToRoute work correctly`, () => {
    expect(redirectToRoute(AppRoute.LOGIN)).toEqual({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: AppRoute.LOGIN,
    });
  });
});
