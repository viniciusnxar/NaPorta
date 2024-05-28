import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema({
  image: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  basePrice: { type: Number, required: true },
  sizes: { type: [ExtraPriceSchema] },
  extraIngredientPrices: { type: [ExtraPriceSchema] },
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
