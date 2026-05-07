import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Produkty from '../components/Produkty'

export default function ProductsPage() {
  const { cart } = useCart()
  const navigate = useNavigate()

  return (
    <div>
      <Produkty />
      <button onClick={() => navigate('/koszyk')}>
        Przejdź do koszyka ({cart.length})
      </button>
    </div>
  )
}