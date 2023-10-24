'use client';
import React, { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import styles from './signUp.module.css';

const SignUp = () => {
  const [error, setError] = useState('');
  const userName = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordComfirmation = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.current?.value || !password.current?.value) {
      setError('User name and email is require');

      return;
    }

    await signIn('credentials', {
      username: userName.current?.value,
      password: password.current?.value,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className={styles.signInPage}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input placeholder='First name' ref={userName} />
        <input placeholder='Last name' ref={userName} />
        <input placeholder='email' ref={userName} />
        <input placeholder='User image' ref={userName} />
        <input placeholder='password' ref={password} />
        <input placeholder='password confirmation' ref={passwordComfirmation} />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default SignUp;
