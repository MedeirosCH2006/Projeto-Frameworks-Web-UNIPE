// src/server.ts

import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001; 

app.use(express.json()); 
app.use(cors()); 

// SIMULAÇÃO DA API DE AUTENTICAÇÃO (Login)
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username && password) {
    return res.status(200).json({ token: 'simulated_jwt_token_12345', userId: 'user1' });
  }

  return res.status(401).json({ message: 'Credenciais inválidas.' });
});

// SIMULAÇÃO DA API DE ITENS (Lista de Compras)
let items = [
    { id: "1", name: "Leite" },
    { id: "2", name: "Pão Integral" }
];

app.get('/api/items', (req: Request, res: Response) => {
  return res.status(200).json(items);
});

app.post('/api/items', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Nome do item é obrigatório.' });
    }
    const newItem = {
        id: Date.now().toString(),
        name: name
    };
    items.push(newItem);
    return res.status(201).json(newItem);
});

app.delete('/api/items/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);

    if (items.length < initialLength) {
        return res.status(200).json({ message: 'Item deletado com sucesso.' });
    }

    return res.status(404).json({ message: 'Item não encontrado.' });
});

// INICIALIZAÇÃO
app.listen(PORT, () => {
  console.log();
});
