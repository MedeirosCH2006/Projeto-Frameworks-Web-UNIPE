import 'dotenv/config'; 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/authRouter'; 
import shoppingRouter from './routes/shoppingRouter';

const app = express();
const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json());

// =======================================================
// Rota Raiz (Health Check)
// =======================================================
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API de Lista de Compras rodando!' });
});

// =======================================================
// Conexão com o MongoDB ATLAS
// =======================================================
const MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
    console.error('❌ ERRO CRÍTICO: MONGODB_URI não foi carregado. Verifique o arquivo .env.');
} else {
    // CRÍTICO: Passando a URI diretamente
    mongoose.connect(MONGODB_URI) 
        .then(() => console.log('✅ MongoDB ATLAS conectado com sucesso!'))
        .catch(err => console.error('❌ Erro de conexão com o MongoDB:', err));
}

// Definição de Rotas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/shopping', shoppingRouter);


// Inicia o Servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend rodando na porta ${PORT}`);
});
