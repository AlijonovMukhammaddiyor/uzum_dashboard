import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import clsxm from '@/lib/clsxm';

import LoginPhoneConfirm from '@/components/pages/login/LoginCodeinput';
import LoginPhoneInputComponent from '@/components/pages/login/LoginPhoneInput';
import NewPassword from '@/components/pages/login/NewPassword';
import UserNameAndPassword from '@/components/pages/login/UserNameAndPassword';

import Logo from '@/assets/logo/logo.svg';

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
  const { i18n } = useTranslation('landing');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  return (
    <div className='w-sreen min-w-screen relative flex h-screen overflow-hidden '>
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
      <div className='base:w-1/2 bg-gradient base:bg-none relative flex w-full items-center justify-center px-5'>
        <div className='absolute top-5 flex w-full items-center justify-between gap-2 px-2 text-sm'>
          <Link href='/' className=''>
            <Logo className='h-[40px] w-[140px]' />
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
        <div
          className={clsxm(
            'relative -mt-[200px] flex max-w-full flex-col items-center justify-center gap-6 px-2'
            // activeTab === 3 && '-mt-[400px]'
          )}
        >
          <LoginHeader activeTab={activeTab} />
          <UserNameAndPassword
            activeTab={activeTab}
            currentTab={1}
            onNext={() => {
              setactiveTab(2);
            }}
            user={user}
            setUser={setUser}
          />
          <LoginPhoneInputComponent
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
          />
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
          <p className='mt-2 w-full min-w-[300px] text-center text-sm text-slate-500'>
            {t('subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
}
