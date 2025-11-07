// src/pages/Login/index.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../auth/actions'; 

const LoginPage: React.FC = () => {
  // Use as credenciais fixas de teste
  const [username, setUsername] = useState('unipe'); 
  const [password, setPassword] = useState('unipe'); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dispara a ação de login e espera o retorno booleano (true para sucesso)
    const success = await dispatch(login(username, password) as any);

    if (success) {
      // Se for sucesso, redireciona para a lista de compras
      navigate('/home'); 
    }
  };

  return (
    <div>
      <h1>Projeto Frameworks Web UNIPÊ</h1>
      <h2>Login de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
