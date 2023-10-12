'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './authLinks.module.css'

const AuthLinks = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  if (session) {
    return (
      <button className={styles.link} onClick={() => signOut({ redirect: false, callbackUrl: '/' })}>
        Logout
      </button>
    );
  }

  return <button className={styles.link} onClick={() => signIn()}>Login</button>;
};

export default AuthLinks;
