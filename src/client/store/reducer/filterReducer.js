import * as actionTypes from '../actions/actionTypes';

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FILTER_TEXT:
      return {
        ...state,
        text: action.payload
      };
    case actionTypes.REFRESH_LIST:
      return {
        ...state,
        refreshListRequested: true
      };
    case actionTypes.LIST_REFRESHED:
      return {
        ...state,
        refreshListRequested: false
      };
    default:
      return state;
  }
};

export default filterReducer;
