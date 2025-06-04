import { CategoryDropdown, ProductPagination } from "./components"
import { ProductSortOrder } from "./components"
import { ProductsList } from "./components"

export const Products = () => {
  return (
    <div className="flex flex-col p-5 w-sm md:w-auto md:max-w-2xl lg:max-w-5xl">
      <div className="flex flex-row justify-between">
        <CategoryDropdown />
        <ProductSortOrder />
      </div>
      <ProductsList />
      <ProductPagination />
    </div>
  )
}
