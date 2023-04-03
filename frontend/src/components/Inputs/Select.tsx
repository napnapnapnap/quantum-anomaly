import clsx from 'clsx';
import React from 'react';

import './Inputs.scss';

interface SelectProps {
  label?: string;
  value: string | undefined;
  options: { value: string | number; label: string }[];
  defaultValue?: string;
  name: string;
  formError?: boolean;
  autoFocus?: boolean;
  placeholder?: string | null;
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  inputClassName?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export default function Select({
  label,
  value,
  options,
  name,
  formError,
  autoFocus,
  placeholder,
  handleInputChange,
  className,
  inputClassName,
  isRequired,
  isDisabled,
}: SelectProps) {
  return (
    <label
      className={clsx('input-control input-control--select', className, {
        'input-control--with-label': label,
        'input-control--error': formError,
        'input-control--disabled': isDisabled,
        'input-control--none-selected': value === undefined && placeholder,
      })}
    >
      {label && <span className="input-control__text">{label}</span>}
      <div className="input-control__inner">
        <select
          id={`select-${name}`}
          name={name}
          className={clsx('select', inputClassName)}
          value={value}
          onChange={handleInputChange}
          disabled={isDisabled}
          required={isRequired}
          autoFocus={autoFocus}
          defaultValue={value ? undefined : ''}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
