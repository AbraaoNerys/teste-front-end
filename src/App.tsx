import { useState } from 'react';
import { ProductModal } from './components/ProductModal/ProductModal';
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';
import styles from './App.module.scss';

export default function App() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (loading) return <p role="status">Carregando produtos...</p>;
  if (error) return <p role="alert">{error}</p>;

  // Durante o carregamento products também é [], então o vazio só é avaliado depois.
  if (products.length === 0) return <p>Nenhum produto disponível no momento.</p>;

  return (
    <>
      <main className={styles.main}>
        <ProductShowcase
          title="Produtos relacionados"
          products={products}
          onSelectProduct={setSelectedProduct}
          withTabs
        />
        <ProductShowcase
          title="Produtos relacionados"
          products={products}
          onSelectProduct={setSelectedProduct}
        />
        <ProductShowcase
          title="Produtos relacionados"
          products={products}
          onSelectProduct={setSelectedProduct}
        />
      </main>

      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
