import {ActionType} from './request-actions';
import {requestReducer} from './request-reducer';
import {RequestStatus} from '@root/consts';

describe(`Request reducer work correctly`, () => {
  it(`Reducer return initial state`, () => {
    expect(requestReducer(void 0, {})).toEqual({
      status: RequestStatus.INITIAL,
    });
  });

  it(`Reducer should update status by set request to success`, () => {
    expect(requestReducer({
      status: RequestStatus.SUCCESS,
    }, {
      type: ActionType.SET_REQUEST,
      payload: {status: RequestStatus.SUCCESS},
    })).toEqual({status: RequestStatus.SUCCESS});
  });
});

