import { Request, Response } from "express";
import Item from "../models/Item";


export const getItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar itens." });
  }
};


export const addItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Erro ao adicionar item." });
  }
};


export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar item." });
  }
};


export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removido com sucesso!" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao remover item." });
  }
};
