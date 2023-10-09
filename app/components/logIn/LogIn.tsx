'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

const LogIn = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  if (session) {
    return (
      <button onClick={() => signOut({ redirect: false, callbackUrl: '/' })}>
        Logout
      </button>
    );
  }

  return <button onClick={() => signIn()}>Login</button>;
};

export default LogIn;
