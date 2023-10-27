import * as Yup from 'yup';

export const userRegistrationScheme = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  img: Yup.string()
    .min(2, 'User image is required')
    .max(500, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password is required')
    .max(50, 'Too Long!')
    .required('Password is required'),
});
