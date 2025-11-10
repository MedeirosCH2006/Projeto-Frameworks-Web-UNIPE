import { setToken as setTokenAction, clearToken as clearTokenAction } from './authSlice';
import { store as reduxStore } from './store';

// Exportações explícitas para o Redux
export const setToken = setTokenAction;
export const clearToken = clearTokenAction;
export const store = reduxStore;
