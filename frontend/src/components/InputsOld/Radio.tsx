import clsx from 'clsx';
import React from 'react';

interface RadioProps {
  name: string;
  value: string;
  options: { value: string; label: string; isDisabled?: boolean }[];
  labelClassName?: string;
  inputClassName?: string;
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Radio({
  name,
  value,
  options,
  labelClassName,
  inputClassName,
  className,
  isDisabled,
  isRequired,
  handleInputChange,
}: RadioProps) {
  return (
    <div className="input-radio-group">
      {options.map((option, index) => (
        <label
          key={option.value}
          className={clsx('old-input-control old-input-control--radio', className, {
            'old-input-control--with-label': option.label,
            'old-input-control--disabled': option.isDisabled,
          })}
        >
          <input
            id={`radio-${name}-value-${option.value}`}
            aria-label={`radio-${name}-value-${option.value}`}
            name={name}
            type="radio"
            value={option.value}
            className={clsx('radio', inputClassName)}
            checked={option.value === value}
            disabled={option.isDisabled}
            onChange={isDisabled ? () => {} : handleInputChange}
          />
          {option.label && (
            <span className={clsx('old-input-control__radio-text', labelClassName)}>
              {option.label} {isRequired && ' *'}
            </span>
          )}
        </label>
      ))}
    </div>
  );
}

export default Radio;
