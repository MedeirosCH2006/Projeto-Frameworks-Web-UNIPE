import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estende o objeto Request para incluir userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Middleware de autenticação
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token ausente.' });
  }

  const token = authHeader.split(' ')[1];
  
  if (!process.env.JWT_SECRET) {
      console.error('❌ ERRO CRÍTICO: JWT_SECRET não está definido.');
      return res.status(500).json({ message: 'Erro de configuração do servidor.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string, iat: number, exp: number };
    
    // CRÍTICO: Anexa o userId à requisição. Este é o userId (65c71b3e8c894236a2829241) que o shoppingRouter usa.
    req.userId = decoded.userId; 
    next();
  } catch (error) {
    console.error('❌ Erro de verificação do Token:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};
