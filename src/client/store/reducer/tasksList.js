import * as actionTypes from '../actions/actionTypes';

const tasksListReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.TASKS_SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case actionTypes.TASKS_REFRESH_LIST:
      return {
        ...state,
        refreshListRequested: true
      };
    case actionTypes.TASKS_LIST_REFRESHED:
      return {
        ...state,
        refreshListRequested: false
      };
    default:
      return state;
  }
};

export default tasksListReducer;
