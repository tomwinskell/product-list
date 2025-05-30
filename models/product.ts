import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//This is the Product Schema
const ProductSchema = new Schema(
  {
    category: String,
    name: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

export const Product = model('Product', ProductSchema);
