// auth/types.ts

export interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string } | null;
  loading: boolean;
  error: string | null;
}

export enum AuthActionTypes {
  LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = 'auth/LOGIN_FAILURE',
  LOGOUT = 'auth/LOGOUT',
}

interface LoginRequestAction {
  type: AuthActionTypes.LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: { id: string; email: string; name: string };
}

interface LoginFailureAction {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthAction = LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutAction;

++
