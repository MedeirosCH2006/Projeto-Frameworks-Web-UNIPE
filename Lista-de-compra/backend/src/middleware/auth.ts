import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface para adicionar a propriedade 'user' ao Request
export interface AuthRequest extends Request {
  user?: any;
}

// Middleware de autenticação
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "defaultsecret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ message: "Token inválido." });
  }
};
