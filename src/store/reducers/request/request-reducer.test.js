import {ActionType} from './request';
import {request} from './request';
import {RequestStatus} from '../../../consts/request-status';

describe(`Request reducer work correctly`, () => {
  it(`Reducer return initial state`, () => {
    expect(request(void 0, {})).toEqual({
      status: RequestStatus.INITIAL,
    });
  });

  it(`Reducer should update status by set request to success`, () => {
    expect(request({
      status: RequestStatus.SUCCESS,
    }, {
      type: ActionType.SET_REQUEST,
      payload: {status: RequestStatus.SUCCESS},
    })).toEqual({status: RequestStatus.SUCCESS});
  });
});

