import Produkty from "./components/Produkty";
import Platnosci from "./components/Platnosci";

export default function App() {
    return (
        <div>
            <h1>Sklep</h1>
            <Produkty />
            <Platnosci />
        </div>
    );
}