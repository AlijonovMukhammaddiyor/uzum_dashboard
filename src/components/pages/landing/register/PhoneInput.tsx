import clsx from 'clsx';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import { API } from '@/lib/api';
import clsxm from '@/lib/clsxm';

import Button from '@/components/shared/buttons/Button';

export interface PhoneInputComponentProps {
  onNext: () => void;
  activeTab: number;
  currentTab: number;
  user: {
    username: string;
    email?: string;
    password: string;
    phone_number: string;
    referred_by?: string;
    fingerprint?: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email?: string;
      password: string;
      phone_number: string;
      referred_by?: string;
      fingerprint?: string;
    }>
  >;
}

const PhoneInputComponent = ({
  onNext,
  activeTab,
  currentTab,
  setUser,
  user,
}: PhoneInputComponentProps) => {
  const [sendingRequest, setSendingRequest] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (phone: string) => {
    setUser((prev) => ({ ...prev, phone_number: phone }));
  };

  const handleSendCode = () => {
    if (user.phone_number.length < 10)
      return alert("Raqamingizni to'liq kiriting!");
    setSendingRequest(true);
    API.callServerClientSide(
      API.PHONE_CODE_SEND,
      { phone_number: '+' + user.phone_number, is_register: true },
      (res) => {
        if (res.status === 200) {
          setCodeSent(true);
          onNext();
        } else {
          setError((res.data as { message: string }).message);
        }
        setSendingRequest(false);
      },
      (err) => {
        console.log(err, 'err');
        setCodeSent(false);
        setSendingRequest(false);
        setError((err.response?.data as { message: string }).message);
      },
      () => {
        setSendingRequest(true);
      },
      () => {
        setSendingRequest(false);
      },
      'POST'
    );
  };

  return (
    <div
      className={clsxm(
        'absolute top-full mt-7 flex w-full max-w-[400px] flex-col gap-2 transition-all duration-500',
        activeTab === currentTab
          ? 'left-0 opacity-100'
          : '-left-full hidden opacity-0'
      )}
    >
      <div className='flex w-full flex-col items-start justify-start'>
        <p className='mb-2 text-sm text-slate-500'>
          Telefon raqamingizni kiriting.
        </p>
        <PhoneInput
          country='uz'
          value={user.phone_number}
          onChange={handlePhoneChange}
          inputStyle={{
            width: '100%',
            height: '40px',
          }}
          countryCodeEditable={false}
          masks={{ uz: '(..) ...-..-..', kr: '(..) ....-....' }}
          containerClass='rounded-none'
          inputClass='text-lg'
          disabled={codeSent}
        />
      </div>
      {error && (
        <p className='text-sm text-red-500'>
          {error === 'Phone number already exists'
            ? "Bu raqam allaqachon ro'yxatdan o'tgan"
            : "Xatolik yuz berdi! Iltimos, qaytadan urinib ko'ring. Agar xatolik davom etaversa, iltimos biz bilan bog'laning."}
        </p>
      )}
      <Button
        className={clsx('bg-primary w-full text-white hover:bg-purple-700')}
        spinnerColor='white'
        isLoading={sendingRequest}
        // disabled={!codeSent}
        onClick={() => {
          handleSendCode();
        }}
      >
        Kodni Yuborish
      </Button>
    </div>
  );
};

export default PhoneInputComponent;
