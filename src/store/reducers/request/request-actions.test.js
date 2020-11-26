import {ActionType} from './request';
import {setRequest} from './request';

const status = {status: `INITIAL`};
describe(`Request action work correctly`, () => {
  it(`Action setRequest work correctly`, () => {
    expect(setRequest(status)).toEqual({
      type: ActionType.SET_REQUEST,
      payload: status,
    });
  });
});
