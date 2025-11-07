// src/auth/actions.ts

import { Dispatch } from 'redux';
import api from '../services/api';

export const login = (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
        // AQUI OCORRE O ENVIO DOS DADOS: Axios envia { username, password }
        const response = await api.post('/auth/login', { 
            username: username, 
            password: password 
        });

        const token = response.data.token;
        localStorage.setItem('token', token);

        dispatch({ type: 'LOGIN_SUCCESS', payload: token }); 

        // Sucesso!
        return true; 

    } catch (error) {
        console.error("Login failed:", error);

        dispatch({ type: 'LOGIN_FAIL' });

        // Mensagem de erro
        alert('Falha de comunicação ou login inválido.');

        return false;
    }
};

export const logout = () => (dispatch: Dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
};
