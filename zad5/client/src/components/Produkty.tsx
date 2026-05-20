import { useEffect, useState } from 'react'
import type { Product } from '../context/CartContextDef'
import { useCart } from '../context/useCart'
import api from '../api/axiosInstance'

export default function Produkty() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    api.get<Product[]>('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Błąd pobierania produktów:', err))
  }, [])

  return (
    <div>
      <h2>Produkty</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} – {p.price} zł
            <button onClick={() => addToCart(p)}>Dodaj do koszyka</button>
          </li>
        ))}
      </ul>
    </div>
  )
}