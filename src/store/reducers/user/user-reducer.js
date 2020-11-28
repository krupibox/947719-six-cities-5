import {updateState} from '@root/utils/update-state';
import {ActionType} from './user-actions';
import {AuthorizationStatus} from '@root/consts';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationInfo: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return updateState(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SAVE_AUTHORIZATION_DATA:
      return updateState(state, {
        authorizationInfo: action.payload,
      });
  }

  return state;
};
