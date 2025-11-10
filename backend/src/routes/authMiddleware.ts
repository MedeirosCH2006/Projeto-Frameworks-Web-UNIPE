import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estende a interface Request do Express para incluir userId
declare global {
  namespace Express {
    interface Request {
      userId?: string; 
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Usa o JWT_SECRET que está no seu arquivo .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        
        // CRÍTICO: Injeta o userId na requisição para que o shoppingRouter possa usá-lo
        req.userId = decoded.userId; 
        
        next();
    } catch (err) {
        // Loga o erro exato do JWT para fins de diagnóstico
        console.error('❌ Erro de verificação de token:', err);
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};
