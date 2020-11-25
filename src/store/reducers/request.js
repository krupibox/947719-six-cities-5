import {updateState} from '../../utils/update-state';
import {RequestStatus} from '../../consts/request-status';

const initialState = {
  status: RequestStatus.INITIAL,
};

export const ActionType = {
  SET_REQUEST: `SET_REQUEST`,
};

export const setRequest = ({status}) => ({
  type: ActionType.SET_REQUEST,
  payload: {status}
});

export const request = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_REQUEST:
      const {status} = action.payload;
      return updateState(state, {status});
  }

  return state;
};

