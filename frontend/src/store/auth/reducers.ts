// auth/reducers.ts

import { AuthState, AuthAction, AuthActionTypes } from './types';

// Estado inicial do módulo de autenticação
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Reducer que lida com as mudanças de estado
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
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...initialState, // Volta ao estado inicial
      };

    default:
      return state;
  }
}
+++
