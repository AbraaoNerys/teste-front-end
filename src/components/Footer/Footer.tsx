import econverseLogo from '../../assets/logo/econverse.svg';
import facebookIcon from '../../assets/icones/facebook.svg';
import instagramIcon from '../../assets/icones/instagram.svg';
import linkedinIcon from '../../assets/icones/linkedin.svg';
import styles from './Footer.module.scss';

interface FooterColumn {
  title: string;
  items: string[];
  font: 'work-sans' | 'poppins';
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Institucional',
    items: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'],
    font: 'work-sans',
  },
  {
    title: 'Ajuda',
    items: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'],
    font: 'work-sans',
  },
  {
    title: 'Termos',
    items: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'],
    font: 'poppins',
  },
];

const socialLinks = [
  { label: 'Instagram', icon: instagramIcon },
  { label: 'Facebook', icon: facebookIcon },
  { label: 'LinkedIn', icon: linkedinIcon },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mainFooter}>
        <div className={styles.inner}>
          <div className={styles.company}>
            <div className={styles.companyDetails}>
              <a
                className={styles.logoLink}
                href="#"
                onClick={(event) => event.preventDefault()}
              >
                <img src={econverseLogo} alt="Econverse" />
              </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className={styles.socials}>
              {socialLinks.map((social) => (
                <a
                  className={styles.socialLink}
                  href="#"
                  aria-label={social.label}
                  key={social.label}
                  onClick={(event) => event.preventDefault()}
                >
                  <img src={social.icon} alt="" />
                </a>
              ))}
            </div>
          </div>

          <span className={styles.divider} aria-hidden="true" />

          <nav className={styles.navigation} aria-label="Rodapé">
            {footerColumns.map((column) => (
              <div className={styles.navigationColumn} key={column.title}>
                <h2>{column.title}</h2>
                <ul className={styles[column.font]}>
                  {column.items.map((item) => (
                    <li key={item}>
                      <a href="#" onClick={(event) => event.preventDefault()}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </footer>
  );
}
