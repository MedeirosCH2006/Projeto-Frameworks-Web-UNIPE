import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../store'; // Importação do Redux corrigida

// CRÍTICO: Variável de ambiente do Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginComponent: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // CRÍTICO: Usa a variável de ambiente (agora deve ser http://localhost:3001/api/v1)
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
            
            const token = response.data.token;
            dispatch(setToken(token));
            navigate('/home'); 

        } catch (err) {
            console.error('Erro de Login:', err);
            
            let errorMessage = 'Erro ao conectar. Verifique o servidor ou a URL da API.';
            
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 404) {
                    errorMessage = 'Servidor de API não encontrado. Verifique a porta.';
                } else if (err.response.status === 401) {
                    errorMessage = 'Usuário ou senha incorretos.';
                } else if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                }
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Lista de Compras - Unipê</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Aguarde...' : 'Login'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default LoginComponent;
