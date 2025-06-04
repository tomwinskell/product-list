import { CategoryDropdown, ProductPagination } from "./components"
import { ProductSortOrder } from "./components"
import { ProductsList } from "./components"

export const Products = () => {
  return (
    <div className="flex flex-col p-5 w-sm md:w-2xl lg:w-5xl">
      <div className="flex flex-col md:flex-row items-center gap-y-2 md:justify-between">
        <CategoryDropdown />
        <ProductSortOrder />
      </div>
      <ProductsList />
      <ProductPagination />
    </div>
  )
}
