import { createAppSlice } from "../../app/createAppSlice"
import { fetchProducts } from "./fetchProducts"
import type { ProductsFetchParams, ProductsSliceState } from "./productTypes"

const initialState: ProductsSliceState = {
  products: [],
  totalPages: 0,
  currentPage: 0,
  status: "idle",
}

export const productsSlice = createAppSlice({
  name: "products",
  initialState,
  reducers: create => ({
    fetchProductsAsync: create.asyncThunk(
      async (params: ProductsFetchParams) => {
        const response = await fetchProducts(params)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "succeeded"
          state.products = action.payload.products
          state.currentPage = action.payload.currentPage
          state.totalPages = action.payload.totalPages
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectProducts: products => products.products,
    selectCurrentPage: products => products.currentPage,
    selectTotalPages: products => products.totalPages,
    selectStatus: products => products.status,
  },
})

export const { fetchProductsAsync } = productsSlice.actions

export const {
  selectProducts,
  selectCurrentPage,
  selectTotalPages,
  selectStatus,
} = productsSlice.selectors
