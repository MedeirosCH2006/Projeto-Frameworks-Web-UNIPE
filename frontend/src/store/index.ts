// src/store/index.ts (FINAL COM THUNK)

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // <--- O MÍNIMO NECESSÁRIO PARA AÇÕES ASSÍNCRONAS

// Importa os reducers
import authReducer from '../auth/reducer';
// import itemReducer from '../items/reducer'; // Se este arquivo existir, descomente

// Combina os reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // items: itemReducer, // Se existir, descomente
});

// Cria a Store e aplica o Thunk (necessário para o login assíncrono)
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // <--- APLICA O MIDDLEWARE THUNK
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
