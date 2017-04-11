import tabs from './tabReducer';
import {populatedActivities} from './initialReducer';
import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';

const applicationReducers = {
	login: loginReducer,
	profile: profileReducer,
	tabs,
	activityPageState: populatedActivities
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
