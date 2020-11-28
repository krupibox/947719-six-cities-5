import {ActionType} from './user-actions';
import {userReducer} from './user-reducer';
import {AuthorizationStatus} from '@root/consts/authorization-status';

describe(`User reducer work correctly`, () => {
  it(`Reducer return initial state`, () => {
    expect(userReducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationInfo: {},
    });
  });

  it(`Reducer should update authorizationStatus to "auth"`, () => {
    expect(userReducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH
    });
  });
});
