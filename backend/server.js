require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRouter = require(path.join(__dirname, 'src', 'routes', 'authRouter'));
const shoppingRouter = require(path.join(__dirname, 'src', 'routes', 'shoppingRouter'));

const app = express();
const PORT = process.env.PORT || 3001;

// =======================================================
// CRÍTICO: Middlewares de CORS e JSON DEVE VIR PRIMEIRO
// =======================================================
app.use(cors({
    origin: '*', // Permite qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json());

// =======================================================
// Conexão com o MongoDB
// =======================================================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/unipe-shopping-list';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB ATLAS conectado com sucesso!'))
    .catch(err => console.error('❌ Erro de conexão com o MongoDB:', err));

// =======================================================
// Definição de Rotas
// =======================================================
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/shopping', shoppingRouter);


// =======================================================
// Inicia o Servidor
// =======================================================
app.listen(PORT, 'localhost', () => {
    console.log(`🚀 Backend rodando na porta ${PORT}`);
    console.log(`Acesse o frontend em: http://localhost:3000`);
});
