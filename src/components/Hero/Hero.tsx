import type { MouseEvent } from 'react';
import heroImage from '../../assets/imagens/hero.jpg';
import styles from './Hero.module.scss';

function preventNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img
        className={styles.background}
        src={heroImage}
        alt=""
        fetchPriority="high"
      />
      <span className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <h1 id="hero-title">
          Venha conhecer nossas
          <br />
          promoções
        </h1>
        <p>
          <strong>50% Off</strong> nos produtos
        </p>
        <a href="#" onClick={preventNavigation}>
          Ver produto
        </a>
      </div>
    </section>
  );
}
