import {populatedActivities} from './initialReducer';
import {loginReducer, profileReducer} from './loginReducer';
import {settingGoal} from './goalandnotificationReducer'
import { combineReducers } from 'redux-immutable';

const applicationReducers = {
	login: loginReducer,
	profile: profileReducer,
	activityPageState: populatedActivities,
	goal: settingGoal
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
