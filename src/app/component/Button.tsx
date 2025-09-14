import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset';
};


export default function Button({href, onClick, children, className = '', disabled = false, isLoading = false, loadingText, type = 'button' }: ButtonProps) {
  const baseClassName = "px-3 py-2 font-label rounded-md text-center cursor-pointer flex items-center justify-center";
  const isDisabled = disabled || isLoading;

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-5 w-5 text-current" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if(href && !isDisabled){
    return (
    <Link href={href} className={`${baseClassName} ${className}`}>
      {children}
    </Link>
  );
  }

  return(
    <button 
      type={type}
      onClick={onClick} 
      className={`${baseClassName} ${className} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isDisabled}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          {loadingText && <span className="ml-2">{loadingText}</span>}
        </>
      ) : children}
    </button>
  );
}