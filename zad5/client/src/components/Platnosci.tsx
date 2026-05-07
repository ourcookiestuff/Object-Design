import { useState } from "react";

export default function Platnosci() {
    const [status, setStatus] = useState('')

    const handlePayment = async () => {
        const response = await fetch("http://localhost:3001/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [], total: 0 }),
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