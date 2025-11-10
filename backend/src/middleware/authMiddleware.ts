import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; username: string };
    }
  }
}

const JWT_SECRET = 'sua_chave_secreta_jwt_para_unipe'; 

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  // Espera o formato: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // 403 Forbidden: Token inválido ou expirado.
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
    // Anexa o payload (id e username) à requisição
    req.user = user as any; 
    next();
  });
};
