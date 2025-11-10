import { Router, Request, Response } from 'express';
import { authMiddleware } from '../authMiddleware';
import ShoppingItemModel from '../ShoppingItemModel';

const router = Router();

// Rota: GET /api/v1/shopping/items (Protegida - Buscar Lista)
router.get('/items', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Acesso negado. Token inválido ou ausente.' });
    }

    try {
        let items = await ShoppingItemModel.find({ userId }).sort({ createdAt: -1 });

        if (items.length === 0) {
             const mockItems: any[] = [
                { name: 'Pão Integral', quantity: 2, userId: userId },
                { name: 'Leite Desnatado', quantity: 1, userId: userId },
                { name: 'Ovos (Dúzia)', quantity: 1, userId: userId },
            ];

            await ShoppingItemModel.insertMany(mockItems);
            items = await ShoppingItemModel.find({ userId }).sort({ createdAt: -1 });
        }

        return res.status(200).json(items);

    } catch (error: any) {
        console.error('❌ Erro no GET /items. Causa:', error.message);
        return res.status(500).json({ message: 'Erro interno ao buscar lista.' });
    }
});

// Rota: POST /api/v1/shopping/items (Protegida - Adicionar Item)
router.post('/items', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, quantity } = req.body;
        const userId = req.userId; // Obtido do authMiddleware

        if (!userId) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }
        
        if (!name || !quantity) {
             return res.status(400).json({ message: 'Nome e quantidade são obrigatórios.' });
        }

        const newItem = new ShoppingItemModel({
            name,
            quantity: quantity,
            userId,
        });

        const savedItem = await newItem.save();
        // Retorna o item criado com sucesso (Status 201)
        return res.status(201).json(savedItem); 

    } catch (error) {
        console.error('❌ Erro no POST /items:', error);
        // CRÍTICO: Se o erro for de validação, retornamos 400
        if (error instanceof mongoose.Error.ValidationError) {
             return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor ao adicionar item.' });
    }
});


export default router;
