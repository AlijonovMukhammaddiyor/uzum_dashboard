import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

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

  const { t } = useTranslation('login');

  const onLogin = () => {
    const api = new API();
    setSendingRequest(true);
    api
      .login(user)
      .then((res) => {
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
        'top-full mt-24 flex min-w-[300px] max-w-[400px] flex-col gap-2 transition-all duration-500',
        activeTab === currentTab
          ? '-left-0 opacity-100'
          : '-left-full opacity-0'
      )}
    >
      <CustomInput
        autoFocus
        autoComplete='username'
        label={t('username.title')}
        containerStyle={clsxm('rounded-md')}
        inputStyle={clsxm(
          'w-full h-10 px-3 text-base placeholder-slate-300 rounded-md',
          errors.includes('username') ? 'border-2 border-red-500' : '',
          'border border-primary base:border-slate-300'
        )}
        placeholder={t('username.placeholder')}
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
          label={t('password.title')}
          autoComplete='current-password'
          containerStyle='rounded-md'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md border border-primary base:border-slate-300'
          placeholder={t('password.placeholder')}
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
        <div className='w-full text-sm text-red-500'>{t('error')}</div>
      )}
      {success === true && (
        <div className='w-full text-sm text-green-500'>{t('success')}</div>
      )}

      <Button
        className='bg-primary mt-6 w-full text-white hover:bg-purple-700'
        onClick={onLogin}
        isLoading={sendingRequest}
        spinnerColor='rgb(126 34 206)'
        disabled={
          !isPasswordValid ||
          sendingRequest ||
          !user.username ||
          errors.length > 0
        }
      >
        {t('title')}
      </Button>

      {/* <LoginFooter
        username={user.username}
        onNext={() => {
          onNext();
        }}
      /> */}
    </div>
  );
};

export default UserNameAndPassword;
