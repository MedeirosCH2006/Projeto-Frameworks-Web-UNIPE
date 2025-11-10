import { Router, Request, Response } from 'express';
import { authMiddleware } from '../authMiddleware'; 
import ShoppingItemModel from '../ShoppingItemModel'; 

const router = Router();

// =======================================================
// ROTAS DE ITENS DE COMPRA (CRUD EMBUTIDO)
// =======================================================

// Rota: GET /api/v1/shopping/items (Protegida - Buscar Lista)
router.get('/items', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Acesso negado. Token inválido.' });
    }

    try {
        let items = await ShoppingItemModel.find({ userId }).sort({ createdAt: 'asc' });
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
        const userId = req.userId; 

        if (!userId) {
            return res.status(401).json({ message: 'Acesso negado. Token inválido.' });
        }

        const newItem = new ShoppingItemModel({
            name,
            quantity,
            userId, 
        });

        await newItem.save();
        return res.status(201).json(newItem);

    } catch (error: any) {
        console.error('❌ Erro no POST /items. Causa:', error.message);
        return res.status(400).json({ message: 'Erro ao adicionar item.' });
    }
});


// Rota: DELETE /api/v1/shopping/items/:id (Protegida - Remover Item)
router.delete('/items/:id', authMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Acesso negado. Token inválido.' });
    }

    try {
        // Deleta o item SOMENTE se pertencer ao usuário logado
        const item = await ShoppingItemModel.findOneAndDelete({
            _id: id, 
            userId: userId 
        });

        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado ou você não tem permissão para excluí-lo.' });
        }

        return res.status(204).send(); 
        
    } catch (error: any) {
        console.error('❌ Erro no DELETE /items/:id. Causa:', error.message);
        return res.status(500).json({ message: 'Erro interno ao excluir item.' });
    }
});


// 1. ROTA CORRIGIDA PARA DECREMENTO (Frontend chama para o botão –1)
router.post('/items/removeOne', authMiddleware, async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Acesso negado. Token inválido.' });
    }
    
    try {
        // Usa findOneAndUpdate e $inc para subtrair 1 da quantidade
        const updatedItem = await ShoppingItemModel.findOneAndUpdate(
            { 
                name: name,
                userId: userId,
                quantity: { $gt: 0 } // Garante que só decrementa se a quantidade for > 0
            },
            {
                $inc: { quantity: -1 } // Decrementa a quantidade em 1
            },
            {
                new: true // Retorna o documento atualizado
            }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Nenhuma unidade deste item para remover.' });
        }

        // Se a nova quantidade for zero, deleta o documento para limpar o banco
        if (updatedItem.quantity === 0) {
            await ShoppingItemModel.findByIdAndDelete(updatedItem._id);
        }

        return res.status(200).json({ message: `Removida 1 unidade de ${name}.` });
        
    } catch (error: any) {
        console.error('❌ Erro no removeOne CORRIGIDO. Causa:', error.message);
        return res.status(500).json({ message: 'Erro interno ao remover unidade.' });
    }
});


// 2. ROTA DE EXCLUSÃO TOTAL (Frontend chama para o botão 'Zerar Item')
router.post('/items/deleteAllByName', authMiddleware, async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Acesso negado. Token inválido.' });
    }
    
    try {
        // Deleta TODAS as unidades (documentos) que tiverem o mesmo nome
        const result = await ShoppingItemModel.deleteMany({ 
            name: name,
            userId: userId 
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Nenhum item encontrado com este nome para zerar.' });
        }

        return res.status(200).json({ message: `Todos os itens '${name}' foram zerados.` });
        
    } catch (error: any) {
        console.error('❌ Erro no deleteAllByName. Causa:', error.message);
        return res.status(500).json({ message: 'Erro interno ao zerar item.' });
    }
});


export default router;
