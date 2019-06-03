import * as actionTypes from './actionTypes';

const isAPIError = payload => payload.response && payload.response.data && payload.response.data.message;
const isAuthError = payload => payload.response && payload.response.status === 403;

export const generalShowError = error => {
  const payload = error || { code: 0, message: 'Error' };
  if (isAPIError(payload)) {
    payload.code = 0;
    payload.message = payload.response.data.message;
  } else if (isAuthError(payload)) {
    payload.code = 403;
    payload.message = 'Access denied';
  }
  return {
    type: actionTypes.GENERAL_SHOW_ERROR,
    payload
  };
};

export const generalHideError = () => ({
  type: actionTypes.GENERAL_HIDE_ERROR
});
