import type { MouseEvent } from 'react';
import tecnologia from '../../assets/categorias/tecnologia.svg';
import supermercado from '../../assets/categorias/supermercado.svg';
import bebidas from '../../assets/categorias/bebidas.svg';
import ferramentas from '../../assets/categorias/ferramentas.svg';
import saude from '../../assets/categorias/saude.svg';
import esportesEFitness from '../../assets/categorias/esportes-e-fitness.svg';
import moda from '../../assets/categorias/moda.svg';
import styles from './CategoryList.module.scss';

interface Category {
  label: string;
  icon: string;
  active?: boolean;
}

const categories: Category[] = [
  { label: 'Tecnologia', icon: tecnologia, active: true },
  { label: 'Supermercado', icon: supermercado },
  { label: 'Bebidas', icon: bebidas },
  { label: 'Ferramentas', icon: ferramentas },
  { label: 'Saúde', icon: saude },
  { label: 'Esportes e Fitness', icon: esportesEFitness },
  { label: 'Moda', icon: moda },
];

function preventNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}

export function CategoryList() {
  return (
    <section className={styles.section} aria-labelledby="category-list-title">
      <h2 className={styles.visuallyHidden} id="category-list-title">
        Compre por categoria
      </h2>

      <div className={styles.list}>
        {categories.map((category) => (
          <a
            className={`${styles.item} ${category.active ? styles.active : ''}`}
            href="#"
            aria-current={category.active ? 'true' : undefined}
            onClick={preventNavigation}
            key={category.label}
          >
            <span className={styles.tile}>
              <img src={category.icon} alt="" />
            </span>
            <span className={styles.label}>{category.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
