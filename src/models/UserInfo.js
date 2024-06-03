import { model, models, Schema } from 'mongoose';

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    endereco: { type: String },
    cep: { type: String },
    cidade: { type: String },
    estado: { type: String },
    telefone: { type: String },
    numerocep: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);

