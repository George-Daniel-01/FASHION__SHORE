// utils.ts
import { ApiError } from './types/ApiError'

export const getError = (error: unknown): string => {
  // safely handle any unknown error
  if (typeof error === 'object' && error !== null) {
    const e = error as Partial<ApiError> // use Partial to allow missing props
    return e.response?.data?.message ?? e.message ?? 'An unknown error occurred'
  }
  return String(error)
}

// helper to convert Product to CartItem
import { CartItem } from './types/Cart'
import { Product } from './types/Product'

export const convertProductToCartItem = (product: Product): CartItem => ({
  _id: product._id,
  name: product.name,
  slug: product.slug,
  image: product.image,
  price: product.price,
  countInStock: product.countInStock,
  quantity: 1,
})
