import { Pagination } from "flowbite-react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchProductsAsync } from "../productsSlice"

export const ProductPagination = () => {
  const dispatch = useAppDispatch()

  const { currentPage, totalPages } = useAppSelector(state => state.products)

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => {
          const pageAsString = page.toString()
          void dispatch(fetchProductsAsync({ page: pageAsString }))
        }}
      />
    </div>
  )
}
