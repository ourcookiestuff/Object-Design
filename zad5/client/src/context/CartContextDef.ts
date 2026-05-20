import { createContext } from 'react'

export type Product = { id: number; name: string; price: number }
export type CartItem = Product & { cartId: number }

export type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)