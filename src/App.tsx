import { ProductShowcase } from './components/ProductShowcase/ProductShowcase';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';
import styles from './App.module.scss';

export default function App() {
  const { products, loading, error } = useProducts();

  if (loading) return <p role="status">Carregando produtos...</p>;
  if (error) return <p role="alert">{error}</p>;

  // Durante o carregamento products também é [], então o vazio só é avaliado depois.
  if (products.length === 0) return <p>Nenhum produto disponível no momento.</p>;

  // Handler provisório: substituir na etapa F pela abertura do modal.
  const handleSelectProduct = (product: Product) => {
    console.log(product);
  };

  return (
    <main className={styles.main}>
      <ProductShowcase
        title="Produtos relacionados"
        products={products}
        onSelectProduct={handleSelectProduct}
        withTabs
      />
      <ProductShowcase
        title="Produtos relacionados"
        products={products}
        onSelectProduct={handleSelectProduct}
      />
      <ProductShowcase
        title="Produtos relacionados"
        products={products}
        onSelectProduct={handleSelectProduct}
      />
    </main>
  );
}
