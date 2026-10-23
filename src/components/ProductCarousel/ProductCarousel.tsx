import { useState, type CSSProperties } from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductCarousel.module.scss';

interface ProductCarouselProps {
  ariaLabel: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

type CarouselStyle = CSSProperties & {
  '--index': number;
  '--visible': number;
};

const VISIBLE_CARDS = 4;

export function ProductCarousel({
  ariaLabel,
  products,
  onSelectProduct,
}: ProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const visibleCards = Math.min(VISIBLE_CARDS, products.length);
  const maxIndex = Math.max(0, products.length - VISIBLE_CARDS);
  const carouselStyle: CarouselStyle = {
    '--index': index,
    '--visible': visibleCards,
  };

  const showArrows = products.length > VISIBLE_CARDS;

  return (
    <section
      className={styles.carousel}
      style={carouselStyle}
      aria-label={ariaLabel}
      aria-roledescription="carrossel"
    >
      {showArrows && (
        <button
          className={`${styles.arrow} ${styles.previous}`}
          type="button"
          aria-label="Produtos anteriores"
          disabled={index === 0}
          onClick={() => setIndex((currentIndex) => Math.max(0, currentIndex - 1))}
        >
          <svg className={styles.chevron} viewBox="0 0 32 32" aria-hidden="true">
            <path d="M18.5 10.5 13 16l5.5 5.5" />
          </svg>
        </button>
      )}

      <div className={styles.viewport}>
        <div className={styles.track}>
          {products.map((product, productIndex) => {
            const isVisible =
              productIndex >= index && productIndex < index + VISIBLE_CARDS;

            return (
              <div
                className={styles.item}
                key={product.id}
                inert={!isVisible ? true : undefined}
              >
                <ProductCard product={product} onSelect={onSelectProduct} />
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && (
        <button
          className={`${styles.arrow} ${styles.next}`}
          type="button"
          aria-label="Próximos produtos"
          disabled={index === maxIndex}
          onClick={() =>
            setIndex((currentIndex) => Math.min(maxIndex, currentIndex + 1))
          }
        >
          <svg className={styles.chevron} viewBox="0 0 32 32" aria-hidden="true">
            <path d="M18.5 10.5 13 16l5.5 5.5" />
          </svg>
        </button>
      )}
    </section>
  );
}
