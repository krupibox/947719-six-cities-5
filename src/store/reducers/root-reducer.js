import {combineReducers} from 'redux';
import {data} from './data/data';
import {user} from './user/user';
import {request} from './request/request';

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
