import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//This is the Product Schema
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product = model('Product', ProductSchema);
