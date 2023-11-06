import Link from 'next/link';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='wrapper'>
        <div></div>
        <div className={styles.footerBottom}>
          <Link className={styles.logo} href='/'>
            WebBlog
          </Link>

          <div className={styles.policiesContainer}>
            <div>Terms of Use</div>
            <div>Terms of Use</div>
            <div>Terms of Use</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
