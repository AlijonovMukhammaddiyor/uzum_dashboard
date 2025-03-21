import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import UserNameAndPassword from '@/components/pages/login/UserNameAndPassword';

import Logo from '@/assets/landing/main.png';

function LoginComponent() {
  const router = useRouter();
  const { t } = useTranslation('login');
  // plan will later be used to determine which plan the user is registering for
  const [activeTab, setactiveTab] = React.useState(1);
  const [user, setUser] = React.useState<{
    username: string;
    password: string;
    phone_number: string;
  }>({
    username: '',
    password: '',
    phone_number: '',
  });
  const [sending, setSendingRequest] = React.useState(false);
  const [success, setSuccess] = React.useState<boolean | null>(null);
  const { i18n } = useTranslation('landing');
  const [referralCode, setReferralCode] = React.useState<string>('');

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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const api = new API(null);
      try {
        setSendingRequest(true);
        const res = await api.register({
          code: codeResponse.access_token,
          isGoogle: true,
          referred_by: referralCode,
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

        setSendingRequest(false);
      }
    },
    flow: 'implicit',
  });

  return (
    <div className='base:bg-none relative flex h-full min-h-screen w-full overflow-hidden'>
      <div className='border-primary fixed right-0 top-20 z-10 flex h-9 items-center justify-center overflow-scroll rounded-l-md border bg-purple-200 bg-opacity-25'>
        <div
          className={clsxm(
            'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm',
            i18n.language === 'uz' && 'bg-primary text-white'
          )}
          onClick={() => changeLanguage('uz')}
        >
          Uz
        </div>
        <div
          className={clsxm(
            'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm',
            i18n.language === 'ru' && 'bg-primary text-white'
          )}
          onClick={() => changeLanguage('ru')}
        >
          Рус
        </div>
      </div>
      <div className='layout base:w-1/2 top-5 flex h-full min-h-screen w-full flex-col items-center justify-start gap-2 px-3 text-sm'>
        <div className='mb-6 flex h-12 w-full items-center justify-between p-5'>
          <Link href='/' className='md:ml-6'>
            {/* <Logo className='h-[50px] w-28 sm:w-32 md:w-56' /> */}
            <Image
              src={Logo}
              alt='logo'
              width={200}
              height={50}
              className='w-28 md:w-36'
            />
          </Link>
          <div className='flex items-center justify-end gap-2'>
            <p className='hidden text-xs lg:block'>{t('register.ask')}</p>
            <p>
              <Link
                href='/register'
                className='rounded-2xl border border-slate-400 px-2 py-1'
              >
                <span className='text-primary'>{t('register')}</span>
              </Link>
            </p>
          </div>
        </div>
        <div className='relative flex w-full flex-1 items-center justify-center px-5 pb-16'>
          <div
            className={clsxm(
              'flex w-[350px] max-w-[350px] flex-col items-center justify-start gap-6  px-2'
              // activeTab === 3 && '-mt-[400px]'
            )}
          >
            <LoginHeader activeTab={activeTab} />
            <p className='-mb-4 text-sm text-slate-400'>
              Если вы зарегистрированы в Google
            </p>
            <div
              className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-gray-400 py-1 hover:bg-gray-200'
              onClick={() => {
                login();
              }}
            >
              <FcGoogle className='text-primary text-4xl' />
              <p className=''>
                {i18n.language === 'uz'
                  ? 'Google orqali kirish'
                  : 'Войти через Google'}
              </p>
            </div>
            <div className='flex w-full items-center justify-between'>
              <div className='h-[1px] w-[calc(50%-20px)] bg-slate-400'></div>
              <p className='text-slate-500'>
                {i18n.language === 'uz' ? 'Yoki' : 'Или'}
              </p>
              <div className='h-[1px] w-[calc(50%-20px)] bg-slate-400'></div>
            </div>
            <UserNameAndPassword
              activeTab={activeTab}
              currentTab={1}
              onNext={() => {
                setactiveTab(2);
              }}
              user={user}
              setUser={setUser}
              sending={sending}
              success={success}
              setSending={setSendingRequest}
              setSuccess={setSuccess}
            />
          </div>
        </div>
      </div>

      <div className='bg-gradient base:flex hidden w-1/2 flex-1 bg-opacity-10'></div>
    </div>
  );
}

export default LoginComponent;

function LoginHeader({ activeTab }: { activeTab: number }) {
  const { t } = useTranslation('login');

  return (
    <div className='flex w-full max-w-sm flex-col items-center justify-center gap-6 px-2'>
      <div className=''>
        <div className='flex w-full flex-col items-start'>
          <h1 className='base:text-2xl w-full text-center text-xl font-semibold'>
            {activeTab === 1 ? t('title') : t('password.reset.title')}
          </h1>
        </div>
        <div className='flex items-center justify-start'>
          <p className='mt-2 w-full min-w-[280px] text-center text-sm text-slate-500'>
            {t('subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
}
