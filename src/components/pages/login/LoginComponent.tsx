import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import clsxm from '@/lib/clsxm';

import LoginPhoneConfirm from '@/components/pages/login/LoginCodeinput';
import LoginPhoneInputComponent from '@/components/pages/login/LoginPhoneInput';
import NewPassword from '@/components/pages/login/NewPassword';
import UserNameAndPassword from '@/components/pages/login/UserNameAndPassword';

import Logo from '@/assets/logo/logo.svg';

function LoginComponent() {
  const router = useRouter();
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

  return (
    <div className='w-sreen flex h-screen overflow-hidden'>
      <div className='base:w-1/2 bg-gradient base:bg-none relative flex w-full items-center justify-center px-5'>
        <div className='layout absolute top-5 flex items-center justify-between gap-2 text-sm'>
          <Link href='/' className=''>
            <Logo className='h-[40px] w-[140px]' />
          </Link>
          <div className='flex items-center justify-end gap-2'>
            <p className='hidden text-xs lg:block'>Hali akkauntingiz yo'qmi?</p>
            <p>
              <Link
                href='/register'
                className='rounded-2xl border border-slate-400 px-2 py-1'
              >
                <span className='text-primary'>Ro'yxatdan o'ting</span>
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
  return (
    <div className='flex w-full max-w-sm flex-col items-center justify-center gap-6 px-2'>
      <div className=''>
        <div className='flex w-full flex-col items-start'>
          <h1 className='w-full text-center font-semibold'>
            {activeTab === 1 ? 'Kirish' : 'Parolni Yangilash'}
          </h1>
        </div>
        <div className='flex items-center justify-start'>
          <p className='mt-2 w-full text-center text-sm text-slate-500'>
            Sizga xizmat ko'rsatishdan mamnunmiz!
          </p>
        </div>
      </div>
    </div>
  );
}
