import React, { useId } from 'react';
import styles from './textField.module.scss';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const TextField = ({ label, error, ...rest }: TextFieldProps) => {
  const inputId = useId();
  return (
    <div
      className={`${styles.textField} ${error ? styles.errorTextField : ''} ${
        rest.disabled ? styles.disabled : ''
      }`}
    >
      {label && <label htmlFor={inputId}>{label}</label>}

      <input className={styles.input} id={inputId} type='text' {...rest} />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default TextField;
