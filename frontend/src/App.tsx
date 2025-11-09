import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// CORREÇÃO APLICADA: Usando o caminho mais limpo (apenas nome da pasta/componente)
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'; 
import './styles/App.css'; 

// Seletor para verificar o estado de autenticacao do Redux
const isAuthenticatedSelector = (state: any) => !!state.auth.token;

function App() {
  // Puxa o estado de autenticacao
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          
          {/* 1. Rota de Login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* 2. Rota Home (Protegida) */}
          <Route 
            path="/home" 
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} 
          />
          
          {/* 3. Rota Raiz ("/") - Garante que redireciona para o fluxo correto */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} 
          />

          {/* 4. Rota 404/Fallback: Redireciona tudo que nao for encontrado. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
