import * as actionTypes from '../actions/actionTypes';

const tasksListReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_TASKS_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case actionTypes.REFRESH_LIST:
      return {
        ...state,
        refreshListRequested: true
      };
    case actionTypes.LIST_REFRESHED:
      return {
        ...state,
        refreshListRequested: false
      };
    default:
      return state;
  }
};

export default tasksListReducer;
