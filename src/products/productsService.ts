import { QueryParams } from './productsController';
import { Product } from './productModel';
import { ProductListResponse } from './productsTypes';

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
        return { ...product.toObject(), _id: product._id.toString() };
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
}
