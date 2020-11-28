import {ActionType, setRequestAction} from './request-actions';

const status = {status: `INITIAL`};
describe(`Request action work correctly`, () => {
  it(`Action setRequest work correctly`, () => {
    expect(setRequestAction(status)).toEqual({
      type: ActionType.SET_REQUEST,
      payload: status,
    });
  });
});
