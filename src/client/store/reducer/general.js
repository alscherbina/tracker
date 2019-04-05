import * as actionTypes from '../actions/actionTypes';

const generalReducer = (state = { error: undefined }, action) => {
  switch (action.type) {
    case actionTypes.GENERAL_SHOW_ERROR:
      return {
        error: {
          code: action.payload.code || '0',
          message: action.payload.message || 'Error'
        },
        ...state
      };
    case actionTypes.GENERAL_HIDE_ERROR:
      return {
        error: undefined,
        ...state
      };
    default:
      return state;
  }
};

export default generalReducer;
