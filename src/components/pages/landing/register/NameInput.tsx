import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import RegisterFooter from '@/components/pages/landing/register/RegisterFooter';
import Button from '@/components/shared/buttons/Button';
import CustomInput from '@/components/shared/InputField';

export interface NamesAndEmailComponentProps {
  activeTab: number;
  currentTab: number;
  onPrevious: () => void;
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

const NamesAndEmailComponent = ({
  activeTab,
  currentTab,
  onPrevious,
  user,
  setUser,
}: NamesAndEmailComponentProps) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const router = useRouter();
  const [sendingRequest, setSendingRequest] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleRegister = () => {
    // Perform registration logic
    onRegister();
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onRegister = async () => {
    if (!isPasswordValid)
      return alert("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");

    if (!user.phone_number) return alert('Telefon raqamingizni kiriting!');
    if (!user.username) return alert('Foydalanuvchi nomini kiriting!');

    if (user.email && !validateEmail(user.email))
      return alert('Iltimos, to`g`ri email kiriting!');

    setSendingRequest(true);
    const api = new API(null);
    try {
      const res = await api.register({
        phone_number: '+' + user.phone_number,
        username: user.username,
        password: user.password,
        fingerprint: user.fingerprint,
        email: user.email,
        referred_by: user.referred_by,
      });

      if (res) {
        router.push('/home');
        setSendingRequest(false);
      } else {
        setSendingRequest(false);
      }
    } catch (e) {
      const error = e as Error;
      // get error message
      const errorMessage = error.message;
      logger(errorMessage, 'Error in Register');
      if (errorMessage === 'A user with this phone number already exists.') {
        setError('Bunday telefon raqamli foydalanuvchi allaqachon mavjud!');
      }
      if (errorMessage === 'A user with this username already exists.') {
        setError(
          'Bunday nomli foydalanuvchi allaqachon mavjud. Iltimos boshqa nom kiriting!'
        );
      }
      setSendingRequest(false);
    }
  };

  useEffect(() => {
    validatePassword(user.password);
  }, [user.password]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return setIsPasswordValid(false);
    }

    setIsPasswordValid(true);
  };

  return (
    <div
      className={clsxm(
        'absolute top-full mt-7 flex w-full max-w-[400px] flex-col gap-2 transition-all duration-500',
        activeTab === currentTab
          ? 'left-0 opacity-100'
          : 'left-full hidden opacity-0'
      )}
    >
      <CustomInput
        autoFocus
        label='Foydalanuvchi nomi'
        containerStyle={clsxm('rounded-md')}
        inputStyle={clsxm(
          'w-full h-10 px-3 text-base placeholder-slate-300 rounded-md placeholder:text-sm',
          error ===
            'Bunday nomli foydalanuvchi allaqachon mavjud. Iltimos boshqa nom kiriting!'
            ? 'border-2 border-red-500'
            : ''
        )}
        placeholder='Foydalanuvchi nomini kiriting (majburiy)'
        name='username'
        value={user.username}
        onChange={(e) => {
          // remove username error if exists
          // setErrors(errors.filter((err) => err !== 'username'));
          if (
            error ===
            'Bunday nomli foydalanuvchi allaqachon mavjud. Iltimos boshqa nom kiriting!'
          ) {
            setError(null);
          }
          handleInputChange(e);
        }}
        required
      />
      <div className='w-full flex-col items-start justify-start gap-1'>
        <CustomInput
          label='Parol'
          containerStyle='rounded-md'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md placeholder:text-sm'
          placeholder='Parol kiriting (majburiy)'
          name='password'
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleRegister();
            }
          }}
          value={user.password}
          onChange={(e) => {
            handleInputChange(e);
            validatePassword(e.target.value);
          }}
          required
          type={passwordShow ? 'text' : 'password'}
          rightIcon={
            passwordShow ? (
              <AiOutlineEye
                className='cursor-pointer text-slate-500'
                onClick={() => setPasswordShow(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className='cursor-pointer text-slate-500'
                onClick={() => setPasswordShow(true)}
              />
            )
          }
        />
        <p className='text-xs text-slate-400'>
          Parolda kamida 8 ta belgidan iborat bo'lishi kerak
        </p>
      </div>

      <CustomInput
        label='Email'
        containerStyle='rounded-md'
        inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md placeholder:text-sm'
        placeholder='Emailingizni kiriting (ixtiyoriy)'
        name='email'
        type='email'
        value={user?.email || ''}
        onChange={handleInputChange}
        required={false}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleRegister();
          }
        }}
      />
      <span className='my-5 h-px w-full bg-slate-300'></span>
      <div className='flex h-10 items-center justify-start gap-2'>
        <p className='bg-primary flex h-full items-center justify-center rounded-sm px-2 text-white'>
          Taklif kodi
        </p>
        <CustomInput
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleRegister();
            }
          }}
          containerStyle='rounded-md flex-1'
          labelStyle='text-primary'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md border border-primary placeholder:text-sm'
          placeholder='Taklif kodini kiriting (ixtiyoriy)'
          name='referred_by'
          type='text'
          value={user?.referred_by || ''}
          onChange={handleInputChange}
          required={false}
        />
      </div>

      <Button
        className='bg-primary mt-6 w-full text-white hover:bg-purple-700'
        onClick={handleRegister}
        isLoading={sendingRequest}
        spinnerColor='black'
        disabled={!isPasswordValid || sendingRequest || error !== null}
      >
        Ro'yxatdan o'tish
      </Button>
      <div className=''>
        {error && <p className='text-xs text-red-500'>{error}</p>}
      </div>

      <RegisterFooter
        onPrevious={() => {
          onPrevious();
        }}
      />
    </div>
  );
};

export default NamesAndEmailComponent;
