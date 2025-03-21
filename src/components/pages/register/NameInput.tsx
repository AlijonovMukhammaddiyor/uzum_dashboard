import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import PhoneInput from 'react-phone-input-2';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import RegisterFooter from '@/components/pages/register/RegisterFooter';
import Button from '@/components/shared/buttons/Button';
import CustomInput from '@/components/shared/InputField';

export interface NamesAndEmailComponentProps {
  sendingRequest: boolean;
  setSendingRequest: (value: boolean) => void;
}

const NamesAndEmailComponent = ({
  sendingRequest,
  setSendingRequest,
}: NamesAndEmailComponentProps) => {
  const router = useRouter();
  const [referral_code, setReferralCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // check url params for referral code
    const referralCode = router.query.referral;
    if (referralCode && referralCode.length === 6) {
      setReferralCode(referralCode as string);
    } else {
      if (typeof window !== 'undefined') {
        const referral = localStorage.getItem('referral');
        if (referral) {
          setReferralCode(referral);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  const { t, i18n } = useTranslation('register');

  const onRegister = async () => {
    if (!username) return alert(t('nousername.validate.error'));

    if (!phone || phone.length < 12)
      return alert(
        i18n.language === 'uz'
          ? "Telefon nomer kiritilmagan yoki noto'g'ri nomer kiritilgan. Iltimos tekshirib qaytadan urinib ko'ring"
          : 'Номер телефона не введен или введен неверно. Пожалуйста, проверьте и попробуйте еще раз'
      );

    // if password is less than 8 characters, alert user
    if (password.length < 8)
      return alert(
        i18n.language === 'uz'
          ? "Parol kamida 8 ta belgidan iborat bo'lishi kerak"
          : 'Пароль должен содержать не менее 8 символов'
      );

    if (!isValidUsername(username))
      return alert(
        i18n.language === 'uz'
          ? "Foydalanuvchi nomi faqat lotin harflari, raqamlar va @ . + - _ belgilaridan iborat bo'lishi kerak"
          : 'Имя пользователя должно содержать только буквы латинского алфавита, цифры и символы @ . + - _'
      );

    setSendingRequest(true);

    const api = new API(null);
    try {
      const res = await api.register({
        username: username,
        password: password,
        referred_by: referral_code as string | undefined,
        phone_number: phone as string | undefined,
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
        setError(t('phone.error'));
      }
      if (errorMessage === 'A user with this username already exists.') {
        setError(t('username.error'));
      }
      setSendingRequest(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const api = new API(null);
      try {
        setSendingRequest(true);
        const res = await api.register({
          code: codeResponse.access_token,
          referred_by: referral_code as string | undefined,
          isGoogle: true,
          // referred_by: referral_code as string | undefined,
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
        alert(
          i18n.language === 'uz'
            ? "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring"
            : 'Произошла ошибка. Пожалуйста, попробуйте еще раз'
        );
        if (errorMessage === 'A user with this phone number already exists.') {
          setError(t('phone.error'));
        }
        if (errorMessage === 'A user with this username already exists.') {
          setError(t('username.error'));
        }
        setSendingRequest(false);
      }
    },
    flow: 'implicit',
  });

  const handleGoogleLogin = () => {
    login();
  };

  const isValidUsername = (username: string) => {
    if (username.length < 5)
      return alert(
        i18n.language === 'uz'
          ? "Foydalanuvchi nomi kamida 5 ta belgidan iborat bo'lishi kerak"
          : 'Имя пользователя должно содержать не менее 5 символов'
      );
    const usernamePattern = /^[a-zA-Z0-9@.+-_]+$/;
    return usernamePattern.test(username);
  };

  return (
    <div className={clsxm('flex w-[350px] max-w-[350px] flex-col gap-6', '')}>
      {/* <ReferralPopup
        open={popupOpen}
        setOpen={setPopupOpen}
        closeModal={() => {
          setPopupOpen(false);
          return onRegister();
        }}
        referralCode={referral_code ?? ''}
        setReferralCode={setReferralCode}
      />
      <ReferralPopup
        open={popupOpenGoogle}
        setOpen={setPopupOpenGoogle}
        closeModal={() => {
          setPopupOpenGoogle(false);
          handleGoogleLogin();
        }}
        referralCode={referral_code ?? ''}
        setReferralCode={setReferralCode}
      /> */}
      <div className='flex flex-col gap-4'>
        <div
          className='flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-gray-200 py-1 hover:bg-gray-200'
          onClick={() => {
            // setPopupOpenGoogle(true);
            handleGoogleLogin();
          }}
        >
          <FcGoogle className='text-primary text-4xl' />
          <p className=''>
            {i18n.language === 'uz'
              ? 'Google orqali kirish'
              : 'Войти через Google'}
          </p>
        </div>
      </div>
      <div className='flex w-full items-center justify-between'>
        <div className='h-[1px] w-[calc(50%-20px)] bg-slate-400'></div>
        <p className='text-slate-500'>
          {i18n.language === 'uz' ? 'Yoki' : 'Или'}
        </p>
        <div className='h-[1px] w-[calc(50%-20px)] bg-slate-400'></div>
      </div>
      <div className='flex w-full flex-col gap-3'>
        <PhoneInput
          country='uz'
          value={phone ?? ''}
          onChange={(phone) => {
            setPhone(phone);
          }}
          inputStyle={{
            width: '100%',
            height: '40px',
          }}
          countryCodeEditable={false}
          masks={{ uz: '(..) ...-..-..', kr: '(..) ....-....' }}
          containerClass='rounded-none'
          inputClass='text-lg'
        />
        <CustomInput
          autoFocus
          autoComplete='username'
          label={t('username.title')}
          containerStyle={clsxm('rounded-md')}
          inputStyle={clsxm(
            'w-full h-10 px-3 text-base placeholder-slate-300 rounded-sm'
            // errors.includes('username') ? 'border-2 border-red-500' : '',
            // 'border border-primary base:border-slate-300'
          )}
          placeholder={t('username.placeholder')}
          name='username'
          value={username}
          onChange={(e) => {
            // remove username error if exists
            // if (errors.includes('username')) {
            //   setErrors(errors.filter((error) => error !== 'username'));
            // }
            setUsername(e.target.value);
          }}
          required
        />
        <div className='w-full flex-col items-start justify-start gap-1'>
          <CustomInput
            label={t('password.title')}
            autoComplete='current-password'
            containerStyle='rounded-sm'
            inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-sm border border-primary base:border-slate-300'
            placeholder={t('password.placeholder')}
            name='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                return onRegister();
              }
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

        <Button
          className='bg-primary mt-6 w-full text-white hover:bg-purple-700'
          onClick={() => {
            // setPopupOpen(true);
            onRegister();
          }}
          isLoading={sendingRequest}
          spinnerColor='primary'
          disabled={sendingRequest}
        >
          <>{t('title')}</>
        </Button>
      </div>

      <div className=''>
        {error && <p className='text-xs text-red-500'>{error}</p>}
      </div>
      <div className='-mt-4 flex items-start justify-center gap-2'>
        <p className='text-xs'>{t('agreement')}</p>
      </div>
      <RegisterFooter
        onPrevious={() => {
          // onPrevious();
          router.back();
        }}
      />
    </div>
  );
};

export default NamesAndEmailComponent;
