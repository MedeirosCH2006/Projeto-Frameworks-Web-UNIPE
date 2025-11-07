// src/routes/auth.routes.ts (FINAL)

import express from "express";
import { login } from "../controllers/auth.controller"; // Garante o caminho correto

const router = express.Router();

// Esta é a rota que o Frontend acessa via POST: http://localhost:5000/api/auth/login
router.post("/login", login);

export default router;
