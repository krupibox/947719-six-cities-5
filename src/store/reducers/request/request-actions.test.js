import {ActionType} from './request';
import {setRequest} from './request';

const status = {status: `INITIAL`};

it(`Action setRequest work correctly`, () => {
  expect(setRequest(status)).toEqual({
    type: ActionType.SET_REQUEST,
    payload: status,
  });
});

