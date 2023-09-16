/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillRead } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import { FiCheck } from 'react-icons/fi';
import { HiOutlineArrowDown, HiOutlineShoppingBag } from 'react-icons/hi2';

import clsxm from '@/lib/clsxm';

const SuccessPage = () => {
  const router = useRouter();
  const [t, i18n] = useTranslation('common');
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };
  return (
    <div className=' flex min-h-screen w-full items-start justify-center'>
      <div className='border-primary fixed right-0 top-20 z-10 flex h-9 items-center justify-center overflow-hidden rounded-l-md border bg-purple-200 bg-opacity-25'>
        <div
          className={clsxm(
            'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm font-semibold transition-colors duration-200',
            i18n.language === 'uz' && 'bg-primary text-white'
          )}
          onClick={() => changeLanguage('uz')}
        >
          Uz
        </div>
        <div
          className={clsxm(
            'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm font-semibold transition-colors duration-200',
            i18n.language === 'ru' && 'bg-primary text-white'
          )}
          onClick={() => changeLanguage('ru')}
        >
          Рус
        </div>
      </div>
      <div className='font-primary mx-auto mt-20  flex w-11/12 flex-col gap-16 text-center md:w-[760px]'>
        <div>
          <div className='mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl md:h-32 md:w-32'>
            <FiCheck className='text-7xl text-white' />
          </div>

          <h1 className='mb-2 tracking-normal'>
            {i18n.language === 'uz'
              ? " Siz ro'yxatdan muvaffaqiyatli o'tdingiz!"
              : 'Вы успешно зарегистрировались!'}
          </h1>
          <p>
            {i18n.language === 'uz'
              ? "Jamoamizga a'zo bo'lganligingiz uchun tashakkur!"
              : 'Спасибо за то, что присоединились к нашему сообществу!'}
          </p>
          {/* <p>
            Hozirdan boshlab siz bizning xizmatlarimizdan foydalanishingiz
            mumkin!
          </p> */}

          <p className=''>
            {i18n.language === 'uz'
              ? "Yangiliklardan xabardor bo'lish uchun bizni ijtimoiy tarmoqlarda ham kuzatib boring:"
              : 'Чтобы быть в курсе новостей, следите за нами и в социальных сетях:'}
          </p>
          <div className='mt-3 flex justify-center gap-4'>
            <Link href='https://t.me/uzum_uzanalitika' target='_blank'>
              <div className='flex  cursor-pointer items-center justify-end gap-1 rounded-md bg-blue-500 px-3 py-2 text-white transition-all duration-100 hover:bg-blue-200 hover:text-blue-500 lg:px-6'>
                <BsTelegram className='text-2xl' />
                <p className='lg:inline'>Telegram</p>
              </div>
            </Link>

            <Link href='https://www.instagram.com/uzanalitika/' target='_blank'>
              <div className='flex cursor-pointer items-center justify-end gap-1 rounded-md bg-pink-600 px-3 py-2 text-white transition-all duration-100 hover:bg-pink-200 hover:text-pink-500 lg:px-6'>
                <AiFillInstagram className='text-2xl' />
                <p className='lg:inline'>Instagram</p>
              </div>
            </Link>
          </div>

          <div className='mb-10 mt-6 flex w-full flex-col items-center justify-start gap-6 rounded-md border border-green-500  bg-green-100 px-3 py-4 md:px-6'>
            <div>
              {i18n.language === 'uz' ? (
                <div>
                  <p>
                    Hozirdan boshlab siz bizning{' '}
                    <span className='mx-1 rounded-md bg-green-50 p-1 pl-2'>
                      Boshlang'ich{' '}
                      <img
                        src='/images/tariffs/starter.png'
                        alt='starter'
                        width={20}
                        height={20}
                        className='mb-1 inline-block'
                      />
                    </span>
                    tarifimizdan (bazi bir cheklovlar bilan ) sinov sifatida
                    foydalanishingiz mumkin.
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    Теперь вы можете использовать наш сайт с тарифом
                    <span className='mx-1 rounded-md bg-green-50 p-1 pl-2'>
                      Стартер{' '}
                      <img
                        src='/images/tariffs/starter.png'
                        alt='starter'
                        width={20}
                        height={20}
                        className='mb-1 inline-block'
                      />
                    </span>{' '}
                    (с некоторыми ограничениями) в качестве бесплатного пробного
                    периода.
                  </p>
                </div>
              )}
            </div>
          </div>
          <HiOutlineArrowDown className=' mx-auto my-12 text-5xl' />
          <div className=' flex items-center justify-center gap-12'>
            <div className='flex items-center justify-start gap-2 '>
              {/* <MdArrowForwardIos className=' text-4xl' /> */}
              <Link
                href='/home'
                className='text-md flex items-center gap-1 border-b-2 border-white transition-all duration-100 hover:text-blue-500 md:text-2xl '
              >
                <AiOutlineHome className='' />
                {i18n.language === 'uz' ? 'Boshlash' : 'Начните здесь'}
              </Link>
            </div>
            <div className='flex items-center justify-start gap-2 '>
              {/* <MdArrowForwardIos className=' text-4xl ' /> */}
              <Link
                href='/products'
                className='text-md flex items-center gap-1 border-b-2 border-white transition-all duration-100 hover:text-blue-500 md:text-2xl '
              >
                <HiOutlineShoppingBag className='' />{' '}
                {i18n.language === 'uz' ? 'Mahsulotlar' : 'Продукты'}
              </Link>
            </div>
            <div className='flex items-center justify-start gap-2 '>
              {/* <MdArrowForwardIos className=' text-4xl ' /> */}
              <Link
                href='/profile'
                className='text-md flex items-center gap-1 border-b-2 border-white transition-all duration-100 hover:text-blue-500 md:text-2xl '
              >
                <BsPerson className='' />
                {i18n.language === 'uz' ? 'Shaxsiy kabinet' : 'Мой кабинет'}
              </Link>
            </div>
          </div>
        </div>
        <div className={clsxm('flex flex-col gap-8', 'hidden')}>
          <div className='flex flex-col gap-3 rounded-lg border border-black p-5 '>
            <div className='flex justify-between'>
              <p className='flex items-center gap-2 text-green-800'>
                <AiFillRead className='text-2xl' /> blog
              </p>
              <p>o`qish</p>
            </div>
            <h3 className='font-semibold md:text-xl '>
              Online bozorda muvaffaqiyatni ta'minlash: Analitika
            </h3>
            <p className='text-slate-500'>
              Zamonaviy online bozorda muvaffaqiyatli bo`lish uchun nimalarga
              e'tibor berish kerakligini bilish juda muhim.
            </p>
          </div>

          <div className='flex flex-col gap-3 rounded-lg border border-black p-5 '>
            <div className='flex justify-between'>
              <p className='flex items-center gap-2 text-green-800'>
                <AiFillRead className='text-2xl' /> blog
              </p>
              <p>o`qish</p>
            </div>
            <h3 className='font-semibold md:text-xl'>
              Online bozorda muvaffaqiyatni ta'minlash: Analitika
            </h3>
            <p className='text-slate-500'>
              Zamonaviy online bozorda muvaffaqiyatli bo`lish uchun nimalarga
              e'tibor berish kerakligini bilish juda muhim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'uz', ['common'], null, [
        'uz',
        'ru',
      ])),
    },
  };
}
