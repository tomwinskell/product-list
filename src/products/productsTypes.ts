import { ObjectId } from 'mongoose';

export interface ProductEntity {
  _id: ObjectId | string;
  category: string;
  name: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDto extends Omit<ProductEntity, '_id'> {
  _id: string;
}

export interface ProductListResponse {
  products: ProductDto[];
  totalPages: number;
  currentPage: number;
}
