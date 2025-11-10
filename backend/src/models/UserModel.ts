import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface do documento Mongoose
export interface IUser extends Document {
  username: string;
  passwordHash: string; // Senha guardada como hash
}

// Esquema Mongoose
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

// Pré-save hook para encriptar a senha antes de salvar
// Nota: Só deve ser chamado se o hash não existir ou a senha for alterada
UserSchema.pre<IUser>('save', async function(next) {
    // Se a senha não foi modificada (só o username, por exemplo), pule o hash
    if (!this.isModified('passwordHash')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Método para comparar a senha fornecida com o hash salvo
UserSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Modelo Mongoose
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
