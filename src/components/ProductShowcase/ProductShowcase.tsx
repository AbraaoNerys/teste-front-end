import { useId, useState } from 'react';
import { showcaseTabs } from '../../data/showcaseTabs';
import type { Product } from '../../types/product';
import { CategoryTabs } from '../CategoryTabs/CategoryTabs';
import { ProductCarousel } from '../ProductCarousel/ProductCarousel';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import styles from './ProductShowcase.module.scss';

interface ProductShowcaseProps {
  carouselLabel: string;
  title: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  withTabs?: boolean;
}

export function ProductShowcase({
  carouselLabel,
  title,
  products,
  onSelectProduct,
  withTabs = false,
}: ProductShowcaseProps) {
  const headingId = useId();
  const [activeTab, setActiveTab] = useState('celular');
  const selectedTab = showcaseTabs.find((tab) => tab.id === activeTab);
  const visibleProducts =
    !withTabs || selectedTab?.category === null
      ? products
      : products.filter((product) => product.category === selectedTab?.category);

  return (
    <section className={styles.showcase}>
      <SectionTitle id={headingId} title={title} showSeeAll={!withTabs} />

      {withTabs && (
        <CategoryTabs
          tabs={showcaseTabs}
          activeId={activeTab}
          onChange={(tab) => setActiveTab(tab.id)}
        />
      )}

      {visibleProducts.length === 0 ? (
        <p className={styles.empty}>Nenhum produto nesta categoria.</p>
      ) : (
        <div className={styles.carouselWrapper}>
          <ProductCarousel
            key={withTabs ? activeTab : 'all-products'}
            ariaLabel={carouselLabel}
            products={visibleProducts}
            onSelectProduct={onSelectProduct}
          />
        </div>
      )}
    </section>
  );
}
