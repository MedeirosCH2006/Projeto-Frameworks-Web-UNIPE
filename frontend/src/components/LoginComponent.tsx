import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice.ts';

const LoginComponent: React.FC = () => {
  // Use credenciais de teste para facilitar
  const [username, setUsername] = useState('unipe'); 
  const [password, setPassword] = useState('unipe'); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Nao estamos chamando a API de fato aqui, apenas simulando o sucesso
    // A logica de autenticacao real sera feita no backend
    if (username === 'unipe' && password === 'unipe') {
        const loginPayload = { 
            token: 'fake-jwt-token', 
            user: { username, id: 'user-123' } 
        };
        dispatch(login(loginPayload));
        navigate('/home'); // Redireciona para a home
    } else {
        alert('Credenciais invalidas. Use unipe/unipe.');
    }
  };

  return (
    <div className="login-container">
      <h2>Entrar</h2>
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
        <button type="submit">Login</button>
        <p style={{ marginTop: '10px', fontSize: '12px' }}>
          Credenciais de teste: usuário 'unipe', senha 'unipe'
        </p>
      </form>
    </div>
  );
};

export default LoginComponent;
