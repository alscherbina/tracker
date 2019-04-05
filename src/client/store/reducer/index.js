import { combineReducers } from 'redux';
import tasksListReducer from './tasksList';
import generalReducer from './general';

const reducer = combineReducers({ general: generalReducer, tasks: tasksListReducer });

export default reducer;
