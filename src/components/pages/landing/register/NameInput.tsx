import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { API } from '@/lib/api';
import clsxm from '@/lib/clsxm';

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
    fingerprint: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email?: string;
      password: string;
      phone_number: string;
      referred_by?: string;
      fingerprint: string;
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
  const [errors, setErrors] = useState<string[]>([]);
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleRegister = () => {
    // Perform registration logic
    onRegister();
  };

  const onRegister = () => {
    if (!isPasswordValid)
      return alert("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");

    if (!user.phone_number) return alert('Telefon raqamingizni kiriting!');

    API.callServerClientSide(
      API.USER_CREATE,
      { ...user, phone_number: '+' + user.phone_number },
      (res) => {
        if (res.status === 201 || res.status === 200) {
          const { data } = res;
          window.localStorage.setItem('referral_code', data.referral_code);
          router.push('/success');
        }
        setSendingRequest(false);
      },
      (err) => {
        console.log(err);
        const { data } = err.response;
        if (data) {
          setErrors(Object.keys(data));
        }
        setSendingRequest(false);
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
        'absolute flex w-[400px] flex-col gap-2 transition-all duration-500',
        activeTab === currentTab ? 'left-0 opacity-100' : 'left-full opacity-0'
      )}
    >
      <CustomInput
        autoFocus
        label='Foydalanuvchi nomi'
        containerStyle={clsxm('rounded-md')}
        inputStyle={clsxm(
          'w-full h-10 px-3 text-base placeholder-slate-300 rounded-md',
          errors.includes('username') ? 'border-2 border-red-500' : ''
        )}
        placeholder='Foydalanuvchi nomini kiriting (majburiy)'
        name='username'
        value={user.username}
        onChange={(e) => {
          // remove username error if exists
          setErrors(errors.filter((err) => err !== 'username'));
          handleInputChange(e);
        }}
        required
      />
      <div className='w-full flex-col items-start justify-start gap-1'>
        <CustomInput
          label='Parol'
          containerStyle='rounded-md'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md'
          placeholder='Parol kiriting (majburiy)'
          name='password'
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
        inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md'
        placeholder='Emailingizni kiriting (ixtiyoriy)'
        name='email'
        type='email'
        value={user?.email || ''}
        onChange={handleInputChange}
        required={false}
      />
      <span className='my-5 h-px w-full bg-slate-300'></span>
      <div className='flex h-10 items-center justify-start gap-2'>
        <p className='bg-primary flex h-full items-center justify-center rounded-sm px-2 text-white'>
          Taklif kodi
        </p>
        <CustomInput
          containerStyle='rounded-md flex-1'
          labelStyle='text-primary'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md border border-primary'
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
        spinnerColor='white'
        disabled={
          !isPasswordValid ||
          sendingRequest ||
          !user.username ||
          errors.length > 0
        }
      >
        Ro'yxatdan o'tish
      </Button>
      <div className=''>
        {errors.includes('phone_number') && (
          <p className='text-xs text-red-500'>
            Bunday telefon raqamli foydalanuvchi allaqachon mavjud!
          </p>
        )}
        {errors.includes('username') && (
          <p className='text-xs text-red-500'>
            Bunday nomli foydalanuvchi allaqachon mavjud!
          </p>
        )}
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
