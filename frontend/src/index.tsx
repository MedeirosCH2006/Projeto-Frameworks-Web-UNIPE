// index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente App

// Encontra o elemento HTML onde a aplicação será injetada (geralmente <div id="root">)
const rootElement = document.getElementById('root');

if (rootElement) {
  // Cria a raiz de renderização do React 18
  const root = ReactDOM.createRoot(rootElement);

  // Renderiza o componente principal App
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found! Ensure an element with id='root' exists in your HTML.");
}; // <--- PONTO E VÍRGULA CORRIGIDO AQUI

// Não há exportação, então o ponto e vírgula aqui garante a segurança do ASI.
