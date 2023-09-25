import { useTranslation } from 'next-i18next';
import React from 'react';
import { LuShrink } from 'react-icons/lu';
import Popup from 'reactjs-popup';

import CategoryInstructions from '@/components/instructiions/categories/CategoryInstructions';

const Instruction = ({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) => {
  const { i18n } = useTranslation('common');
  return (
    <Popup
      open={open}
      onClose={closeModal}
      contentStyle={{
        width: '100vw',
        // height: '100vh',
        overflow: 'scroll',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20000,
      }}
    >
      <div className=' modal relative flex  h-full flex-col items-start justify-start '>
        <LuShrink
          className='absolute right-5 top-5 z-[100] h-6 w-6 cursor-pointer'
          onClick={closeModal}
        />

        <div className='min-h-screen w-full  flex-1 pb-20'>
          <h1>Qo'llanma</h1>
          <CategoryInstructions />
        </div>
      </div>
    </Popup>
  );
};

export default Instruction;
