import { useProducts } from './hooks/useProducts';
import { formatPrice, formatInstallment } from './utils/format';

export default function App() {
  const { products, loading, error } = useProducts();

  if (loading) return <p role="status">Carregando produtos...</p>;
  if (error) return <p role="alert">{error}</p>;

  // Durante o carregamento products também é [], então o vazio só é avaliado depois.
  if (products.length === 0) return <p>Nenhum produto disponível no momento.</p>;

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
