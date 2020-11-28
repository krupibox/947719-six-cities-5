import {combineReducers} from 'redux';
import {data} from './data/data';
import {userReducer} from './user/user-reducer';
import {requestReducer} from './request/request-reducer';

export const NameSpace = {
  DATA: `DATA`,
  USER: `USER`,
  REQUEST: `REQUEST`,
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: userReducer,
  [NameSpace.REQUEST]: requestReducer,
});
