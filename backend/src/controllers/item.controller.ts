// src/controllers/item.controller.ts

import { Request, Response } from 'express';
import Item from '../models/Item'; // Importa o modelo do MongoDB

// 1. LISTAR TODOS OS ITENS (GET)
export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        return res.json(items);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar itens.' });
    }
};

// 2. CRIAR NOVO ITEM (POST)
export const addItem = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Nome do item é obrigatório.' });
    }

    try {
        const newItem = new Item({ name });
        await newItem.save();
        return res.status(201).json(newItem);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao adicionar item.' });
    }
};

// 3. ATUALIZAR ITEM (PUT)
export const updateItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Nome do item é obrigatório para atualização.' });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        return res.json(updatedItem);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar item.' });
    }
};

// 4. DELETAR ITEM (DELETE)
export const deleteItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        return res.json({ message: 'Item deletado com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar item.' });
    }
};
