import * as actionTypes from './actionTypes';

export const signIn = () => ({
  type: actionTypes.AUTH_SIGN_IN
});

export const signOut = () => ({
  type: actionTypes.AUTH_SIGN_OUT
});
