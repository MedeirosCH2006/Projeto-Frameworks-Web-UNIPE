import mongoose, { Document, Schema } from 'mongoose';

// Interface do documento Mongoose
export interface IShoppingItem extends Document {
  name: string;
  quantity: number;
  userId: string; // Voltando para string simples
  createdAt: Date;
}

// Esquema Mongoose
const ShoppingItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  // CRÍTICO: O userId é armazenado como string (Compatível com o mock do JWT)
  userId: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

// Modelo Mongoose
const ShoppingItemModel = mongoose.model<IShoppingItem>('ShoppingItem', ShoppingItemSchema);

export default ShoppingItemModel;
