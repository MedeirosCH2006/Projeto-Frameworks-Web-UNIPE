import { Request, Response } from "express";
import Item from "../models/Item"; // Assumindo que Item é o nome correto do seu Model

// NOTA: As funções foram ajustadas para receber 'req' e usar 'req.userId'

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    // CRÍTICO: Filtra os itens SOMENTE pelo usuário logado
    const items = await Item.find({ userId: userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar itens." });
  }
};


export const addItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    // CRÍTICO: Adiciona o userId ao novo item
    const newItem = new Item({ ...req.body, userId: userId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Erro ao adicionar item." });
  }
};


export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    
    // CRÍTICO: Atualiza SOMENTE se o item pertencer ao usuário logado
    const updatedItem = await Item.findOneAndUpdate(
        { _id: id, userId: userId }, // Filtro de posse
        req.body,
        { new: true }
    );

    if (!updatedItem) {
        return res.status(404).json({ message: "Item não encontrado ou não pertence a este usuário." });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar item." });
  }
};


export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    // CRÍTICO: Deleta o item SOMENTE se pertencer ao usuário logado
    const item = await Item.findOneAndDelete({
      _id: id,
      userId: userId
    });

    if (!item) {
        return res.status(404).json({ message: "Item não encontrado ou não pertence a este usuário." });
    }

    // Retorna 204 para sucesso na exclusão
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ message: "Erro interno ao excluir item." });
  }
};
