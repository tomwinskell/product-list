import { Document, ObjectId } from 'mongoose';

export interface ProductEntity extends Document {
  _id: ObjectId | string;
  category: string;
  name: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDto {
  _id: string;
  category: string;
  name: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductListResponse {
  products: ProductDto[];
  totalPages: number;
  currentPage: number;
}
