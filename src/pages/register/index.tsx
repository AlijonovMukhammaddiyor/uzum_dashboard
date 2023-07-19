import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import NamesAndEmailComponent from '@/components/pages/landing/register/NameInput';
import PhoneConfirm from '@/components/pages/landing/register/PhoneConfirm';
import PhoneInputComponent from '@/components/pages/landing/register/PhoneInput';
import Seo from '@/components/Seo';

import free from '@/assets/landing/free.png';
import star from '@/assets/landing/star.png';
import starter from '@/assets/landing/starter.png';
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
    fingerprint?: string;
  }>({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    referred_by: '',
    fingerprint: '',
  });

  return (
    <div className='flex h-screen w-screen'>
      <div className='base:w-1/2 bg-gradient base:bg-none relative flex w-full items-center justify-center overflow-hidden px-5'>
        <Link href='/' className='absolute left-6 top-3 z-10'>
          <Logo className='h-[40px] w-[110px]' />
        </Link>
        <div
          className={clsxm(
            'relative -mt-[200px] flex max-w-full flex-col items-center justify-center gap-6 px-2',
            activeTab === 3 && '-mt-[400px]',
            'bg-gradient base:bg-none'
          )}
        >
          <RegisterHeader plan={plan as string} />
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

      <div className='bg-gradient base:flex hidden w-1/2 flex-1 bg-opacity-10'></div>
    </div>
  );
};

function RegisterHeader({ plan }: { plan: string }) {
  return (
    <div className='flex w-full max-w-sm flex-col items-center justify-center gap-6 px-2'>
      <Seo />
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
            plan === 'premium'
              ? 'bg-primary'
              : plan === 'basic'
              ? 'bg-blue-500'
              : 'bg-green-500'
          )}
        ></span>
        <p
          className={clsxm(
            'mx-3 flex items-center justify-start gap-2',
            plan === 'premium'
              ? 'text-primary'
              : plan === 'basic'
              ? 'text-blue-500'
              : 'text-green-500'
          )}
        >
          {plan === 'premium' ? (
            <Image src={star} alt='premium-star' className='h-5 w-5' />
          ) : plan === 'basic' ? (
            <Image src={starter} alt='premium-star' className='h-5 w-5' />
          ) : (
            <Image src={free} alt='premium-star' className='h-5 w-5' />
          )}
          {plan === 'premium'
            ? 'Premium'
            : plan === 'basic'
            ? "Boshlang'ich"
            : 'Bepul'}
        </p>

        <span
          className={clsxm(
            'h-px flex-1 bg-slate-300',
            plan === 'premium'
              ? 'bg-primary'
              : plan === 'basic'
              ? 'bg-blue-500'
              : 'bg-green-500'
          )}
        ></span>
      </div>
    </div>
  );
}

export default Register;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    try {
      const api = new API(context);
      // check if user is logged in
      const res = await api.getCurrentUser();

      if (res) {
        return {
          redirect: {
            permanent: false,
            destination: '/home',
          },
          props: {},
        };
      }
      return {
        props: {},
      };
    } catch (e) {
      return {
        props: {},
      };
    }
  } catch (e) {
    return {
      props: {},
    };
  }
}
