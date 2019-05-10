import * as actionTypes from '../actions/actionTypes';

const authReducer = (state = { signedIn: false }, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SIGN_IN:
      return {
        ...state,
        signedIn: true
      };
    case actionTypes.AUTH_SIGN_OUT:
      return {
        ...state,
        signedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;
