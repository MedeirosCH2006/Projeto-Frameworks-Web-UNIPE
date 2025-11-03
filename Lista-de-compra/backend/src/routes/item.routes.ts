import express from "express";
import { getItems, addItem, updateItem, deleteItem } from "../controllers/itemController";
import { authMiddleware } from "../middleware/auth";


const router = express.Router();

router.get("/", authMiddleware, getItems);
router.post("/", authMiddleware, addItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);

export default router;
