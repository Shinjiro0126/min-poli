import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};


export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-stone-300 rounded-md p-4 ${className}`}>
      {children}
    </div>
  );
}