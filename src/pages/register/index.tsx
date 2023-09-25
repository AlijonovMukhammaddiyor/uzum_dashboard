/* eslint-disable @next/next/no-img-element */
import jsonwebtoken from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Loading from '@/components/Loading';
import NamesAndEmailComponent from '@/components/pages/register/NameInput';
import Seo from '@/components/Seo';

import Logo from '@/assets/landing/main.png';

const Register = () => {
  const router = useRouter();
  // plan will later be used to determine which plan the user is registering for
  const { plan } = router.query;
  const [sending, setSending] = React.useState(false);

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
    <div
      className='min-w-screen relative flex min-h-screen w-full justify-start'
      id='register'
    >
      <div className='border-primary fixed right-0 top-5 z-10 flex h-9 items-center justify-center overflow-hidden rounded-l-md border bg-purple-200 bg-opacity-25'>
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
      <div className='base:w-1/2 base:bg-none relative flex w-full flex-col items-center justify-center overflow-hidden px-5 pb-10'>
        <Link
          href='/'
          className='z-10 mb-6 flex w-full items-center justify-start p-5'
        >
          {/* <Logo className='h-[50px] w-28 sm:w-32 md:w-56' /> */}
          <Image
            src={Logo}
            alt='logo'
            width={200}
            height={50}
            className='w-28 md:w-36'
          />
        </Link>
        <div
          className={clsxm(
            'relative flex max-w-full flex-col items-center justify-center gap-6 px-2',
            'base:bg-none'
          )}
        >
          <RegisterHeader plan={plan as string} />
          <NamesAndEmailComponent
            sendingRequest={sending}
            setSendingRequest={setSending}
          />
        </div>
      </div>
      {sending && <Loading />}
      <div className='bg-gradient base:flex hidden w-1/2 flex-1 bg-opacity-10'></div>
    </div>
  );
};

function RegisterHeader({ plan }: { plan: string }) {
  const { t } = useTranslation('register');
  const { t: t2 } = useTranslation('landing');

  return (
    <div className='flex w-full max-w-sm flex-col items-center justify-center gap-6 px-2'>
      <Seo />
      <div className=''>
        <div className='flex w-full flex-col items-start'>
          <h1 className='base:text-2xl w-full text-center text-xl font-semibold'>
            {t('title')}
          </h1>
        </div>
        <div className='flex items-center justify-start'>
          <p className='mt-2 w-full min-w-[300px] text-center text-sm text-slate-500'>
            {t('subtitle')}
          </p>
        </div>
      </div>
      <div className='flex w-full items-center justify-between text-sm text-slate-300'>
        <span
          className={clsxm('h-px flex-1 bg-slate-300', 'bg-blue-500')}
        ></span>
        <p
          className={clsxm(
            'mx-3 flex items-center justify-start gap-2',
            'text-blue-500'
          )}
        >
          <img
            src='/images/tariffs/starter.png'
            alt='premium-star'
            className='h-5 w-5'
          />

          {t2('tariffs.beginner')}
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
    const refresh = context.req.cookies.refresh;
    try {
      if (!refresh) throw new Error('No refresh token');

      // SECRET_KEY should be the same secret key you used to sign the JWT.
      const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

      // To decode and verify
      const _ = jsonwebtoken.verify(refresh, SECRET_KEY as string);

      return {
        redirect: {
          permanent: false,
          destination: '/home',
        },
        props: {
          ...(await serverSideTranslations(
            context.locale || 'uz',
            ['common', 'register', 'landing'],
            null,
            ['uz', 'ru']
          )),
        },
      };
    } catch (error) {
      return {
        props: {
          ...(await serverSideTranslations(
            context.locale || 'uz',
            ['common', 'register', 'landing'],
            null,
            ['uz', 'ru']
          )),
        },
      };
    }
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(
          context.locale || 'uz',
          ['common', 'register', 'landing'],
          null,
          ['uz', 'ru']
        )),
      },
    };
  }
}
