// index.ts

import { combineReducers, createStore, applyMiddleware, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers de Módulos
import { authReducer } from './auth/reducer';
import { itemsReducer } from './items/reducer';

// Reducer Raiz: Combina todos os reducer
const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
});

// Tipo do Estado Global
export type RootState = ReturnType<typeof rootReducer>;

// Middleware
const middleware = [];

// Configuração do Store
const store = createStore(
  rootReducer as Reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

