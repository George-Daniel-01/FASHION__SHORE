// utils.ts
import { ApiError } from './types/ApiError'

export const getError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const e = error as ApiError
    return e.response?.data?.message ?? e.message ?? 'An unknown error occurred'
  }
  return String(error)
}

// optional helper
import { CartItem } from './types/Cart'
import { Product } from './types/Product'

export const convertProductToCartItem = (product: Product): CartItem => {
  return {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }
}
