import React from 'react';

import clsxm from '@/lib/clsxm';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  onClick?: () => void;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  placeholderTextColor?: string;
  value?: string | number;
  required?: boolean;
  explanation?: string;
}

const CustomInput: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  type = 'text',
  disabled,
  placeholder,
  onChange,
  onClick,
  required,
  value,
  explanation,
  ...rest
}) => {
  return (
    <div
      className={clsxm(`flex flex-col space-y-1`, containerStyle)}
      onClick={onClick}
    >
      {label && (
        <label
          className={clsxm(
            'flex items-center justify-start text-sm text-gray-600',
            labelStyle
          )}
        >
          {label}
          {required && <span className='text-primary'>*</span>}
        </label>
      )}
      <div className='relative'>
        {leftIcon && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
            {leftIcon}
          </div>
        )}
        <input
          className={clsxm(
            'form-input block w-full border-slate-300 px-3 sm:text-sm sm:leading-5',
            leftIcon ? 'pl-7' : '',
            rightIcon ? 'pr-12' : '',
            inputStyle,
            disabled ? 'bg-gray-100' : 'bg-white'
          )}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onClick={() => {
            console.log('input clicked');
          }}
          value={value}
          {...rest}
        />
        {rightIcon && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
            {rightIcon}
          </div>
        )}
      </div>
      {explanation && <p className='text-xs text-gray-500'>{explanation}</p>}
    </div>
  );
};

export default CustomInput;
