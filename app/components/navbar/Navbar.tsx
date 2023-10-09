import Image from 'next/image';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { authConfig } from '@/configs/auth';
import LogIn from '../logIn/LogIn';
import styles from './navbar.module.css';

const menuItems = [{ label: 'Home', href: '/' }];

const Navbar = async () => {
  const session = await getServerSession(authConfig);

  return (
    <header className={styles.navbar}>
      <div className='wrapper'>
        <div className={styles.container}>
          <Image src='/logo.svg' width={158} height={40} alt='Logo' />
          <nav className={styles.nav}>
            {menuItems.map(({ label, href }, index) => {
              return (
                <Link key={index} href={href}>
                  {label}
                </Link>
              );
            })}

            {session && <Link href='/add-post'>Write</Link>}
            <LogIn />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
