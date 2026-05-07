import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import type { Product } from '../context/CartContext'

export default function Produkty() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then(setProducts)
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