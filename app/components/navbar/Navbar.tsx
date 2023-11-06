import Link from 'next/link';
import AuthLinks from '../AuthLinks/AuthLinks';
import styles from './navbar.module.scss';
import ThemeToggle from '../themeToggle/ThemeToggle';

const Navbar = async () => {
  return (
    <header className={styles.navbar}>
      <div className='wrapper'>
        <div className={styles.container}>
          <Link className={styles.logo} href='/'>
            WebBlog
          </Link>
          <ThemeToggle />

          <AuthLinks />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
