import React from 'react';
import { LuShrink } from 'react-icons/lu';

interface Props {
  children: React.ReactNode;
}

function FullScreenContainer({ children }: Props) {
  return (
    <div className='absolute h-screen w-screen bg-white'>
      <LuShrink className='text-primary absolute right-5 top-5 h-6 w-6' />
      {children}
    </div>
  );
}

export default FullScreenContainer;
