import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    category: String,
    name: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
