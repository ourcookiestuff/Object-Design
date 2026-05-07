import { useNavigate } from 'react-router-dom'
import Produkty from '../components/Produkty'

type Product = { id: number; name: string; price: number }

type Props = {
  cart: Product[]
  onAddToCart: (product: Product) => void
}

export default function ProductsPage({ cart, onAddToCart }: Props) {
  const navigate = useNavigate()

  return (
    <div>
      <Produkty onAddToCart={onAddToCart} />
      <button onClick={() => navigate('/koszyk')}>
        Przejdź do koszyka ({cart.length})
      </button>
    </div>
  )
}