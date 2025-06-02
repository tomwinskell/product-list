import { Document } from 'mongoose';
import { ProductDto } from './productsTypes';

export const convertDocumentToProductDto = (document: Document): ProductDto => {
  const dto = document.toObject();
  return { ...dto, _id: dto._id.toString() as ProductDto };
};
