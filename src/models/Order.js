import { model, models, Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userEmail: String,
    telefone: String,
    endereco: String,
    numerocep: String,
    cep: String,
    cidade: String,
    estado: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model('Order', OrderSchema);
