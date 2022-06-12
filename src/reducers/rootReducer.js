
import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import initial from './initial';
import project from './project';

const rootReducer = combineReducers(
  { initial, auth, user, project}
);

export default rootReducer;
