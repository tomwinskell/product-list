import { Button, ButtonGroup } from "flowbite-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  fetchProductsAsync,
  sortByHighestPrice,
  sortByLowestPrice,
} from "./productsSlice"

export function ProductSortOrder() {
  const dispatch = useAppDispatch()

  const { price } = useAppSelector(state => state.products)

  return (
    <ButtonGroup>
      Sort By Price
      <Button
        color="alternative"
        disabled={price === "highest"}
        onClick={() => {
          dispatch(sortByHighestPrice())
          void dispatch(fetchProductsAsync({}))
        }}
      >
        Highest
      </Button>
      <Button
        color="alternative"
        disabled={price === "lowest"}
        onClick={() => {
          dispatch(sortByLowestPrice())
          void dispatch(fetchProductsAsync({}))
        }}
      >
        Lowest
      </Button>
    </ButtonGroup>
  )
}
