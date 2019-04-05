import * as actionTypes from './actionTypes';

export const setTasksFilter = filter => ({
  type: actionTypes.TASKS_SET_FILTER,
  payload: filter
});

export const refreshList = () => ({
  type: actionTypes.TASKS_REFRESH_LIST
});

export const listRefreshed = () => ({
  type: actionTypes.TASKS_LIST_REFRESHED
});
