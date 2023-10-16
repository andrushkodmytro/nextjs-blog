import Image from 'next/image';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { authConfig } from '@/configs/auth';
import AuthLinks from '../AuthLinks/AuthLinks';
import styles from './navbar.module.css';
import ThemeToggle from '../themeToggle/ThemeToggle';

const Navbar = async () => {
  const session = await getServerSession(authConfig);

  return (
    <header className={styles.navbar}>
      <div className='wrapper'>
        <div className={styles.container}>
          <Image src='/logo.svg' width={158} height={40} alt='Logo' />
          <ThemeToggle />

          <AuthLinks />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
