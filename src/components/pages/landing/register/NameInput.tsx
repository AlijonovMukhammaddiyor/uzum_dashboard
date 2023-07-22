import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import PhoneInput from 'react-phone-input-2';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import RegisterFooter from '@/components/pages/landing/register/RegisterFooter';
import Button from '@/components/shared/buttons/Button';
import CustomInput from '@/components/shared/InputField';

export interface NamesAndEmailComponentProps {
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
  const { t } = useTranslation('register');

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

  const handlePhoneChange = (phone: string) => {
    setUser((prev) => ({ ...prev, phone_number: phone }));
  };

  const onRegister = async () => {
    if (!isPasswordValid) return alert(t('nopassword.validate.error'));

    if (!user.phone_number) return alert(t('nophone.validate.error'));
    if (!user.username) return alert(t('nousername.validate.error'));

    if (user.email && !validateEmail(user.email))
      return alert(t('email.validate.erorr'));

    if (!validate_phones(user.phone_number)) {
      return alert(t('phone.validate.error'));
    }

    setSendingRequest(true);
    const api = new API(null);
    try {
      const res = await api.register({
        phone_number: '+' + user.phone_number,
        // replace any space with underscore
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
        setError(t('phone.error'));
      }
      if (errorMessage === 'A user with this username already exists.') {
        setError(t('username.error'));
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

  const validate_phones = (phone: string) => {
    if (phone.startsWith('998')) {
      // return pattern = re.compile(r"^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$")
      return phone.length === 12;
    } else if (phone.startsWith('82')) {
      // return pattern = re.compile(r"^\+82 \d{2} \d{4}-\d{4}$")
      return phone.length === 12;
    } else if (phone.startsWith('7')) {
      return phone.length === 11;
    }

    return false;
  };

  return (
    <div
      className={clsxm(
        'absolute top-full mt-7 flex w-full max-w-[400px] flex-col gap-2 transition-all duration-500',
        'left-0 opacity-100'
      )}
    >
      <div className='flex w-full flex-col items-start justify-start'>
        <p className='mb-2 text-sm text-slate-500'>{t('phone.title')}</p>
        <PhoneInput
          country='uz'
          value={user.phone_number}
          onChange={handlePhoneChange}
          inputStyle={{
            width: '100%',
            height: '40px',
          }}
          countryCodeEditable={false}
          // only enable korea and uzbekistan
          onlyCountries={['uz', 'kr', 'ru']}
          masks={{ uz: '(..) ...-..-..', kr: '(..) ....-....' }}
          containerClass={clsxm('rounded-none')}
          inputClass='text-lg'
        />
      </div>
      <CustomInput
        autoFocus
        label={t('username.title')}
        containerStyle={clsxm('rounded-md')}
        inputStyle={clsxm(
          'w-full h-10 px-3 text-base placeholder-slate-300 rounded-md placeholder:text-sm',
          error ===
            'Bunday nomli foydalanuvchi allaqachon mavjud. Iltimos boshqa nom kiriting!'
            ? 'border-2 border-red-500'
            : ''
        )}
        placeholder={t('username.placeholder')}
        name='username'
        value={user.username}
        onChange={(e) => {
          // remove username error if exists
          // setErrors(errors.filter((err) => err !== 'username'));
          if (error === t('username.error')) {
            setError(null);
          }
          handleInputChange(e);
        }}
        required
      />
      <div className='w-full flex-col items-start justify-start gap-1'>
        <CustomInput
          label={t('password.title')}
          containerStyle='rounded-md'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md placeholder:text-sm'
          placeholder={t('password.placeholder')}
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
          {t('nopassword.validate.error')}
        </p>
      </div>

      <CustomInput
        label={t('email.title')}
        containerStyle='rounded-md'
        inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md placeholder:text-sm'
        placeholder={t('email.placeholder')}
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
          {t('referral.title')}
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
          placeholder={t('referral.placeholder')}
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
        {t('button.register')}
      </Button>
      <div className=''>
        {error && <p className='text-xs text-red-500'>{error}</p>}
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
