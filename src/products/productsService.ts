import { Product } from './productModel';
import {
  ProductCreationParams,
  ProductDto,
  ProductListResponse,
  ProductQueryParams,
} from './productTypes';
import { convertDocumentToProductDto } from './productHelpers';
import { SortOrder } from 'mongoose';

export class ProductsService {
  public async getAllProducts({
    page,
    limit,
    category,
    price,
  }: ProductQueryParams): Promise<ProductListResponse | Error> {
    try {
      const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
      const limitAsInt = parseInt(typeof limit === 'string' ? limit : '10');
      const findBy = category
        ? { category: { $regex: category, $options: 'i' } }
        : {};

      const sortBy = (
        price: 'highest' | 'lowest'
      ): Record<string, SortOrder> => {
        if (price === 'highest') return { price: -1, createdAt: -1 };
        else return { price: 1 as SortOrder, createdAt: -1 };
      };

      const productDocuments = await Product.find(findBy)
        .skip(limitAsInt * (pageAsInt - 1))
        .limit(limitAsInt)
        .sort(price ? sortBy(price) : { createdAt: -1 });

      const count = await Product.countDocuments(findBy);

      const productsDto = productDocuments.map((product) => {
        return convertDocumentToProductDto(product);
      });

      return {
        products: productsDto,
        totalPages: Math.ceil(count / limitAsInt),
        currentPage: pageAsInt,
      };
    } catch (err) {
      throw new Error();
    }
  }

  public async getProductById(productId: string): Promise<ProductDto | Error> {
    try {
      const productDocument = await Product.findById(productId);
      if (!productDocument) throw new Error();
      return convertDocumentToProductDto(productDocument);
    } catch (error) {
      throw new Error();
    }
  }

  public async createProduct(
    productToCreate: ProductCreationParams
  ): Promise<ProductDto | Error> {
    try {
      const productDocument = await Product.create(productToCreate);
      return convertDocumentToProductDto(productDocument);
    } catch (error) {
      throw new Error();
    }
  }

  public async deleteProduct(productId: string): Promise<ProductDto | Error> {
    try {
      const productDocument = await Product.findByIdAndDelete(productId);
      if (!productDocument) throw new Error();
      return convertDocumentToProductDto(productDocument);
    } catch (error) {
      throw new Error();
    }
  }
}
