import React from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  valeu?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  id,
  label,
  error,
  placeholder = '', 
  className = '', 
  value,
  onChange,
  ...rest
}: TextAreaProps){
  return(
    <div>
      <label htmlFor={id} className="block font-body mb-1">
        {label}
      </label>
      <textarea 
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={`
          p-2 min-h-32 block w-full rounded-md border bg-stone-50 border-stone-300 shadow-xs 
          focus:border-primary-500 focus:outline focus:outline-primary-500 
          invalid:border-pink-500 invalid:text-pink-600 
          placeholder-shown:invalid:border-stone-200 placeholder-shown:invalid:text-gray-900
          align-top resize-none
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