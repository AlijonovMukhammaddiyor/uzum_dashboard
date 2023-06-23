import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

type ButtonProps = {
  isLoading?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
  className?: string;
  spinnerColor?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      spinnerColor,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'flex items-center justify-center rounded-sm px-4 py-2',
          'shadow-sm',
          'transition-colors duration-75',
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
          disabled && 'bg-gray-300 text-gray-500 hover:bg-gray-300'
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': spinnerColor === 'white',
                'text-black': spinnerColor === 'black',
                'text-primary': spinnerColor === 'primary',
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {LeftIcon && (
          <div className={clsxm()}>
            <LeftIcon className={clsxm(leftIconClassName)} />
          </div>
        )}
        {children}
        {RightIcon && (
          <div className={clsxm(rightIconClassName)}>
            <RightIcon className={clsxm(rightIconClassName)} />
          </div>
        )}
      </button>
    );
  }
);

export default Button;
