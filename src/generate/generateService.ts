import { Review } from '../reviews/reviewModel';
import { Product } from '../products/productModel';
import { buildProduct, buildReview } from './generateHelpers';

const PRODUCTS = 90;
const REVIEWS = 5;

export class GenerateService {
  public async generateData(): Promise<void> {
    for (let i = 0; i < PRODUCTS; i++) {
      //Build product and add to database
      const productDocument = await Product.create(buildProduct());

      for (let i = 0; i < REVIEWS; i++) {
        //Build review with productDocument._id
        await Review.create({
          ...buildReview(),
          productId: productDocument._id,
        });
      }
    }
  }
}
