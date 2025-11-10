import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel'; // Importa o novo modelo de usuário
import 'dotenv/config'; 

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

// =======================================================
// Rota 1: /register (Cria um novo usuário)
// =======================================================
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
        }

        // 1. Verifica se o usuário já existe
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Nome de usuário já existe.' });
        }

        // 2. Cria e salva o usuário (o hook 'pre-save' no modelo faz o HASH da senha)
        const newUser = new UserModel({
            username,
            passwordHash: password, // O Mongoose irá hash esta string
        });

        await newUser.save();
        
        // Retorna sucesso (não loga automaticamente por segurança)
        return res.status(201).json({ message: 'Registro bem-sucedido. Pode fazer login.' });
    } catch (error) {
        console.error('❌ Erro no Registro:', error);
        return res.status(500).json({ message: 'Erro interno ao registrar usuário.' });
    }
});


// =======================================================
// Rota 2: /login (Verifica senha e emite JWT)
// =======================================================
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
        }

        // 1. Encontra o usuário
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Nome de usuário ou senha inválidos.' });
        }

        // 2. Compara a senha (usa o método comparePassword do modelo, que usa bcrypt)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Nome de usuário ou senha inválidos.' });
        }

        // 3. Emite o JWT usando o ID REAL do usuário
        if (!JWT_SECRET) {
             throw new Error("JWT_SECRET não está definido.");
        }
        
        const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });

    } catch (error) {
        console.error('❌ Erro no Login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao autenticar.' });
    }
});

export default router;
