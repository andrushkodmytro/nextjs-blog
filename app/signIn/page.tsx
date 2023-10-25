'use client';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { Formik } from 'formik';
import Button from '@/app/components/ui/button/Button';
import styles from './signIn.module.css';
import FormTextField from '@/app/components/ui/formTextField/FormTextField';
import Link from 'next/link';

const validateScheme = Yup.object().shape({
  username: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  username: string;
  password: string;
}

const SignIn = () => {
  const onSubmit = ({ username, password }: Values) => {
    const result = signIn('credentials', {
      username: username,
      password: password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className={styles.signInPage}>
      <div className={styles.container}>
        <h1>Sign In</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={validateScheme}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <FormTextField label='Email' name='username' />
              <FormTextField label='Password' name='password' />
              <div className={styles.btnsContainer}>
                <Button type='button' color='secondary' variant='outlined'>
                  Back
                </Button>
                <Button type='submit' color='primary' variant='contained'>
                  Login
                </Button>
              </div>
            </form>
          )}
        </Formik>

        <p className={styles.bottomText}>
          Don&apos;t have an account? <Link href='/signUp'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
