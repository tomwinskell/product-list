import { Product } from './productModel';
import {
  ProductCreationParams,
  ProductDto,
  ProductListResponse,
  ProductQueryParams,
} from './productTypes';
import { convertDocumentToProductDto } from './productHelpers';
import { ReviewListResponse, ReviewQueryParams } from '../reviews/reviewTypes';
import { convertDocumentToReviewDto } from '../reviews/reviewHelpers';
import { Review } from '../reviews/reviewModel';

export class ProductsService {
  public async getAllProducts({
    page,
    limit,
  }: ProductQueryParams): Promise<ProductListResponse | Error> {
    try {
      const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
      const limitAsInt = parseInt(typeof limit === 'string' ? limit : '10');

      const productDocuments = await Product.find({})
        .skip(limitAsInt * (pageAsInt - 1))
        .limit(limitAsInt)
        .sort({ createdAt: -1 });

      const count = await Product.countDocuments();

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

  public async getProductById(
    productId: string
  ): Promise<ProductDto | null | Error> {
    try {
      const productDocument = await Product.findById(productId);
      return productDocument
        ? convertDocumentToProductDto(productDocument)
        : null;
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

  public async deleteProduct(
    productId: string
  ): Promise<ProductDto | null | Error> {
    try {
      const productDocument = await Product.findByIdAndDelete(productId);
      return productDocument
        ? convertDocumentToProductDto(productDocument)
        : null;
    } catch (error) {
      throw new Error();
    }
  }

  public async getProductReviews(
    productId: string,
    { page, limit }: ReviewQueryParams
  ): Promise<ReviewListResponse | Error> {
    try {
      const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
      const limitAsInt = parseInt(typeof limit === 'string' ? limit : '10');

      const productDocument = await Product.findById(productId);
      if (!productDocument) throw new Error();

      const reviewDocuments = await Review.find({ productId })
        .skip(limitAsInt * (pageAsInt - 1))
        .limit(limitAsInt)
        .sort({ createdAt: -1 });

      const count = await Review.countDocuments({ productId });

      const reviewsDto = reviewDocuments.map((review) => {
        return convertDocumentToReviewDto(review);
      });

      return {
        reviews: reviewsDto,
        totalPages: Math.ceil(count / limitAsInt),
        currentPage: pageAsInt,
      };
    } catch (error) {
      throw new Error();
    }
  }
}
