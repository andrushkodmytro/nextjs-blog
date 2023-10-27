import * as Yup from 'yup';

export const signInScheme = Yup.object().shape({
  username: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Password is required'),
});
