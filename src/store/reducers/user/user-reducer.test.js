import {ActionType} from './user';
import {user} from './user';
import {AuthorizationStatus} from '../../../consts/authorization-status';

describe(`User reducer work correctly`, () => {
  it(`Reducer return initial state`, () => {
    expect(user(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationInfo: {},
    });
  });

  it(`Reducer should update authorizationStatus to "auth"`, () => {
    expect(user({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH
    });
  });
});
