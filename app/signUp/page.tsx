'use client';
import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import FormTextField from '@/app/components/ui/formTextField/FormTextField';
import Button from '@/app/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { userRegistrationFormScheme } from './validation';
import styles from './signUp.module.scss';

type Values = Yup.InferType<typeof userRegistrationFormScheme>;

const SignUp = () => {
  const router = useRouter();

  const onSubmit = async (
    { confirmPassword, ...rest }: Values,
    { setErrors }: FormikHelpers<Values>
  ) => {
    const url = `/api/users`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ ...rest }),
    });

    if (res.status === 422) {
      const { errors } = await res.json();
      setErrors(errors);
    }

    if (res.status === 201) {
      router.push(`/signIn`);
    }
  };

  return (
    <div className={styles.signInPage}>
      <div className={styles.container}>
        <h1>Sign Up</h1>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            img: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={userRegistrationFormScheme}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <>
                <form
                  className={styles.form}
                  id='register'
                  onSubmit={handleSubmit}
                >
                  <FormTextField label='First name' name='firstName' />
                  <FormTextField label='Last name' name='lastName' />
                  <FormTextField label='Email' name='email' />
                  <FormTextField label='User image url' name='img' />
                  <FormTextField label='Password' name='password' />
                  <FormTextField
                    label='Password confirmation'
                    name='confirmPassword'
                  />
                </form>
                <div className={styles.btnsContainer}>
                  <Button type='button' color='secondary' variant='outlined'>
                    Back
                  </Button>
                  <Button type='submit' form='register' disabled={isSubmitting}>
                    Register
                  </Button>
                </div>
              </>
            );
          }}
        </Formik>

        <p className={styles.bottomText}>
          Don&apos;t have an account? <Link href='/signIn'>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
