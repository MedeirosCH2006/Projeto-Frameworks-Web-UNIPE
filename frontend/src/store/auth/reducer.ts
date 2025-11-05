// auth/reducer.ts

import { AuthState, AuthAction, AuthActionTypes } from './types';

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  user: null,
  error: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
