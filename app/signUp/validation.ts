import * as Yup from 'yup';
import { userRegistrationScheme } from '@/app/api/users/validation';

export const userRegistrationFormScheme = userRegistrationScheme.shape({
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});
