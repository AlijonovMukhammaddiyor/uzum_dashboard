import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';

function BadgeContainer() {
  return (
    <div className='flex h-[120px] w-[200px] flex-col items-start justify-start gap-1 rounded-md bg-white p-2'>
      <p className='font-bold'>BadgeName</p>
      <p className='flex w-full items-center justify-between'>
        <span className='text-sm'>Sana</span>
        <span className='text-sm text-slate-400'>03/05/2023</span>
      </p>
      <p className='flex w-full items-center justify-between'>
        <span className='text-sm'>Mahsulotlar Soni</span>
        <span className='text-sm text-slate-400'>12200</span>
      </p>
      <p className='mt-3 flex w-full cursor-pointer items-center justify-end font-semibold'>
        <span className='text-sm'>Mahsulotlarni ko'rish</span>
        <AiOutlineRight className='' />
      </p>
    </div>
  );
}

export default BadgeContainer;
