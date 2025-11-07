// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Usuário e senha fixos (requisito do projeto)
const MOCK_USERNAME = 'unipe';
const MOCK_PASSWORD = 'unipe'; 

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    // 1. Verifica as credenciais (unipe/unipe)
    if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
        
        // 2. Garante que a chave secreta JWT está definida no .env
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET is missing!");
            return res.status(500).json({ success: false, message: 'Erro de configuração do servidor.' });
        }

        // 3. Gera o JWT
        const token = jwt.sign(
            { id: MOCK_USERNAME, role: 'user' }, 
            secret, 
            { expiresIn: '1h' } 
        );

        // 4. Retorna o token para o Frontend
        return res.json({ success: true, token });
    } else {
        // Credenciais inválidas (Retorna 401)
        return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos' });
    }
};
