import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes";
import itemRoutes from "./routes/item.routes";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.log("❌ Erro ao conectar ao MongoDB", err));

// ROTAS PRINCIPAIS
app.use("/auth", authRoutes);
app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
