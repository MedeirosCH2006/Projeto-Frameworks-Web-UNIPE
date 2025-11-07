// src/routes/item.routes.ts (CORRIGIDO)

import express from "express";
// ATENÇÃO: Mudamos de 'authMiddleware' para 'isAuthenticated'
import { isAuthenticated } from "../middleware/auth"; 
// OBS: Assumindo que os controllers do seu amigo estão corretos
import { getItems, addItem, updateItem, deleteItem } from "../controllers/item.controller"; 


const router = express.Router();

// Todas as rotas agora usam o nome CORRETO do middleware
router.get("/", isAuthenticated, getItems);
router.post("/", isAuthenticated, addItem);
router.put("/:id", isAuthenticated, updateItem);
router.delete("/:id", isAuthenticated, deleteItem);

export default router;

