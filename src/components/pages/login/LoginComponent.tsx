import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useTranslation } from 'next-i18next';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import TelegramLogin from '@/components/pages/login/TelegramLogin';
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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  const onTelegramAuth = (user: {
    first_name: string;
    last_name: string;
    username: string;
    id: number;
    hash: string;
  }) => {
    const api = new API();
    console.log(user, 'user');
    // alert(JSON.stringify(user));
    setSendingRequest(true);
    api
      .login({
        username: user.username,
        password: user.id.toString(),
      })
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

  return (
    <div className='w-sreen bg-gradient base:bg-none relative flex h-screen overflow-hidden'>
      <Script
        src='https://telegram.org/js/telegram-widget.js?9'
        data-telegram-login='uzanalitikabot'
        data-size='large'
        data-request-access='write'
        data-userpic='true'
        data-lang='en'
        data-onauth='onTelegramAuth(user)'
        strategy='lazyOnload'
      />

      <div className='border-primary fixed right-0 top-20 z-10 flex h-9 items-center justify-center overflow-hidden rounded-l-md border bg-purple-200 bg-opacity-25'>
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
      <div className='layout base:w-1/2 absolute top-5 flex w-full items-center justify-between gap-2 px-3 text-sm'>
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
      <div className='base:w-1/2  relative mt-[22vh] flex w-full items-start justify-center px-5 md:mt-[30vh]'>
        <div
          className={clsxm(
            'flex max-w-full flex-col items-start justify-start gap-6 px-2'
            // activeTab === 3 && '-mt-[400px]'
          )}
        >
          <LoginHeader activeTab={activeTab} />

          <TelegramLogin onTelegramAuth={onTelegramAuth} />
          <div className='flex w-full items-center justify-between'>
            <div className='h-[1px] w-[calc(50%-20px)] bg-slate-400'></div>
            <p>Yoki</p>
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
          {/* <LoginPhoneInputComponent
            user={user}
            activeTab={activeTab}
            currentTab={2}
            onPrevious={() => {
              setactiveTab(1);
            }}
            onNext={() => {
              setactiveTab(3);
            }}
            setUser={setUser}
          />
          <LoginPhoneConfirm
            activeTab={activeTab}
            currentTab={3}
            onPrevious={() => {
              setactiveTab(2);
            }}
            phone={user.phone_number}
            onNext={() => setactiveTab(4)}
          />
          <NewPassword
            activeTab={activeTab}
            currentTab={4}
            onNext={() => {
              router.push('/login');
              setactiveTab(1);
            }}
            user={user}
            setUser={setUser}
          /> */}
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
          <h1 className='w-full text-center font-semibold'>
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
