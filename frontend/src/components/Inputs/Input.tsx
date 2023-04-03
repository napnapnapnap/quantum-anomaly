import clsx from 'clsx';
import React, { useRef, useState } from 'react';

import './Inputs.scss';

interface InputProps {
  label?: string;
  type: 'text' | 'number' | 'email' | 'password';
  value: string | number | undefined;
  defaultValue?: string;
  name: string;
  formError?: boolean;
  autoFocus?: boolean;
  placeholder?: string | null;
  min?: number;
  max?: number;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  className?: string;
  iconName?: string | null;
  isRequired?: boolean | null;
  isDisabled?: boolean;
}

export default function Input({
  label,
  type,
  value,
  defaultValue,
  name,
  formError,
  handleInputChange,
  placeholder,
  min,
  max,
  autoFocus,
  inputClassName,
  className,
  iconName,
  isRequired,
  isDisabled,
}: InputProps) {
  const [showPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label
      className={clsx('input-control', className, {
        'input-control--with-label': label,
        'input-control--with-icon': iconName,
        'input-control--error': formError,
        'input-control--disabled': isDisabled,
      })}
    >
      {label && <span className="input-control__text">{label}</span>}
      <div className="input-control__inner">
        <input
          ref={inputRef}
          id={`input-${name}`}
          name={name}
          className={clsx('input', inputClassName)}
          autoFocus={autoFocus}
          type={showPassword ? 'text' : type}
          placeholder={placeholder || ''}
          disabled={isDisabled}
          onChange={isDisabled ? () => {} : handleInputChange}
          value={value !== undefined && value !== null ? value : ''}
          min={min}
          max={max}
          defaultValue={defaultValue}
          aria-label={name}
          required={isRequired || false}
        />
      </div>
    </label>
  );
}
