import mongoose, { Document, Schema } from 'mongoose';

// 1. Interface TypeScript para o documento
export interface IShoppingItem extends Document {
  name: string;
  userId: string;
  concluded: boolean;
  createdAt: Date;
}

// 2. Definição do Schema Mongoose
const ShoppingItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  // CRÍTICO: Referência correta ao utilizador
  userId: { type: String, required: true, index: true }, 
  concluded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// 3. Exporta o Modelo
const ShoppingItem = mongoose.model<IShoppingItem>('ShoppingItem', ShoppingItemSchema);

export default ShoppingItem;
