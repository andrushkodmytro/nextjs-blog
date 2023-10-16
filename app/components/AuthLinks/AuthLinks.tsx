'use client';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './authLinks.module.css';
import Link from 'next/link';

const menuItems = [{ label: 'Home', href: '/' }];

const AuthLinks = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  return (
    <>
      <nav className={styles.nav}>
        {menuItems.map(({ label, href }, index) => {
          return (
            <Link key={index} href={href}>
              {label}
            </Link>
          );
        })}

        {status === 'unauthenticated' ? (
          <button className={styles.link} onClick={() => signIn()}>
            Login
          </button>
        ) : (
          <>
            <Link href='/add-post'>Write</Link>

            <button
              className={styles.link}
              onClick={() => signOut({ redirect: false, callbackUrl: '/' })}
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <nav className={styles.navMobile}>
        <div className={styles.burger} onClick={() => setOpen(!open)}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>

        {open && (
          <div className={styles.responsiveMenu}>
            {status === 'unauthenticated' ? (
              <>
                {menuItems.map(({ label, href }, index) => {
                  return (
                    <Link key={index} href={href}>
                      {label}
                    </Link>
                  );
                })}

                <button className={styles.mobLink} onClick={() => signIn()}>
                  Login
                </button>
              </>
            ) : (
              <>
                {menuItems.map(({ label, href }, index) => {
                  return (
                    <Link key={index} href={href}>
                      {label}
                    </Link>
                  );
                })}

                <Link href='/add-post'>Write</Link>

                <button
                  className={styles.mobLink}
                  onClick={() => signOut({ redirect: false, callbackUrl: '/' })}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default AuthLinks;
