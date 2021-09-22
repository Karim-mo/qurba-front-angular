import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_RESET_ERRORS,
  USER_LOGOUT,
} from '../types/types';

export const userReducer = (
  action: any,
  state = {
    user: null,
    loading: false,
    error: null,
  }
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        loading: false,
        user: null,
        error: null,
      };
    case USER_RESET_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
