import { type ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchProductsAsync } from "./productsSlice"
import { ProductCard } from "./ProductCard"

export const Products = (): ReactNode => {
  const dispatch = useAppDispatch()

  const { products, status } = useAppSelector(state => state.products)

  useEffect(() => {
    if (status === "idle") void dispatch(fetchProductsAsync({}))
  }, [dispatch, status])

  if (status === "loading") return <p>Loading products...</p>
  if (status === "failed") return <p>Error</p>

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )
}
