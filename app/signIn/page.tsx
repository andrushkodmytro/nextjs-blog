'use client';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { Formik, FormikHelpers } from 'formik';
import Button from '@/app/components/ui/button/Button';
import FormTextField from '@/app/components/ui/formTextField/FormTextField';
import Link from 'next/link';
import { signInScheme } from './validation';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './signIn.module.scss';

type Values = Yup.InferType<typeof signInScheme>;

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (
    { username, password }: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    const res = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
    });

    if (res?.ok) {
      router.push(searchParams.get('callbackUrl') || '/');
    } else {
      setErrors({ username: 'Credentials do not match' });
    }
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
          validationSchema={signInScheme}
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
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  disabled={isSubmitting}
                >
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
