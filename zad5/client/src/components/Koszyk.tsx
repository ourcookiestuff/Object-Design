import { useCart } from '../context/useCart'

export default function Koszyk() {
  const { cart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div>
      <h2>Koszyk</h2>
      {cart.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.cartId}>{item.name} – {item.price} zł</li>
            ))}
          </ul>
          <p>Łącznie: {total} zł</p>
        </>
      )}
    </div>
  )
}