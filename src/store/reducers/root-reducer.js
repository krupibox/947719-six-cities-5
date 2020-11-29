import {combineReducers} from 'redux';
import {dataReducer} from './data/data-reducer';
import {userReducer} from './user/user-reducer';
import {requestReducer} from './request/request-reducer';

export const NameSpace = {
  DATA: `DATA`,
  USER: `USER`,
  REQUEST: `REQUEST`,
};

export default combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.REQUEST]: requestReducer,
});
