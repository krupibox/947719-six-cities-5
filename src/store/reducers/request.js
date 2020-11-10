import {updateState} from '../../utils/update-state';

import {RequestStatus} from '../../consts/request-status';

// stateToProps
const initialState = {
  status: RequestStatus.INITIAL,
};

// Actions
export const ActionType = {
  SET_REQUEST: `SET_REQUEST`,
};

// ActionCreators
export const setRequest = ({status}) => ({
  type: ActionType.SET_REQUEST,
  payload: {status}
});

// Async thunk functions postReview in reducer/data.js (1)

// Reducer (for updating stateToProps) (3)
export const request = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_REQUEST:
      const {status} = action.payload;
      return updateState(state, {status});
  }

  return state; // send initial state at start
};
