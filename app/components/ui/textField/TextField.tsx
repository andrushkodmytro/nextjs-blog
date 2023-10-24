import React from 'react';
import styles from './textField.module.css';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const TextField = ({ label, error, ...rest }: TextFieldProps) => {
  return (
    <div
      className={`${styles.textField} ${error ? styles.errorTextField : ''} ${
        rest.disabled ? styles.disabled : ''
      }`}
    >
      {label && <label htmlFor={'name'}>{label}</label>}

      <input className={styles.input} id='name' type='text' {...rest} />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default TextField;
