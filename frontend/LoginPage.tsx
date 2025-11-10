import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.ts';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('unipe'); // Valor padrao para facilitar
  const [password, setPassword] = useState('unipe'); // Valor padrao para facilitar
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simula a chamada de API de autenticacao
    const loginPayload = { 
        token: 'fake-jwt-token', 
        user: { username, id: 'user-123' } 
    };

    dispatch(login(loginPayload));
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
        <p style={{ marginTop: '10px', fontSize: '12px' }}>
          Credenciais de teste: usuário 'unipe', senha 'unipe'
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
