import { useState } from 'react';
import { BrandList } from './components/BrandList/BrandList';
import { CategoryList } from './components/CategoryList/CategoryList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Newsletter } from './components/Newsletter/Newsletter';
import { ProductModal } from './components/ProductModal/ProductModal';
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase';
import { PromoBanners } from './components/PromoBanners/PromoBanners';
import { departments } from './data/departments';
import type { DepartmentId } from './data/departments';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';
import styles from './App.module.scss';

export default function App() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<DepartmentId>('tecnologia');

  // Todos os produtos do JSON oficial são de tecnologia (o endereço do JSON é .../tecnologia/...).
  const hasProducts =
    !loading && !error && products.length > 0 && activeDepartment === 'tecnologia';
  const department = departments.find((item) => item.id === activeDepartment);
  let firstShowcaseContent;

  if (loading) {
    firstShowcaseContent = <p role="status">Carregando produtos...</p>;
  } else if (error) {
    firstShowcaseContent = <p role="alert">{error}</p>;
  } else if (products.length === 0) {
    // Durante o carregamento products também é [], então o vazio só é avaliado depois.
    firstShowcaseContent = <p>Nenhum produto disponível no momento.</p>;
  } else if (activeDepartment !== 'tecnologia') {
    firstShowcaseContent = (
      <p role="status">Ainda não há produtos cadastrados em {department?.label}.</p>
    );
  } else {
    firstShowcaseContent = (
      <ProductShowcase
        carouselLabel="Carrossel de produtos 1"
        title="Produtos relacionados"
        products={products}
        onSelectProduct={setSelectedProduct}
        withTabs
      />
    );
  }

  return (
    <>
      <Header />

      <main>
        <Hero />
        <CategoryList activeId={activeDepartment} onSelect={setActiveDepartment} />
        <div className={styles.sections}>
          <div className={hasProducts ? undefined : styles.state}>
            {firstShowcaseContent}
          </div>

          <PromoBanners />

          {hasProducts && (
            <ProductShowcase
              carouselLabel="Carrossel de produtos 2"
              title="Produtos relacionados"
              products={products}
              onSelectProduct={setSelectedProduct}
            />
          )}

          <PromoBanners />
          <BrandList />

          {hasProducts && (
            <ProductShowcase
              carouselLabel="Carrossel de produtos 3"
              title="Produtos relacionados"
              products={products}
              onSelectProduct={setSelectedProduct}
            />
          )}

          <Newsletter />
        </div>
      </main>

      <Footer />

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
