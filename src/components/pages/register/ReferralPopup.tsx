import { useTranslation } from 'next-i18next';
import React from 'react';
import Popup from 'reactjs-popup';

interface Props {
  open: boolean;
  closeModal: () => void;
  referralCode: string;
  setReferralCode: (value: string) => void;
}

const ReferralPopup = ({
  open,
  closeModal,
  referralCode,
  setReferralCode,
}: Props) => {
  const { i18n } = useTranslation('register');

  return (
    <Popup
      open={open}
      closeOnDocumentClick
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
      <div className='flex flex-col items-center justify-center space-y-4'>
        <p className='text-lg font-semibold'>
          {i18n.language === 'uz'
            ? 'Agar sizda taklif kodi bo`lsa, uni kiriting.'
            : 'Если у вас есть код приглашения, введите его.'}
        </p>
        <input
          className='min-w-[300px] rounded-md border p-2 placeholder-gray-500 placeholder:text-sm'
          type='text'
          maxLength={6}
          placeholder={
            i18n.language === 'uz'
              ? 'Taklif kodi(ixtiyoriy)'
              : 'Код приглашения(необязательно)'
          }
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />
        <div className='flex w-full items-center justify-between'>
          <button
            className='text-primary border-primary mr-4 shrink-0 rounded-md border bg-white p-2 transition-colors duration-200 hover:border-purple-900 hover:text-purple-900'
            onClick={closeModal}
          >
            {i18n.language === 'uz' ? "Yo'q, davom etish" : 'Нет, продолжить'}
          </button>
          <button
            className='mr-4 shrink-0 rounded-md border bg-gradient-to-r from-purple-500 to-indigo-500 p-2 text-white transition duration-200 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600'
            onClick={closeModal}
          >
            {i18n.language === 'uz' ? 'Ha, kiritdim' : 'Да, уже введено'}
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ReferralPopup;
