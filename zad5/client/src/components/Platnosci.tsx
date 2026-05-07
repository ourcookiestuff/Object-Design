import { useState } from "react";

type Product = { id: number; name: string; price: number };

type Props = {
    cart: Product[];
}

export default function Platnosci({ cart }: Props) {
    const [status, setStatus] = useState('')
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handlePayment = async () => {
        const response = await fetch("http://localhost:3001/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart, total }),
        });
        const data = await response.json();
        setStatus(data.message);
    }

    return (
        <div>
            <h2>Platności</h2>
            <button onClick={handlePayment}>Zapłać</button>
            {status && <p>{status}</p>}
        </div>
    );
}