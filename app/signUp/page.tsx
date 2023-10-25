'use client';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import FormTextField from '@/app/components/ui/formTextField/FormTextField';
import Button from '@/app/components/ui/button/Button';
import styles from './signUp.module.css';

const validateScheme = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  img: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  password: string;
}

const SignUp = () => {
  const onSubmit = (values: Values) => {
    console.log(values);
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
          validationSchema={validateScheme}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
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
            );
          }}
        </Formik>
        <div className={styles.btnsContainer}>
          <Button type='button' color='secondary' variant='outlined'>
            Back
          </Button>
          <Button type='submit' form='register'>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
