import type { ShowcaseTab } from '../../data/showcaseTabs';
import styles from './CategoryTabs.module.scss';

interface CategoryTabsProps {
  tabs: ShowcaseTab[];
  activeId: string;
  onChange: (tab: ShowcaseTab) => void;
}

export function CategoryTabs({ tabs, activeId, onChange }: CategoryTabsProps) {
  return (
    <div className={styles.tabs} role="group" aria-label="Categorias de produtos">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            type="button"
            key={tab.id}
            aria-pressed={isActive}
            onClick={() => onChange(tab)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
