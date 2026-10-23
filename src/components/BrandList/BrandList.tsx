import econverseLogo from '../../assets/logo/econverse.svg';
import styles from './BrandList.module.scss';

const brands = [1, 2, 3, 4, 5];

export function BrandList() {
  return (
    <section className={styles.brands} aria-labelledby="brand-list-title">
      <h2 className={styles.title} id="brand-list-title">
        Navegue por marcas
      </h2>

      <ul className={styles.list}>
        {brands.map((brand) => (
          <li className={styles.item} key={brand}>
            <img className={styles.logo} src={econverseLogo} alt="Econverse" />
          </li>
        ))}
      </ul>
    </section>
  );
}
