import * as actionTypes from '../actions/actionTypes';

const generalReducer = (state = { error: undefined }, action) => {
  switch (action.type) {
    case actionTypes.GENERAL_SHOW_ERROR: {
      return {
        ...state,
        error: {
          code: action.payload.code || '0',
          message: action.payload.message || 'Error'
        }
      };
    }
    case actionTypes.GENERAL_HIDE_ERROR:
      return {
        ...state,
        error: undefined
      };
    default:
      return state;
  }
};

export default generalReducer;
