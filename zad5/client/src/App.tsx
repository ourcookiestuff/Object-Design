import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import ProductsPage from './pages/ProductsPage'
import KoszykPage from './pages/KoszykPage'
import PlatnosciPage from './pages/PlatnosciPage'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/koszyk" element={<KoszykPage />} />
          <Route path="/platnosci" element={<PlatnosciPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}