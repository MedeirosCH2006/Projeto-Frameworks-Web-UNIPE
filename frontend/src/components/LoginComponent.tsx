// LoginComponent.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Importa a tipagem da Store e a Action Creator
import { RootState } from '../store/index'; 
import { loginRequest } from '../store/auth/actions';

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  // Lê o estado de auth no Redux Store
  const { isLoggedIn, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Se o usuário já estiver logado, redireciona para a Home (/)
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispara a action para tentar o login
    dispatch(loginRequest(username, password));
  };

  return (
    <div className="login-container">
      <h2>Login de Usuário</h2>
      
      {/* Exibe mensagem de erro, se houver */}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;

