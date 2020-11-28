import {ActionType, setRequest} from './request-actions';

const status = {status: `INITIAL`};
describe(`Request action work correctly`, () => {
  it(`Action setRequest work correctly`, () => {
    expect(setRequest(status)).toEqual({
      type: ActionType.SET_REQUEST,
      payload: status,
    });
  });
});
