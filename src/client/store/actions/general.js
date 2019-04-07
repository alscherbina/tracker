import * as actionTypes from './actionTypes';

export const generalShowError = error => {
  const payload = error || { code: 0, message: 'Error' };
  if (error.response && error.response.data) {
    payload.code = 0;
    payload.message = error.response.data.message;
  }
  return {
    type: actionTypes.GENERAL_SHOW_ERROR,
    payload
  };
};

export const generalHideError = () => ({
  type: actionTypes.GENERAL_HIDE_ERROR
});
