import React from 'react';

type Props = {
  checked: boolean;
  intermediate?: boolean;
  onChange?: () => void;
  className?: string;
};

function CustomCheckbox({
  intermediate = false,
  checked,
  onChange,
  className,
}: Props) {
  return (
    <div
      className={`custom-checkbox min-h-5 min-w-5 max-w-5 relative h-5 max-h-5 w-5 shrink-0 rounded border-2 ${
        className || ''
      } 
      ${
        checked || intermediate
          ? checked
            ? 'border-blue-500 bg-blue-500'
            : 'border-4 border-white bg-blue-500'
          : 'border-gray-400 bg-white'
      } 
      
      cursor-pointer`}
      onClick={onChange}
    >
      {checked && !intermediate && (
        <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white'>
          &#10003;
        </span>
      )}
    </div>
  );
}

export default CustomCheckbox;
