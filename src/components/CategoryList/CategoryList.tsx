import type { MouseEvent } from 'react';
import { departments } from '../../data/departments';
import type { DepartmentId } from '../../data/departments';
import styles from './CategoryList.module.scss';

interface CategoryListProps {
  activeId: DepartmentId;
  onSelect: (id: DepartmentId) => void;
}

export function CategoryList({ activeId, onSelect }: CategoryListProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: DepartmentId) {
    // Sem destino de página: só troca a categoria selecionada.
    event.preventDefault();
    onSelect(id);
  }

  return (
    <section className={styles.section} aria-labelledby="category-list-title">
      <h2 className={styles.visuallyHidden} id="category-list-title">
        Compre por categoria
      </h2>

      <div className={styles.list}>
        {departments.map((department) => {
          const isActive = department.id === activeId;

          return (
            <a
              className={`${styles.item} ${isActive ? styles.active : ''}`}
              href="#"
              aria-current={isActive ? 'true' : undefined}
              onClick={(event) => handleClick(event, department.id)}
              key={department.id}
            >
              <span className={styles.tile}>
                <img src={department.icon} alt="" />
              </span>
              <span className={styles.label}>{department.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
