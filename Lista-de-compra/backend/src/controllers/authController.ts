import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // Exemplo simples de login
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || "defaultsecret", {
      expiresIn: "1h",
    });
    res.json({ message: "Login realizado com sucesso!", token });
  } else {
    res.status(401).json({ message: "Usuário ou senha incorretos." });
  }
};
