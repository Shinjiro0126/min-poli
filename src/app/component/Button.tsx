import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};


export default function Button({href, onClick, children, className = '', disabled = false }: ButtonProps) {
  const baseClassName = "px-3 py-2 font-label rounded-md text-center cursor-pointer";

  if(href){
    return (
    <Link href={href} className={`${baseClassName} ${className}`}>
      {children}
    </Link>
  );
  }

  return(
    <button 
      onClick={onClick} 
      className={`${baseClassName} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}