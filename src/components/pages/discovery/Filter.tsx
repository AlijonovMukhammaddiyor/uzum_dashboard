import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

import clsxm from '@/lib/clsxm';

import { RenderAlert } from '@/components/shared/AlertComponent';

interface FilterProps {
  title: string;
  description?: string;
  className?: string;
  min: number | null;
  max: number | null;
  type: string;
  isDisabled?: boolean;
  setValues: (type: string, min: number | null, max: number | null) => void;
}

function Filter({
  title,
  type,
  className,
  setValues,
  min,
  max,
  isDisabled,
}: FilterProps) {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.addEventListener('wheel', function (event) {
      if (
        document.activeElement &&
        (document.activeElement as HTMLInputElement).type === 'number' &&
        document.activeElement.classList.contains('noscroll')
      ) {
        (document.activeElement as HTMLInputElement).blur();
      }
    });
  }, []);

  return (
    <div className={clsxm('w-[340px]', className)}>
      <div className='mb-2 flex items-center justify-start gap-2 font-semibold'>
        <p className='text-sm'>{title}</p>
        {/* <LiaQuestionCircleSolid className='h-5 w-5 cursor-pointer text-blue-700' /> */}
      </div>
      <div className='flex w-full items-center gap-3'>
        <input
          type='number'
          min={0}
          value={min !== null ? min : ''}
          placeholder='Min'
          className='noscroll ring-none active:ring-none h-8 w-[120px] appearance-none rounded-none border border-slate-700 outline-none focus:ring-0'
          onChange={(e) => {
            if (isDisabled) {
              return;
            }
            setValues(type, Number(e.target.value), max);
          }}
          onClick={() => {
            if (isDisabled)
              RenderAlert({
                alertTitle:
                  i18n.language === 'uz'
                    ? 'Ushbu filtrdan foydalanish sinov versiyasida mavjud emas'
                    : 'Этот фильтр недоступен в пробной версии.',
                alertSubtitle: '',
                buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                buttonLink: '/profile',
              });
          }}
        />
        <HiOutlineArrowLongRight className='text-blue-700' />
        <input
          type='number'
          min={0}
          value={max !== null ? max : ''}
          placeholder='Max'
          className='noscroll ring-none active:ring-none h-8 w-[120px] appearance-none rounded-none border border-slate-700 p-2 outline-none focus:ring-0'
          onChange={(e) => {
            if (isDisabled) {
              return;
            }
            setValues(type, min, Number(e.target.value));
          }}
          onClick={() => {
            if (isDisabled)
              RenderAlert({
                alertTitle:
                  i18n.language === 'uz'
                    ? 'Ushbu filtrdan foydalanish sinov versiyasida mavjud emas'
                    : 'Этот фильтр недоступен в пробной версии.',
                alertSubtitle: '',
                buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                buttonLink: '/profile',
              });
          }}
        />
      </div>
    </div>
  );
}

export default Filter;
