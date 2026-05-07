import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Platnosci() {
  const { cart, clearCart } = useCart()
  const [status, setStatus] = useState('')
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handlePayment = async () => {
    const res = await fetch(`/api/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, total }),
    })
    const data = await res.json()
    setStatus(data.message)
    clearCart()
  }

  return (
    <div>
      <h2>Płatności</h2>
      <p>Do zapłaty: {total} zł</p>
      <button onClick={handlePayment} disabled={cart.length === 0}>
        Zapłać
      </button>
      {status && <p>{status}</p>}
    </div>
  )
}