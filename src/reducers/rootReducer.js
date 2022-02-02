
import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import initial from './initial';
import project from './project';
import model from "./model";
import assetCategory from "./assetCategory";
import assetField from "./assetField";

const rootReducer = combineReducers(
  { initial, auth, user, project, model, assetCategory, assetField}
);

export default rootReducer;
