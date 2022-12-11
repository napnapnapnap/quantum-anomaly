import clsx from 'clsx';

import './Inputs.scss';

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  isInline?: boolean;
  labelClassName?: string;
  className?: string;
  isDisabled?: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({
  label,
  name,
  checked,
  isInline,
  labelClassName,
  className,
  isDisabled,
  handleInputChange,
}: CheckboxProps) {
  return (
    <label
      className={clsx('input-control input-control--checkbox text--capitalize', labelClassName, {
        'input-control--with-label': label,
        'input-control--inline': isInline,
        'input-control--disabled': isDisabled,
      })}
    >
      <input
        type="checkbox"
        name={name}
        className={clsx('checkbox', className)}
        disabled={isDisabled}
        onChange={handleInputChange}
        checked={checked}
      />
      {label && <span className="input-control__checkbox-text">{label}</span>}
    </label>
  );
}

export default Checkbox;
