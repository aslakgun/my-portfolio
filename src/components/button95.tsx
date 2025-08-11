import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Button95Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
}

const Button95: React.FC<Button95Props> = ({ 
  children, 
  primary = false, 
  className = "",
  ...props 
}) => {
  const buttonClass = `btn-95 ${primary ? 'btn-primary' : ''} ${className}`;
  
  return (
    <button 
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button95;