// auth/actions.ts

import { AuthActionTypes, AuthAction, AuthState } from './types';

// O tipo de dado que um login bem-sucedido retorna
type UserData = Exclude<AuthState['user'], null>;

// 1. Ação para Iniciar o Login (sem payload)
export const loginRequest = (): AuthAction => ({
  type: AuthActionTypes.LOGIN_REQUEST,
});

// 2. Ação para Login Bem-Sucedido
export const loginSuccess = (user: UserData): AuthAction => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: user,
});

// 3. Ação para Login com Falha
export const loginFailure = (error: string): AuthAction => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload: error,
});

// 4. Ação para Logout
export const logout = (): AuthAction => ({
  type: AuthActionTypes.LOGOUT,
});

