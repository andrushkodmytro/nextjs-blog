'use client';
import { signIn } from 'next-auth/react';
import React, { useState, useRef } from 'react';
import Button from '@/app/components/ui/button/Button';
import TextField from '@/app/components/ui/textField/TextField';
import styles from './signIn.module.css';

const SignIn = () => {
  const [error, setError] = useState('');
  const userName = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.current?.value || !password.current?.value) {
      setError('User name and email is require');

      return;
    }

    const result = await signIn('credentials', {
      username: userName.current?.value,
      password: password.current?.value,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className={styles.signInPage}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1>Sign In</h1>
        {error && <p className={styles.error}>{error}</p>}
        <TextField label='Email' />
        <TextField label='Password' />
        <div className={styles.btnsContainer}>
          <Button type='button' color='secondary' variant='outlined'>
            Back
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
