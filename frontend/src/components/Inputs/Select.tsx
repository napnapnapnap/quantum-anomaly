import clsx from 'clsx';

import './Inputs.scss';

interface SelectProps {
  label?: string;
  value: string | undefined;
  options: { value: string | number; label: string }[];
  defaultValue?: string;
  name: string;
  formError?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  labelClassName?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  hint?: string;
}

export default function Select({
  label,
  value,
  options,
  defaultValue,
  name,
  formError,
  autoFocus,
  placeholder,
  handleInputChange,
  className,
  labelClassName,
  isRequired,
  isDisabled,
  hint,
}: SelectProps) {
  return (
    <label
      className={clsx('input-control input-control--select', labelClassName, {
        'input-control--with-label': label,
        'input-control--with-hint': hint,
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
          className={clsx('select', className)}
          value={value}
          onChange={handleInputChange}
          disabled={isDisabled}
          required={isRequired}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
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
        {hint && <span className="input-control__hint">{hint}</span>}
      </div>
    </label>
  );
}
