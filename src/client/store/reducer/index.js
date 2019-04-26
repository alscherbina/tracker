import { combineReducers } from 'redux';
import tasksListReducer from './tasksList';
import generalReducer from './general';
import authReducer from './auth';

const reducer = combineReducers({ general: generalReducer, tasks: tasksListReducer, auth: authReducer });

export default reducer;
