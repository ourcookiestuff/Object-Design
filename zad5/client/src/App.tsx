import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import KoszykPage from './pages/KoszykPage'
import PlatnosciPage from './pages/PlatnosciPage'

type Product = { id: number; name: string; price: number }

export default function App() {
  const [cart, setCart] = useState<(Product & { cartId: number })[]>([])
  let cartIdCounter = 0

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, { ...product, cartId: cartIdCounter++ }])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/koszyk" element={<KoszykPage cart={cart} />} />
        <Route path="/platnosci" element={<PlatnosciPage cart={cart} />} />
      </Routes>
    </BrowserRouter>
  )
}