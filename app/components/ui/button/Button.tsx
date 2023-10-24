import React from 'react';
import styles from './button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary';
  variant?: 'text' | 'contained' | 'outlined';
};

const colors = {
  primary: 'Primary',
  secondary: 'Secondary',
};

const variants = {
  text: 'btnText',
  contained: 'btnContained',
  outlined: 'btnOutlined',
};

const Button = ({
  variant = 'contained',
  color = 'primary',
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[variants[variant] + colors[color]]} ${className}`}
      {...rest}
    >
      {rest.children}
    </button>
  );
};

export default Button;
