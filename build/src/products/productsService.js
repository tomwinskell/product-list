"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const productModel_1 = require("./productModel");
class ProductsService {
    getAllProducts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ page, limit, }) {
            try {
                const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
                const limitAsInt = parseInt(typeof limit === 'string' ? limit : '10');
                const products = yield productModel_1.Product.find({})
                    .skip(limitAsInt * (pageAsInt - 1))
                    .limit(limitAsInt)
                    .sort({ createdAt: -1 });
                const count = yield productModel_1.Product.countDocuments();
                const productsDto = products.map((product) => {
                    return Object.assign(Object.assign({}, product.toObject()), { _id: product._id.toString() });
                });
                return {
                    products: productsDto,
                    totalPages: Math.ceil(count / limitAsInt),
                    currentPage: pageAsInt,
                };
            }
            catch (err) {
                throw new Error();
            }
        });
    }
}
exports.ProductsService = ProductsService;
