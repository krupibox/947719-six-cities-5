import {ActionType} from './request';
import {setRequest} from './request';

const status = {status: `INITIAL`};

describe(`Actions work correctly`, () => {
  it(`Action requireAuthorization work correctly`, () => {
    expect(setRequest(status)).toEqual({
      type: ActionType.SET_REQUEST,
      payload: status,
    });
  });
});
