import Platnosci from '../components/Platnosci'

type Product = { id: number; name: string; price: number; cartId: number }

type Props = {
  cart: Product[]
}

export default function PlatnosciPage({ cart }: Props) {
  return <Platnosci cart={cart} />
}