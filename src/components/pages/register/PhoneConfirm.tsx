import axios, { AxiosError } from 'axios';
import React from 'react';

import clsxm from '@/lib/clsxm';

import RegisterFooter from '@/components/pages/register/RegisterFooter';
import Button from '@/components/shared/buttons/Button';
import CustomInput from '@/components/shared/InputField';

import { SERVER_URL } from '@/constant/env';

export interface PhoneConfirmComponentProps {
  onNext: () => void;
  onPrevious: () => void;
  activeTab: number;
  currentTab: number;
  phone: string;
}

function PhoneConfirm({
  onNext,
  activeTab,
  currentTab,
  phone,
  onPrevious,
}: PhoneConfirmComponentProps) {
  const [sendingRequest, setSendingRequest] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSendCode = async () => {
    setErrorMessage(null);
    // setSendingRequest(true);
    // onNext();
    // setSendingRequest(false);
    try {
      const res = await axios.post(SERVER_URL + '/verify/', {
        phone_number: '+' + phone,
        code,
      });

      if (res.status === 200) {
        setSendingRequest(false);
        onNext();
        return;
      } else {
        setErrorMessage(
          'Xatolik yuz berdi. Agar bu yana takrorlansa, bizga xabar bering!'
        );
      }
    } catch (err) {
      setSendingRequest(false);
      setErrorMessage(
        ((err as AxiosError).response?.data as { message: string }).message
      );
    }
  };

  return (
    <div
      className={clsxm(
        'absolute top-full mt-7 flex w-full max-w-[400px] flex-col gap-2 transition-all duration-500',
        activeTab === currentTab && 'left-0 opacity-100',
        activeTab === currentTab - 1 && 'left-full opacity-0',
        activeTab === currentTab + 1 && '-left-full opacity-0',
        activeTab !== currentTab && 'hidden'
      )}
    >
      <CustomInput
        label='Kod'
        autoFocus={activeTab === currentTab}
        onWheel={(e) => {
          (e.target as HTMLInputElement)?.blur();
          (document.activeElement as HTMLInputElement)?.blur();
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSendCode();
          }
        }}
        containerStyle='rounded-md'
        inputStyle={clsxm(
          'w-full h-10 px-3 text-base placeholder-slate-300 rounded-md',
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          errorMessage && 'border-red-500'
        )}
        placeholder='Kodni kiriting'
        value={code}
        onChange={(e) => {
          // do not allow more than 4 digits
          if (e.target.value.length > 4) return;
          setCode(e.target.value);
        }}
        type='number'
      />
      {errorMessage && (
        <div className='max-w-full text-sm text-red-500'>
          {errorMessage === 'Invalid verification code'
            ? "Notog'ri kod kiritildi. Iltimos, qayta urinib ko'ring!"
            : 'Xatolik yuz berdi. Agar bu yana takrorlansa, bizga xabar bering!'}
        </div>
      )}
      <Button
        className='bg-primary w-full text-white hover:bg-purple-700'
        onClick={() => {
          handleSendCode();
        }}
        spinnerColor='black'
        isLoading={sendingRequest}
        disabled={code.length < 4 || sendingRequest}
      >
        <>Tasdiqlash</>
      </Button>

      <RegisterFooter
        onPrevious={() => {
          onPrevious();
          setErrorMessage(null);
          setCode('');
        }}
      />
    </div>
  );
}

export default PhoneConfirm;
