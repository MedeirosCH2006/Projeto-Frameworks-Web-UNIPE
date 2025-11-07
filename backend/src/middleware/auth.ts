// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
// Importa a biblioteca para trabalhar com JWT
import jwt from 'jsonwebtoken'; 

// Middleware para verificar a validade do JWT
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // 1. Tenta pegar o token do cabeçalho de Autorização (Bearer Token)
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Se não houver cabeçalho de autorização
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // O cabeçalho é geralmente formatado como "Bearer <token>"
    // Pega apenas o token (a segunda parte)
    const token = authHeader.split(' ')[1]; 

    // 2. Garante que a chave secreta esteja definida
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET não está definido no .env!");
        return res.status(500).json({ message: 'Erro de configuração do servidor.' });
    }

    // 3. Verifica e valida o token
    try {
        // jwt.verify() usa a chave secreta para descriptografar e validar a assinatura
        jwt.verify(token, secret);
        // Se for bem-sucedido, o usuário está autenticado. Chama o próximo middleware/rota.
        next();
    } catch (err) {
        // Se a verificação falhar (token expirado ou inválido)
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};
