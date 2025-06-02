import { Product } from '../products/productModel';
import { convertDocumentToReviewDto } from './reviewHelpers';
import { Review } from './reviewModel';
import { ReviewCreationParams, ReviewDto, ReviewListResponse, ReviewQueryParams } from './reviewTypes';

export class ReviewsService {
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

  public async createReview(
    reviewToCreate: ReviewCreationParams
  ): Promise<ReviewDto | Error> {
    try {
      const productDocument = await Product.findById(reviewToCreate.productId);
      if (!productDocument) throw new Error();
      const reviewDocument = await Review.create(reviewToCreate);
      return convertDocumentToReviewDto(reviewDocument);
    } catch (error) {
      throw new Error();
    }
  }

  public async deleteReview(reviewId: string): Promise<ReviewDto | Error> {
    try {
      const reviewDocument = await Review.findByIdAndDelete(reviewId);
      if (!reviewDocument) throw new Error();
      return convertDocumentToReviewDto(reviewDocument);
    } catch (error) {
      throw new Error();
    }
  }
}
