import { QueryParams } from './productsController';
import { Product } from './productModel';
import { ProductDto, ProductListResponse } from './productsTypes';
import { convertDocumentToProductDto } from './productHelpers';

export class ProductsService {
  public async getAllProducts({
    page,
    limit,
  }: QueryParams): Promise<ProductListResponse | Error> {
    try {
      const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
      const limitAsInt = parseInt(typeof limit === 'string' ? limit : '10');

      const products = await Product.find({})
        .skip(limitAsInt * (pageAsInt - 1))
        .limit(limitAsInt)
        .sort({ createdAt: -1 });

      const count = await Product.countDocuments();

      const productsDto = products.map((product) => {
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

  public async getByProductId(productId: string): Promise<ProductDto | Error> {
    try {
      const productsDto = await Product.find({ _id: productId });
      return convertDocumentToProductDto(productsDto[0]);
    } catch (error) {
      throw new Error();
    }
  }
}
