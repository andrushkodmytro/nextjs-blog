import React from 'react';
import { useField } from 'formik';
import TextField from '@/app/components/ui/textField/TextField';

type FormTextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

const FormTextField = ({
  name,
  type,
  multiple,
  value,
  ...props
}: FormTextFieldProps) => {
  const [field, meta] = useField({ name, type, multiple, value });

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && meta.error ? meta.error : undefined}
    />
  );
};

export default FormTextField;
