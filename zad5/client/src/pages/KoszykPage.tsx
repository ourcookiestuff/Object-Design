import { useNavigate } from 'react-router-dom'
import Koszyk from '../components/Koszyk'

export default function KoszykPage() {
  const navigate = useNavigate()

  return (
    <div>
      <Koszyk />
      <button onClick={() => navigate('/')}>Wróć do produktów</button>
      <button onClick={() => navigate('/platnosci')}>Przejdź do płatności</button>
    </div>
  )
}