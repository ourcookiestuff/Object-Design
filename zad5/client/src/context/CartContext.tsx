import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from './CartContextDef'
import type { Product, CartItem } from './CartContextDef'

let cartCounter = 0

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, { ...product, cartId: cartCounter++ }])
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={useMemo(() => ({ cart, addToCart, clearCart }), [cart])}>
      {children}
    </CartContext.Provider>
  )
}