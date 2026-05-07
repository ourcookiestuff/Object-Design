import { useNavigate } from 'react-router-dom'
import Koszyk from '../components/Koszyk'

type Product = { id: number; name: string; price: number; cartId: number }

type Props = {
  cart: Product[]
}

export default function KoszykPage({ cart }: Props) {
  const navigate = useNavigate()

  return (
    <div>
      <Koszyk items={cart} />
      <button onClick={() => navigate('/')}>Wróć do produktów</button>
      <button onClick={() => navigate('/platnosci')}>Przejdź do płatności</button>
    </div>
  )
}