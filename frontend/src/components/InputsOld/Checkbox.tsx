import clsx from 'clsx';
import React from 'react';

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  inputClassName?: string;
  className?: string;
  labelClassName?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({
  label,
  name,
  checked,
  inputClassName,
  labelClassName,
  className,
  isDisabled,
  isRequired,
  handleInputChange,
}: CheckboxProps) {
  return (
    <label
      className={clsx('old-input-control old-input-control--checkbox', className, {
        'old-input-control--with-label': label,
        'old-input-control--disabled': isDisabled,
      })}
    >
      <input
        id={`checkbox-${name}`}
        name={name}
        type="checkbox"
        className={clsx('checkbox', inputClassName)}
        checked={checked}
        disabled={isDisabled}
        onChange={isDisabled ? () => {} : handleInputChange}
        required={isRequired}
      />
      {label && (
        <span className={clsx('old-input-control__checkbox-text', labelClassName)}>
          {label} {isRequired && ' *'}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
