import type { FormEvent, MouseEvent } from 'react';
import logo from '../../assets/logo/econverse.svg';
import shieldCheck from '../../assets/icones/shield-check.svg';
import truck from '../../assets/icones/truck.svg';
import creditCard from '../../assets/icones/credit-card.svg';
import pedidos from '../../assets/icones/pedidos.svg';
import heart from '../../assets/icones/heart.svg';
import userCircle from '../../assets/icones/user-circle.svg';
import shoppingCart from '../../assets/icones/shopping-cart.svg';
import magnifyingGlass from '../../assets/icones/magnifying-glass.svg';
import crownSimple from '../../assets/icones/crown-simple.svg';
import styles from './Header.module.scss';

interface HeaderAction {
  label: string;
  icon: string;
  orders?: boolean;
}

interface NavigationItem {
  label: string;
  active?: boolean;
  icon?: string;
}

const headerActions: HeaderAction[] = [
  { label: 'Pedidos', icon: pedidos, orders: true },
  { label: 'Favoritos', icon: heart },
  { label: 'Minha conta', icon: userCircle },
  { label: 'Carrinho', icon: shoppingCart },
];

const navigationItems: NavigationItem[] = [
  { label: 'Todas Categorias' },
  { label: 'Supermercado' },
  { label: 'Livros' },
  { label: 'Moda' },
  { label: 'Lançamentos' },
  { label: 'Ofertas do dia', active: true },
  { label: 'Assinatura', icon: crownSimple },
];

function preventNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}

export function Header() {
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <ul className={styles.benefits}>
            <li>
              <img src={shieldCheck} alt="" />
              <span>
                Compra <strong>100% segura</strong>
              </span>
            </li>
            <li>
              <img src={truck} alt="" />
              <span>
                <strong>Frete grátis</strong> acima de R$ 200
              </span>
            </li>
            <li>
              <img src={creditCard} alt="" />
              <span>
                <strong>Parcele</strong> suas compras
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.mainRow}>
          <a className={styles.logo} href="#" onClick={preventNavigation}>
            <img src={logo} alt="Econverse" />
          </a>

          <form className={styles.search} role="search" onSubmit={handleSearch}>
            <label className={styles.visuallyHidden} htmlFor="header-search">
              Buscar produtos
            </label>
            <input
              id="header-search"
              type="search"
              placeholder="O que você está buscando?"
            />
            <button type="submit" aria-label="Buscar">
              <img src={magnifyingGlass} alt="" />
            </button>
          </form>

          <div className={styles.actions}>
            {headerActions.map((action) => (
              <button
                className={`${styles.iconButton} ${action.orders ? styles.orders : ''}`}
                type="button"
                aria-label={action.label}
                key={action.label}
              >
                <img src={action.icon} alt="" />
              </button>
            ))}
          </div>
        </div>

        <nav className={styles.navigation} aria-label="Principal">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.label}>
                <a
                  className={item.active ? styles.activeLink : undefined}
                  href="#"
                  aria-current={item.active ? 'page' : undefined}
                  onClick={preventNavigation}
                >
                  {item.icon && <img src={item.icon} alt="" />}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
