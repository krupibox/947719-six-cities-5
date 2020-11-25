import {combineReducers} from 'redux';
import {data} from './data';
import {user} from './user/user';
import {request} from './request';

export const NameSpace = {
  DATA: `DATA`,
  USER: `USER`,
  REQUEST: `REQUEST`,
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
  [NameSpace.REQUEST]: request,
});
