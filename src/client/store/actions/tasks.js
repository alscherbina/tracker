import * as actionTypes from './actionTypes';

export const setTasksFilter = filter => {
  return {
    type: actionTypes.SET_TASKS_FILTER,
    payload: filter
  };
};

export const refreshList = () => {
  return {
    type: actionTypes.REFRESH_LIST
  };
};

export const listRefreshed = () => {
  return {
    type: actionTypes.LIST_REFRESHED
  };
};
