import { Product } from './productModel';
import {
  ProductCreationParams,
  ProductDto,
  ProductListResponse,
  ProductQueryParams,
} from './productTypes';
import {
  convertDocumentToProductDto,
  returnFindOptions,
  returnSortOptions,
} from './productHelpers';

export class ProductsService {
  public async getAllProducts({
    page,
    limit,
    category,
    price,
    query,
  }: ProductQueryParams): Promise<ProductListResponse | Error> {
    try {
      const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
      const limitAsInt = parseInt(typeof limit === 'string' ? limit : '10');

      const productDocuments = await Product.find(
        returnFindOptions(category, query)
      )
        .skip(limitAsInt * (pageAsInt - 1))
        .limit(limitAsInt)
        .sort(returnSortOptions(price));

      const count = await Product.countDocuments(
        returnFindOptions(category, query)
      );

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
