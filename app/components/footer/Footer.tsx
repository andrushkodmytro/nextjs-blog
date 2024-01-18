import Link from 'next/link';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='wrapper'>
        <div className={styles.footerBottom}>
          <Link className={styles.logo} href='/'>
            WebBlog
          </Link>

          <div className={styles.policiesContainer}>
            <Link href='/terms'>Terms of Use</Link>
            <Link href='/privacy'>Privacy Policy</Link>
          </div>
        </div>

        <div className={styles.yearBlock}>
          <span>&copy; {new Date().getFullYear()} Ukraine</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
