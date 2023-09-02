import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

import clsxm from '@/lib/clsxm';

interface FilterProps {
  className?: string;
  value: string[];
  type: string;
  setValues: (type: string, values: string[]) => void;
}

function TextFilter({ type, className, setValues, value }: FilterProps) {
  const { t, i18n } = useTranslation('common');
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      setValues(type, [...value, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    const updatedValues = value.filter((val) => val !== keyword);
    setValues(type, updatedValues);
  };

  return (
    <div className={clsxm('w-full', className)}>
      <div className='flex w-full flex-wrap items-center justify-start gap-3'>
        {value?.map((keyword, index) => (
          <div
            key={index}
            className='flex items-center rounded border px-3 py-1'
          >
            <span>{keyword}</span>
            <button
              className='ml-2'
              onClick={() => handleRemoveKeyword(keyword)}
            >
              <RiCloseLine className='h-4 w-4 text-red-500' />
            </button>
          </div>
        ))}
        <input
          type='text'
          value={inputValue}
          placeholder={
            i18n.language === 'ru'
              ? 'введите текст и нажмите Enter'
              : "so'zni kiriting va Enter tugmasini bosing"
          }
          className='h-8 w-[300px] placeholder:text-sm placeholder:text-slate-400'
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default TextFilter;
