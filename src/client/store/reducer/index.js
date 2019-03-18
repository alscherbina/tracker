import { combineReducers } from 'redux';
import filterReducer from './filterReducer';

const reducer = combineReducers({ filter: filterReducer });

export default reducer;
