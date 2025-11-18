import mongoose from 'mongoose';

// O código lê a URL de conexão do arquivo .env de forma segura.
const MONGO_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB conectado com sucesso! O Backend está pronto para usar o banco de dados.');
    } catch (err) {
        console.error('ERRO CRÍTICO AO CONECTAR AO MONGODB. A URL está errada? Mensagem:', (err as Error).message);
        // Encerra o processo se a conexão falhar
        process.exit(1);
    }
};
