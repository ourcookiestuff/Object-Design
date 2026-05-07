import { useEffect, useState } from "react";

type Product = { id: number; name: string; price: number };

type Props = {
    onAddToCart: (product: Product) => void;
}

export default function Produkty({ onAddToCart }: Props) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/products")
            .then(res => res.json())
            .then(setProducts)
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div>
            <h2>Produkty</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} zł
                        <button onClick={() => onAddToCart(product)}>
                            Dodaj do koszyka
                        </button>
                    </li>
                ))}
            </ul>
        </div> 
    );
}