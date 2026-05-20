import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import api from '../api/axiosInstance'

export default function Platnosci() {
  const { cart, clearCart } = useCart()
  const [status, setStatus] = useState('')
  const [paid, setPaid] = useState(false)
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handlePayment = async () => {
    try {
      const res = await api.post('/payments', { items: cart, total })
      setStatus(res.data.message)
      clearCart()
      setPaid(true)
    } catch (err) {
      console.error('Błąd płatności:', err)
      setStatus('Błąd podczas przetwarzania płatności')
    }
  }

  return (
    <div>
      <h2>Płatności</h2>
      <p>Do zapłaty: {total} zł</p>
      <button onClick={handlePayment} disabled={cart.length === 0 || paid}>
        Zapłać
      </button>
      {status && <p>{status}</p>}
      {paid && (
        <button onClick={() => navigate('/')}>Wróć do produktów</button>
      )}
    </div>
  )
}