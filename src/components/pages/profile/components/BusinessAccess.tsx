import { useTranslation } from 'next-i18next';
import React from 'react';
import { FaTelegram } from 'react-icons/fa';
import Popup from 'reactjs-popup';

interface Props {
  open: boolean;
  closeModal: () => void;
  businessCode: string;
  setBusinessCode: (value: string) => void;
  setOpen: (value: boolean) => void;
}

const BusinessAccess = ({
  open,
  closeModal,
  businessCode,
  setBusinessCode,
  setOpen,
}: Props) => {
  const { i18n } = useTranslation('register');

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={() => setOpen(false)}
      contentStyle={{
        width: '350px',
        padding: '24px',
        border: '1px solid #E1E1E1',
        borderRadius: '10px',
        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
        zIndex: 20000,
        position: 'relative',
        margin: 'auto',
        marginTop: '15vh',
        background: '#fff',
      }}
    >
      <div className='flex  flex-col items-center justify-center space-y-4'>
        <p className='text-lg font-semibold'>
          {i18n.language === 'uz'
            ? 'Biznes tarifga ulanish uchun maxsus kodni kiriting.'
            : 'Введите специальный код для подключения к бизнес тарифу.'}
        </p>
        <input
          className='min-w-[300px] rounded-md border p-2 placeholder-gray-500 placeholder:text-sm'
          type='text'
          maxLength={6}
          placeholder={
            i18n.language === 'uz' ? 'Maxsus kod' : 'Специальный код'
          }
          value={businessCode}
          required
          onChange={(e) => setBusinessCode(e.target.value)}
        />
        <div className='flex w-full items-center justify-between'>
          <button
            className='border-primary mr-4 flex shrink-0 flex-grow items-center justify-start rounded-md bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600'
            onClick={() => {
              window.open('https://t.me/Alijonov_md', '_blank');
              setOpen(false);
            }}
          >
            <FaTelegram className='mr-2 text-white' />
            {i18n.language === 'uz' ? 'Maxsus kodni olish' : 'Получить код'}
          </button>
          <button
            className='mr-4 shrink-0 flex-grow rounded-md border bg-gradient-to-r from-purple-500 to-indigo-500 p-2 text-white transition duration-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600'
            onClick={closeModal}
          >
            {i18n.language === 'uz' ? 'Davom etish' : 'Продолжить'}
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default BusinessAccess;
