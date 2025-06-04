import "./App.css"
import { Navbar } from "./components/navbar/Navbar"
import { ProductPagination } from "./features/products/Pagination"
import { Products } from "./features/products/Products"
import { ProductSortOrder } from "./features/products/ProductSortOrder"

export const App = () => {
  return (
    <div className="bg-white dark:bg-gray-600">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col p-5 w-sm md:w-auto md:max-w-2xl lg:max-w-5xl">
          <ProductSortOrder />
          <Products />
          <ProductPagination />
        </div>
      </div>
    </div>
  )
}
