import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import RegisterFooter from '@/components/pages/landing/register/RegisterFooter';
import TelegramLogin from '@/components/pages/login/TelegramLogin';
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

  const { t } = useTranslation('register');

  const onRegister = async (user: {
    username: string;
    first_name?: string;
    last_name?: string;
    id: number;
  }) => {
    if (!user.username) return alert(t('nousername.validate.error'));

    setSendingRequest(true);
    const api = new API(null);
    try {
      const res = await api.register({
        username: user.username,
        password: user.id.toString(),
        referred_by: referral_code as string | undefined,
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

  return (
    <div
      className={clsxm(
        'top-full mt-7 flex w-full max-w-[400px] flex-col gap-2 transition-all duration-500',
        'left-0 opacity-100'
      )}
    >
      <div className='flex h-10 items-center justify-start gap-2'>
        <p className='bg-primary flex h-full items-center justify-center rounded-sm px-2 text-white'>
          {t('referral.title')}
        </p>
        <CustomInput
          containerStyle='rounded-md flex-1'
          labelStyle='text-primary'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md border border-primary placeholder:text-sm'
          placeholder={t('referral.placeholder')}
          name='referred_by'
          type='text'
          value={referral_code ?? ''}
          onChange={(e) => {
            setReferralCode(e.target.value);
          }}
          required={false}
        />
      </div>
      <div className='mt-6 flex items-center justify-center'>
        <TelegramLogin onTelegramAuth={onRegister} />
      </div>
      {/* <Button
        className='bg-primary mt-6 w-full text-white hover:bg-purple-700'
        onClick={() => {
          onRegister();
        }}
        isLoading={sendingRequest}
        spinnerColor='black'
        disabled={!isPasswordValid || sendingRequest || error !== null}
      >
        {t('button.register')}
      </Button> */}
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
