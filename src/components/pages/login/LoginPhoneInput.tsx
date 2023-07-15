import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
// back icon
import { HiOutlineArrowLeft } from 'react-icons/hi';
import PhoneInput from 'react-phone-input-2';

import clsxm from '@/lib/clsxm';

import Button from '@/components/shared/buttons/Button';

import { SERVER_URL } from '@/constant/env';

export interface LoginPhoneInputComponentProps {
  onNext: () => void;
  onPrevious?: () => void;
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

const LoginPhoneInputComponent = ({
  onNext,
  activeTab,
  currentTab,
  setUser,
  onPrevious,
  user,
}: LoginPhoneInputComponentProps) => {
  const [sendingRequest, setSendingRequest] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [match, setMatch] = useState<boolean | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (phone: string) => {
    setMatch(null);
    setUser((prev) => ({ ...prev, phone_number: phone }));
  };

  const handleSendCode = () => {
    setSendingRequest(true);
    axios
      .get(SERVER_URL + '/username_phone_match', {
        params: {
          phone_number: '+' + user.phone_number,
          username: user.username,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMatch(true);
          axios
            .post(SERVER_URL + '/code/', {
              phone_number: '+' + user.phone_number,
            })
            .then((res) => {
              if (res.status === 200) {
                setCodeSent(true);
                onNext();
              }
              setSendingRequest(false);
            })
            .catch((_) => {
              setCodeSent(false);
              setSendingRequest(false);
            });
        } else {
          setMatch(false);
          setSendingRequest(false);
        }
      })
      .catch((_) => {
        setMatch(false);
        setSendingRequest(false);
      });
  };

  return (
    <div
      className={clsxm(
        'absolute top-full mt-7 flex w-full max-w-[400px] flex-col gap-2 transition-all duration-500',
        activeTab === currentTab ? 'left-0 opacity-100' : '-left-full opacity-0'
      )}
    >
      <div className='flex w-full flex-col items-start justify-start'>
        <p className='mb-2 text-sm text-slate-500'>
          Yangi parol olish uchun, telefon raqamingizni tasdiqlang.
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
      {match === false && (
        <p className='text-sm text-red-500'>
          Telefon raqam va foydalanuvchi nomi mos kelmadi. Agar siz buni xato
          deb o'ylasangiz, iltimos, biz bilan bog'laning.
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
      <div
        className='group flex w-full items-center justify-start gap-2'
        onClick={() => {
          setMatch(null);
          onPrevious && onPrevious();
        }}
      >
        <HiOutlineArrowLeft className='text-slate-500 group-hover:text-black' />
        <p className='cursor-pointer text-sm text-slate-500 group-hover:text-black'>
          Orqaga qaytish
        </p>
      </div>
    </div>
  );
};

export default LoginPhoneInputComponent;
