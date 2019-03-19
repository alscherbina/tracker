import { combineReducers } from 'redux';
import tasksListReducer from './tasksList';

const reducer = combineReducers({ tasks: tasksListReducer });

export default reducer;
