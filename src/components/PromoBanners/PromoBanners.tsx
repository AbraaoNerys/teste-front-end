import bannerImage from '../../assets/imagens/banner-parceiros.jpg';
import styles from './PromoBanners.module.scss';

interface PromoBanner {
  id: number;
  title: string;
  description: string;
  callToAction: string;
}

const banners: PromoBanner[] = [
  {
    id: 1,
    title: 'Parceiros',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    callToAction: 'Confira',
  },
  {
    id: 2,
    title: 'Parceiros',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    callToAction: 'Confira',
  },
];

export function PromoBanners() {
  return (
    <ul className={styles.banners}>
      {banners.map((banner) => (
        <li className={styles.banner} key={banner.id}>
          <img className={styles.image} src={bannerImage} alt="" />
          <span className={styles.overlay} aria-hidden="true" />
          <p className={styles.title}>{banner.title}</p>
          <p className={styles.description}>{banner.description}</p>
          <a
            className={styles.callToAction}
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            {banner.callToAction}
          </a>
        </li>
      ))}
    </ul>
  );
}
