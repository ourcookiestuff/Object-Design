import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import ProductsPage from './pages/ProductsPage'
import KoszykPage from './pages/KoszykPage'
import PlatnosciPage from './pages/PlatnosciPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/koszyk" element={<KoszykPage />} />
            <Route path="/platnosci" element={<PlatnosciPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}