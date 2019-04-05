import * as actionTypes from './actionTypes';

export const generalShowError = error => ({
  type: actionTypes.GENERAL_SHOW_ERROR,
  payload: error
});

export const generalHideError = () => ({
  type: actionTypes.GENERAL_SHOW_ERROR
});
