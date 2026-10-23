import type { Category } from '../types/product';

export interface ShowcaseTab {
  id: string;
  label: string;
  category: Category | null;
}

export const showcaseTabs: ShowcaseTab[] = [
  { id: 'celular', label: 'Celular', category: 'celular' },
  { id: 'acessorios', label: 'Acessórios', category: 'acessorios' },
  { id: 'tablets', label: 'Tablets', category: 'tablets' },
  { id: 'notebooks', label: 'Notebooks', category: 'notebooks' },
  { id: 'tvs', label: 'TVs', category: 'tvs' },
  { id: 'todos', label: 'Ver todos', category: null },
];
