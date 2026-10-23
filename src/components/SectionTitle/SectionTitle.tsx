import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  id: string;
  title: string;
  showSeeAll?: boolean;
}

export function SectionTitle({ id, title, showSeeAll = false }: SectionTitleProps) {
  return (
    <header className={styles.titleBlock}>
      <div className={styles.titleRow}>
        <span className={styles.line} aria-hidden="true" />
        <h2 className={styles.title} id={id}>
          {title}
        </h2>
        <span className={styles.line} aria-hidden="true" />
      </div>

      {showSeeAll && (
        <a
          className={styles.seeAll}
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          Ver todos
        </a>
      )}
    </header>
  );
}
