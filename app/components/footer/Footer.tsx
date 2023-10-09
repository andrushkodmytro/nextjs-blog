import Image from 'next/image';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='wrapper'>
        <div></div>
        <div className={styles.footerBottom}>
          <Image src='/logo.svg' height={40} width={135} alt='Logo' />
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
