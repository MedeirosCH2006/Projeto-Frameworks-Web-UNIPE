import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../store';
import './Login.scss';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const endpoint = isRegistering ? 'register' : 'login';

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/${endpoint}`, {
                username,
                password,
            });

            if (isRegistering) {
                // Se for registro, mostra sucesso e muda para o modo Login
                setMessage(response.data.message || 'Registro bem-sucedido. Faça o login.');
                setIsRegistering(false);
            } else {
                // Se for login, salva o token e redireciona
                const token = response.data.token;
                dispatch(setToken(token));
                navigate('/home');
            }
        } catch (err) {
            console.error('Erro de autenticação/registro:', err);
            if (axios.isAxiosError(err) && err.response) {
                // Trata erros específicos como 401 (Inválido) ou 409 (Usuário já existe)
                setError(err.response.data.message || 'Erro ao conectar. Verifique o servidor ou a URL da API.');
            } else {
                setError('Erro desconhecido. Verifique a conexão com o servidor.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Lista de Compras - Unipê</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome de Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">
                        {isRegistering ? 'Registrar' : 'Login'}
                    </button>
                </form>

                {/* Mensagens de estado */}
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                
                {/* Botão de Alternar */}
                <button
                    className="toggle-button"
                    onClick={() => setIsRegistering(!isRegistering)}
                >
                    {isRegistering ? 'Já tenho conta (Fazer Login)' : 'Não tem conta? (Registrar)'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
