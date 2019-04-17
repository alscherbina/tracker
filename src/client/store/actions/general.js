import * as actionTypes from './actionTypes';

const isAPIError = payload => payload.response && payload.response.data;

export const generalShowError = error => {
  const payload = error || { code: 0, message: 'Error' };
  if (isAPIError(payload)) {
    payload.code = 0;
    payload.message = payload.response.data.message;
  }
  return {
    type: actionTypes.GENERAL_SHOW_ERROR,
    payload
  };
};

export const generalHideError = () => ({
  type: actionTypes.GENERAL_HIDE_ERROR
});
