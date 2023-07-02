import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import LoginFooter from '@/components/pages/login/LoginFooter';
import Button from '@/components/shared/buttons/Button';
import CustomInput from '@/components/shared/InputField';

export interface NamesAndEmailComponentProps {
  activeTab: number;
  currentTab: number;
  onNext: () => void;
  user: {
    username: string;
    password: string;
    phone_number: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
      phone_number: string;
    }>
  >;
}

const UserNameAndPassword = ({
  activeTab,
  currentTab,
  onNext,
  user,
  setUser,
}: NamesAndEmailComponentProps) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const router = useRouter();
  const [success, setSuccess] = useState<boolean | null>(null);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onLogin = () => {
    const api = new API(null);
    setSendingRequest(true);
    api
      .login(user)
      .then((res) => {
        console.log(res, 'res');
        if (res) {
          setSuccess(true);
          router.push('/home');
        } else {
          setSuccess(false);
        }
        setSendingRequest(false);
      })
      .catch((err) => {
        logger(err, 'Error in onLogin');
        alert(err);
        setSuccess(false);
        setSendingRequest(false);
      });
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
        activeTab === currentTab ? 'left-0 opacity-100' : '-left-full opacity-0'
      )}
    >
      <CustomInput
        autoFocus
        autoComplete='username'
        label='Foydalanuvchi nomi'
        containerStyle={clsxm('rounded-md')}
        inputStyle={clsxm(
          'w-full h-10 px-3 text-base placeholder-slate-300 rounded-md',
          errors.includes('username') ? 'border-2 border-red-500' : '',
          'border border-primary base:border-slate-300'
        )}
        placeholder='Foydalanuvchi nomini kiriting (majburiy)'
        name='username'
        value={user.username}
        onChange={(e) => {
          // remove username error if exists
          setSuccess(null);
          setErrors(errors.filter((err) => err !== 'username'));
          handleInputChange(e);
        }}
        required
      />
      <div className='w-full flex-col items-start justify-start gap-1'>
        <CustomInput
          label='Parol'
          autoComplete='current-password'
          containerStyle='rounded-md'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md border border-primary base:border-slate-300'
          placeholder='Parol kiriting (majburiy)'
          name='password'
          value={user.password}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onLogin();
            }
          }}
          onChange={(e) => {
            setSuccess(null);
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
      </div>

      <span className='my-5 h-px w-full bg-slate-300'></span>
      {success === false && (
        <div className='w-full text-sm text-red-500'>
          Foydalanuvchi nomi yoki parol noto'g'ri. Agar buni xatolik deb
          o'ylasangiz, biz bilan bog'laning.
        </div>
      )}
      {success === true && (
        <div className='w-full text-sm text-green-500'>
          Siz muvaffaqiyatli tizimga kirdingiz.
        </div>
      )}

      <Button
        className='bg-primary mt-6 w-full text-white hover:bg-purple-700'
        onClick={onLogin}
        isLoading={sendingRequest}
        spinnerColor='white'
        disabled={
          !isPasswordValid ||
          sendingRequest ||
          !user.username ||
          errors.length > 0
        }
      >
        Kirish
      </Button>

      <LoginFooter
        username={user.username}
        onNext={() => {
          onNext();
        }}
      />
    </div>
  );
};

export default UserNameAndPassword;
