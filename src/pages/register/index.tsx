import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import clsxm from '@/lib/clsxm';

import NamesAndEmailComponent from '@/components/pages/landing/register/NameInput';
import PhoneConfirm from '@/components/pages/landing/register/PhoneConfirm';
import PhoneInputComponent from '@/components/pages/landing/register/PhoneInput';

import free from '@/assets/landing/free.png';
import star from '@/assets/landing/star.png';
import Logo from '@/assets/logo/logo.svg';

const Register = () => {
  const router = useRouter();
  // plan will later be used to determine which plan the user is registering for
  const { plan } = router.query;
  const [activeTab, setactiveTab] = React.useState(1);
  const [user, setUser] = React.useState<{
    username: string;
    email?: string;
    password: string;
    phone_number: string;
    referred_by?: string;
    fingerprint: string;
  }>({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    referred_by: '',
    fingerprint: '',
  });

  return (
    <div className='relative flex min-h-screen w-screen'>
      <Link href='/' className='absolute left-6 top-3'>
        <Logo className='h-[40px] w-[110px]' />
      </Link>
      <div className='flex w-1/2 items-center justify-center'>
        <div
          className={clsxm(
            'max-h-sm relative -mt-[200px] flex max-w-sm flex-col items-center justify-center gap-6 px-2',
            activeTab === 3 && '-mt-[400px]'
          )}
        >
          <RegisterHeader plan={plan as string} />
          <div className='relative flex w-[400px] items-start justify-start'>
            <PhoneInputComponent
              user={user}
              activeTab={activeTab}
              currentTab={1}
              onNext={() => {
                setactiveTab(2);
              }}
              setUser={setUser}
            />
            <PhoneConfirm
              activeTab={activeTab}
              currentTab={2}
              onNext={() => {
                setactiveTab(3);
              }}
              onPrevious={() => {
                setactiveTab(1);
              }}
              phone={user.phone_number}
            />
            <NamesAndEmailComponent
              activeTab={activeTab}
              currentTab={3}
              onPrevious={() => {
                setactiveTab(2);
              }}
              user={user}
              setUser={setUser}
            />
          </div>
        </div>
      </div>

      <div className='bg-gradient hidden w-1/2 flex-1 bg-opacity-10 md:flex'></div>
    </div>
  );
};

function RegisterHeader({ plan }: { plan: string }) {
  return (
    <div className='flex w-full max-w-sm flex-col items-center justify-center gap-6 px-2'>
      <div className=''>
        <div className='flex w-full flex-col items-start'>
          <h1 className='w-full text-center font-semibold'>
            Ro'yxatdan o'tish
          </h1>
        </div>
        <div className='flex items-center justify-start'>
          <p className='mt-2 w-full text-center text-sm text-slate-500'>
            Sizga xizmat ko'rsatishdan mamnunmiz!
          </p>
        </div>
      </div>
      <div className='flex w-full items-center justify-between text-sm text-slate-300'>
        <span
          className={clsxm(
            'h-px flex-1 bg-slate-300',
            plan === 'premium' ? 'bg-primary' : 'bg-blue-500'
          )}
        ></span>
        <p
          className={clsxm(
            'mx-3 flex items-center justify-start gap-2',
            plan === 'premium' ? 'text-primary' : 'text-blue-500'
          )}
        >
          {plan === 'premium' ? (
            <Image src={star} alt='premium-star' className='h-5 w-5' />
          ) : (
            <Image src={free} alt='premium-star' className='h-5 w-5' />
          )}
          {plan === 'premium' ? 'Premium' : 'Bepul'}
        </p>

        <span
          className={clsxm(
            'h-px flex-1 bg-slate-300',
            plan === 'premium' ? 'bg-primary' : 'bg-blue-500'
          )}
        ></span>
      </div>
    </div>
  );
}

export default Register;
