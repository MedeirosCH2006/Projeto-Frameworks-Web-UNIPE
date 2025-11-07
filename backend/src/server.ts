// src/server.ts (FINAL COM CORS GENÉRICO)

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import authRoutes from './routes/auth.routes';
import itemRoutes from './routes/item.routes';

dotenv.config();

const app = express();

// Middleware de CORS: Aceita QUALQUER ORIGEM (*), resolvendo o bloqueio no Termux.
app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Middleware para que o Express entenda JSON
app.use(express.json());

// Rotas da Aplicação
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);


// Conexão com o MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("MONGO_URI não está definido no arquivo .env!");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conexão com MongoDB estabelecida com sucesso!'))
    .catch(err => {
        console.error('❌ Erro de conexão com MongoDB:', err);
        process.exit(1);
    });


// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend Server rodando na porta ${PORT}`);
    console.log('Rotas de Login e API carregadas.');
});
