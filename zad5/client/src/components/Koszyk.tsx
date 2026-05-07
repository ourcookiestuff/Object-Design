type Product = { id: number; name: string; price: number };

type Props = {
    items: (Product & { cartId: number })[];
}

export default function Koszyk({ items }: Props) {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <h2>Koszyk</h2>
            {items.length === 0 ? (
                <p>Twój koszyk jest pusty.</p>
            ) : (
                <>
                    <ul>
                        {items.map((item) => (
                            <li key={item.cartId}>
                                {item.name} - {item.price} zł
                            </li>
                        ))}
                    </ul>
                    <p>Łączna kwota: {total} zł</p>
                </>
            )}
        </div>
    );
}