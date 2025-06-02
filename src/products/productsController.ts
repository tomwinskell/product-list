import { Controller, Get, Path, Queries, Route } from 'tsoa';
import { ProductsService } from './productsService';
import { ProductDto, ProductListResponse } from './productsTypes';

export interface QueryParams {
  page: string;
  limit: string;
}

@Route('products')
export class ProductsController extends Controller {
  @Get()
  public async getAllProducts(
    @Queries() queryParams: QueryParams
  ): Promise<ProductListResponse | Error> {
    return new ProductsService().getAllProducts(queryParams);
  }

  @Get('{productId}')
  public async getByProductId(
    @Path() productId: string
  ): Promise<ProductDto | Error> {
    return new ProductsService().getByProductId(productId);
  }
}
