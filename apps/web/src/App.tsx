import "./App.css"
import { ProductPagination } from "./features/products/Pagination"
import { Products } from "./features/products/Products"
import { ProductSortOrder } from "./features/products/ProductSortOrder"

export const App = () => (
  <div className="flex flex-col items-center justify-center min-w-xs">
    <ProductSortOrder />
    <Products />
    <ProductPagination />
  </div>
)
