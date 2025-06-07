import React from 'react';
import Link from 'next/link';

type RadioButtonProps = {
  label: string;
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
};


export default function Button({
  label, 
  name='radio',  
  value = '', 
  checked = false,
  onChange,
  className = '' 
}: RadioButtonProps) {
  return (
    <label className={`
                      flex items-center gap-2 w-fit cursor-pointer mb-2 
                      p-3 w-full bg-white rounded-md border border-stone-300
                      transition-colors duration-150
                      has-[:checked]:border-primary-700
                      has-[:checked]:bg-primary-50
                      ${className}
                    `}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
                            appearance-none
                            w-5 h-5
                            rounded-full
                            border-1 border-stone-300
                            checked:border-[6px] checked:border-primary-700
                            transition-all duration-150
                            peer
                  `}
      />
      {label}
    </label>
  );
}