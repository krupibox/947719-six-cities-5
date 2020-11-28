import {updateState} from '@root/utils/update-state';
import {ActionType} from './request-actions';
import {RequestStatus} from '@root/consts';

const initialState = {
  status: RequestStatus.INITIAL,
};

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_REQUEST:
      const {status} = action.payload;
      return updateState(state, {status});
  }

  return state;
};

