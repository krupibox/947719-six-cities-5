import {updateState} from '../../utils/update-state';

// stateToProps
const initialState = {
  type: ``,
  status: ``,
  id: null
};

// Actions
export const ActionType = {
  SET_REQUEST: `SET_REQUEST`,
};

// ActionCreators
export const setRequest = ({type, status, id}) => ({
  type: ActionType.SET_REQUEST,
  payload: {type, status, id}
});

// Async thunk functions sendReview in reducer/data.js (1)

// Reducer (for updating stateToProps) (3)
export const request = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_REQUEST:
      const {type, status, id} = action.payload;
      return updateState(state, {type, status, id});
  }

  return state; // send initial state at start
};
