import Link from 'next/link';
import React from 'react';
import { MdOutlineNavigateBefore } from 'react-icons/md';

export interface RegisterFooterComponentProps {
  onPrevious: () => void;
}

function RegisterFooter({ onPrevious }: RegisterFooterComponentProps) {
  return (
    <div className='mt-6 flex max-w-sm items-center justify-between'>
      <div className='flex items-center justify-start'>
        <MdOutlineNavigateBefore
          className='cursor-pointer text-2xl text-slate-500'
          onClick={() => onPrevious()}
        />
        <p
          className='font-primary cursor-pointer text-sm text-slate-500'
          onClick={() => onPrevious()}
        >
          Orqaga
        </p>
      </div>
      <div className=''>
        <p className='text-sm text-slate-500'>
          Ro'yxatdan o'tgansizmi?{' '}
          <Link className='text-primary cursor-pointer' href='/login'>
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterFooter;
