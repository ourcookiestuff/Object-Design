import { createContext, useContext, useState, type ReactNode } from 'react'

export type Product = { id: number; name: string; price: number }
export type CartItem = Product & { cartId: number }

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

let cartCounter = 0

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, { ...product, cartId: cartCounter++ }])
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}