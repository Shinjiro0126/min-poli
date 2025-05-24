import React from "react";

export interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export default function TextBox({
  id,
  label,
  error,
  placeholder = '', 
  className = '', 
  ...rest
}: TextBoxProps){
  return(
    <div>
      <label htmlFor="{id}" className="block font-body mb-1">
        {label}
      </label>
      <input 
        id={id}
        aria-invalid={Boolean(error)}
        className={`
          p-2 h-11 block w-full rounded-md border bg-stone-50 border-stone-200 shadow-xs 
          focus:border-primary-500 focus:outline focus:outline-primary-500 
          invalid:border-pink-500 invalid:text-pink-600 
          placeholder-shown:invalid:border-stone-200 placeholder-shown:invalid:text-gray-900
          ${className}
          `}
        placeholder={placeholder}
        {...rest}
      />
      {error && (
        <p className="mt-1 font-body text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}