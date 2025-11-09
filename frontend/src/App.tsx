import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// PÁGINAS: Caminho corrigido para arquivos .tsx diretos em src/pages
import LoginPage from './pages/LoginPage.tsx'; 
import HomePage from './pages/HomePage.tsx'; 
// CORREÇÃO FINAL AQUI: Usando './styles/App.css'
import './styles/App.css'; 

// Seletor para verificar o estado de autenticacao do Redux
const isAuthenticatedSelector = (state: any) => !!state.auth.token;

function App() {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          
          <Route path="/login" element={<LoginPage />} />
          
          <Route 
            path="/home" 
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} 
          />
          
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
