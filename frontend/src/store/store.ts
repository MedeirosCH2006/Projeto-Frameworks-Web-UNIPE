import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import shoppingReducer from './shoppingSlice'; 

// Cria e exporta a store (usando const)
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shopping: shoppingReducer, 
  },
});

// EXPORTAÇÃO PADRÃO CORRIGIDA PARA O main.tsx
export default store; 

// Exportações de Tipos (necessárias para TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
