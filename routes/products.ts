import { Router, Response, Request, NextFunction } from 'express';
import { Product } from '#root/models/product.js';
const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = parseInt(
      typeof req.query.page === 'string' ? req.query.page : '1'
    );
    let limit = parseInt(
      typeof req.query.limit === 'string' ? req.query.limit : '10'
    );
    let category = req.query.category;

    const products = await Product.find({})
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ createdAt: -1 });

    const count = await Product.countDocuments();

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
});
router.get('/:productId', async (req, res) => {});
router.get('/:productId/reviews', async (req, res) => {});
router.post('/', async (req, res) => {});
router.post('/:productId/reviews', async (req, res) => {});
router.delete('/:productId', async (req, res) => {});

export default router;
