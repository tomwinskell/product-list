import { Controller, Get, Queries, Route } from 'tsoa';
import { ProductsService } from './productsService';
import { ProductListResponse } from './productsTypes';

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
}
