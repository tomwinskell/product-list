import express from 'express';
import { faker } from '@faker-js/faker';
import { Product } from '#root/models/product.js';
const router = express.Router();
import productRoutes from '#root/routes/products.js';
import reviewRoutes from '#root/routes/reviews.js';

//Mounting /products and /reviews routes
router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes);

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = parseFloat(faker.commerce.price());
    product.image = 'https://via.placeholder.com/250?text=Product+Image';

    product.save();
  }
  res.end();
});

export default router;
