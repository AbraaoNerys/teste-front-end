import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/format';
import styles from './ProductModal.module.scss';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const dialog = dialogRef.current;

    // No StrictMode, a segunda execução encontra o mesmo dialog já aberto.
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const closeDialog = () => dialogRef.current?.close();

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    // O conteúdo interno ocupa a caixa branca; só o fundo tem o dialog como alvo.
    if (event.target === event.currentTarget) closeDialog();
  };

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className={styles.content}>
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Fechar modal"
          onClick={closeDialog}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M8.5 9.5 23.5 22.5M23.5 9.5 8.5 22.5" />
          </svg>
        </button>

        <div className={styles.imageWrapper}>
          <img className={styles.image} src={product.photo} alt={product.name} />
        </div>

        <div className={styles.details}>
          <div className={styles.identity}>
            <h2 className={styles.name} id={titleId}>
              {product.name}
            </h2>
            <p className={styles.price}>{formatPrice(product.price)}</p>
          </div>

          <div className={styles.descriptionGroup}>
            <p className={styles.description} id={descriptionId}>
              {product.description}
            </p>
            <a
              className={styles.moreDetails}
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              Veja mais detalhes do produto &gt;
            </a>
          </div>

          <div className={styles.actions}>
            <div className={styles.quantity}>
              <button
                className={styles.quantityButton}
                type="button"
                aria-label="Diminuir quantidade"
                disabled={quantity === 1}
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10h12" />
                </svg>
              </button>

              <output className={styles.quantityValue} aria-live="polite">
                {String(quantity).padStart(2, '0')}
              </output>

              <button
                className={styles.quantityButton}
                type="button"
                aria-label="Aumentar quantidade"
                disabled={quantity === 99}
                onClick={() => setQuantity((current) => Math.min(99, current + 1))}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10h12M10 4v12" />
                </svg>
              </button>
            </div>

            <button className={styles.buyButton} type="button">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
