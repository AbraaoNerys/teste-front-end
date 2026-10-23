import type { Product } from '../../types/product';
import { formatInstallment, formatPrice } from '../../utils/format';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.heading}>
        <button
          className={styles.details}
          type="button"
          aria-label={`Ver detalhes de ${product.name}`}
          onClick={() => onSelect(product)}
        >
          <span className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={product.photo}
              alt={`Foto de ${product.name}`}
            />
          </span>
          <span className={styles.name}>{product.name}</span>
        </button>
      </h3>

      <p className={styles.price}>{formatPrice(product.price)}</p>
      <p className={styles.installment}>{formatInstallment(product.price)}</p>
      <p className={styles.shipping}>Frete grátis</p>

      <button className={styles.buyButton} type="button">
        Comprar
      </button>
    </article>
  );
}
