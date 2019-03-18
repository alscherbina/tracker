import * as actionTypes from './actionTypes';

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
