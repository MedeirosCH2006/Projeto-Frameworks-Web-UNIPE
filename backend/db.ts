import mongoose from 'mongoose';

// Usuário: rafaelmedeirosme2006_db_user | Senha: Unipe2025
// Cluster: cluster0.hawn5f6.mongodb.net
// Banco: unipe_lista (Padrão do projeto)
const MONGO_URI = 'mongodb+srv://rafaelmedeirosme2006_db_user:Unipe2025@cluster0.hawn5f6.mongodb.net/unipe_lista?retryWrites=true&w=majority';

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
