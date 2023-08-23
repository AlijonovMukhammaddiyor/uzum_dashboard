import { useTranslation } from 'next-i18next';
import React from 'react';

import clsxm from '@/lib/clsxm';

interface FilterProps {
  className?: string;
  value: string | null;
  type: string;
  setValues: (type: string, value: string | null) => void;
}

function TextFilter({ type, className, setValues, value }: FilterProps) {
  const { t, i18n } = useTranslation('common');

  return (
    <div className={clsxm('w-full', className)}>
      <div className='flex w-full items-center gap-3'>
        {i18n.language === 'ru' && <p>включает</p>}
        <input
          type='text'
          min={0}
          value={value ?? undefined}
          placeholder='введите текст'
          className='w-[500px] placeholder:text-slate-300'
          onChange={(e) => {
            setValues(type, e.target.value ?? null);
          }}
        />
        {i18n.language === 'uz' && <p>ni o'z ichiga oladi</p>}
      </div>
    </div>
  );
}

export default TextFilter;
