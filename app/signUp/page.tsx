'use client';
import React, { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import styles from './signUp.module.css';
import TextField from '@/app/components/ui/textField/TextField';
import Button from '@/app/components/ui/button/Button';

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
        <TextField placeholder='First name' />
        <TextField placeholder='Last name' />
        <TextField placeholder='email' />
        <TextField placeholder='User image url' />
        <TextField placeholder='password' />
        <TextField placeholder='password confirmation' />
        <div className={styles.btnsContainer}>
          <Button type='button' color='secondary' variant='outlined'>Back</Button>
          <Button type='submit'>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
