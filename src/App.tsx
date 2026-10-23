import { useState } from 'react';
import { CategoryList } from './components/CategoryList/CategoryList';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ProductModal } from './components/ProductModal/ProductModal';
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';
import styles from './App.module.scss';

export default function App() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  let showcaseContent;

  if (loading) {
    showcaseContent = <p role="status">Carregando produtos...</p>;
  } else if (error) {
    showcaseContent = <p role="alert">{error}</p>;
  } else if (products.length === 0) {
    // Durante o carregamento products também é [], então o vazio só é avaliado depois.
    showcaseContent = <p>Nenhum produto disponível no momento.</p>;
  } else {
    showcaseContent = (
      <>
        <ProductShowcase
          carouselLabel="Carrossel de produtos 1"
          title="Produtos relacionados"
          products={products}
          onSelectProduct={setSelectedProduct}
          withTabs
        />
        <ProductShowcase
          carouselLabel="Carrossel de produtos 2"
          title="Produtos relacionados"
          products={products}
          onSelectProduct={setSelectedProduct}
        />
        <ProductShowcase
          carouselLabel="Carrossel de produtos 3"
          title="Produtos relacionados"
          products={products}
          onSelectProduct={setSelectedProduct}
        />
      </>
    );
  }

  return (
    <>
      <Header />

      <main>
        <Hero />
        <CategoryList />
        <div className={styles.showcases}>{showcaseContent}</div>
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
