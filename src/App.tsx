import { useProducts } from './hooks/useProducts';
import { formatPrice, formatInstallment } from './utils/format';

export default function App() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  console.log(products);
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} | {p.category} | {formatPrice(p.price)} | {formatInstallment(p.price)}
        </li>
      ))}
    </ul>
  );
}
