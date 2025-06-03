import "dotenv/config"
import type { ProductFetchParams, ProductListResponse } from "./productTypes.ts"

export const fetchProducts = async (
  params: ProductFetchParams,
): Promise<ProductListResponse | undefined> => {
  try {
    const response = await fetch(buildFetchProductsUrl(params))
    if (!response.ok) {
      throw new Error("[fetchProducts] API response error")
    }
    return (await response.json()) as ProductListResponse
  } catch (error) {
    console.error(error)
    return
  }
}

const buildFetchProductsUrl = (params: ProductFetchParams): string => {
  if (!process.env.BASE_URL)
    throw new Error("[buildFetchProductsUrl] base url not defined")
  return `${process.env.BASE_URL}/products?${new URLSearchParams(filterParams(params)).toString()}`
}

const filterParams = (params: ProductFetchParams) => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(params).filter(([_, value]) => value != undefined),
  )
}
