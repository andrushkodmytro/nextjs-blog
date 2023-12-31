'use client';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './authLinks.module.scss';

const menuItems = [{ label: 'Home', href: '/' }];

const AuthLinks = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  const searchParams = new URLSearchParams(`callbackUrl=${pathname}`);

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
          <Link href={`/signIn?${searchParams}`} className={styles.link}>
            Login
          </Link>
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
