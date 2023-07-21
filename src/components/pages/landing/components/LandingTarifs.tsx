import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { IoCheckmarkSharp, IoCloseOutline } from 'react-icons/io5';

import clsxm from '@/lib/clsxm';

import Button from '@/components/shared/buttons/Button';

import Logo from '@/assets/logo/logo_only.svg';

function LandingTarifs() {
  const { t } = useTranslation('landing');

  const sendToRegister = (plan: string) => {
    Router.push({
      pathname: '/register',
      query: {
        plan:
          plan === 'Bepul' ? 'free' : plan === 'Premium' ? 'premium' : 'basic',
      },
    });
  };

  return (
    <div id="ta'riflar" className='flex w-full justify-center  py-28'>
      <div className='md:layout w-full overflow-hidden'>
        <div className='bg-linear-dark layout mb-6 rounded-md p-5 text-center shadow-xl md:w-full'>
          {/* <p className='font-primary text-center text-2xl text-white'>
            <span className='text-4xl'>🎉</span> Har bir taklif qilgan
            do'stingiz uchun <span className='text-3xl'>$3</span> chegirmaga ega
            bo'ling
          </p> */}
          <p className='font-primary text-center text-2xl text-white'>
            <span className='text-4xl'>🎉</span> {t('referral.title')}
          </p>
          <p className='mt-5  text-[#fff]'>{t('referral.subtitle1')}</p>
          <p className='mt-5 w-full text-left text-[#fff]'>
            {t('referral.subtitle2')}
          </p>
          <p className='mt-3 w-full text-left text-white'>
            {t('referral.subtitle3')}
          </p>
        </div>
        <div
          className={clsxm(
            'flex w-full max-w-full flex-1 items-start gap-4 p-3',
            'no-scrollbar overflow-scroll'
            // 'flex-col md:flex-row'
          )}
        >
          <div className='flex-1'></div>

          <Tarif
            title='Bepul'
            price='$0'
            features={[
              t('tariffs.Umumiy_malumotlar'),
              t('tariffs.Barcha_Kategoriyalar'),
              t('tariffs.Barcha_dokonlar'),
              t('tariffs.Barcha_mahsulotlar'),
              t('tariffs.24/7_doimiy_yordam'),
            ]}
            color='primary'
            buttonTitle='Hoziroq boshlang'
            sendToRegister={sendToRegister}
          />
          <div className='flex-1'></div>
          <Tarif
            title='Pro'
            price='$30'
            features={[
              t('tariffs.30_kunlik'),
              t('tariffs.Umumiy_malumotlar'),
              t('tariffs.Barcha_Kategoriyalar'),
              t('tariffs.Kategoriya_trendi'),
              t('tariffs.Kategoriya_mahsulotlari'),
              t('tariffs.Ichki_kategoriyalar'),
              t('tariffs.Kategoriya_narx_segmentatsiyasi'),
              t('tariffs.Kategoriya_dokonlari'),
              t('tariffs.Barcha_dokonlar'),
              t('tariffs.Dokon_tahlili'),
              t('tariffs.Dokon_mahsulotlari'),
              t('tariffs.Dokon_kategoriyalari'),
              t('tariffs.Dokon_raqobatchilari'),
              t('tariffs.Dokon_kunlik_sotuvlari'),
              t('tariffs.Barcha_mahsulotlar'),
              t('tariffs.Mahsulot_tahlili'),
              t('tariffs.Mahsulot_raqobatchilari'),
              t('tariffs.24/7_doimiy_yordam'),
            ]}
            color='primary'
            isPro
            buttonTitle='Hoziroq boshlang'
            sendToRegister={sendToRegister}
          />
          <div className='flex-1'></div>
          <Tarif
            title='Premium'
            price='$40'
            features={[
              t('tariffs.Umumiy_malumotlar'),
              t('tariffs.Barcha_Kategoriyalar'),
              t('tariffs.Kategoriya_trendi'),
              t('tariffs.Kategoriya_mahsulotlari'),
              t('tariffs.Ichki_kategoriyalar'),
              t('tariffs.Kategoriya_narx_segmentatsiyasi'),
              t('tariffs.Kategoriya_dokonlari'),
              t('tariffs.Barcha_dokonlar'),
              t('tariffs.Dokon_tahlili'),
              t('tariffs.Dokon_mahsulotlari'),
              t('tariffs.Dokon_kategoriyalari'),
              t('tariffs.Dokon_raqobatchilari'),
              t('tariffs.Dokon_kunlik_sotuvlari'),
              t('tariffs.Barcha_mahsulotlar'),
              t('tariffs.Mahsulot_tahlili'),
              t('tariffs.Mahsulot_raqobatchilari'),
              t('tariffs.24/7_doimiy_yordam'),
              t('tariffs.Yangi_mahsulotlar'),
              t('tariffs.Osayotgan_mahsulotlar'),
              t('tariffs.Osayotgan kategoriyalar'),
              t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
            ]}
            color='primary'
            buttonTitle='Hoziroq boshlang'
            isProPlus
            sendToRegister={sendToRegister}
          />
          <div className='flex-1'></div>
        </div>
      </div>
    </div>
  );
}

function Tarif({
  title,
  price,
  features,
  color,
  buttonTitle,
  isPro,
  sendToRegister,
  isProPlus,
}: {
  title: string;
  price: string;
  features: string[];
  color: string;
  buttonTitle?: string;
  isPro?: boolean;
  sendToRegister: (plan: string) => void;
  isProPlus?: boolean;
}) {
  const { t } = useTranslation('landing');
  const { i18n } = useTranslation('landing');
  const features_ = [
    t('tariffs.Umumiy_malumotlar'),
    t('tariffs.Barcha_Kategoriyalar'),
    t('tariffs.Kategoriya_trendi'),
    t('tariffs.Kategoriya_mahsulotlari'),
    t('tariffs.Ichki_kategoriyalar'),
    t('tariffs.Kategoriya_narx_segmentatsiyasi'),
    t('tariffs.Kategoriya_dokonlari'),
    t('tariffs.Barcha_dokonlar'),
    t('tariffs.Dokon_tahlili'),
    t('tariffs.Dokon_mahsulotlari'),
    t('tariffs.Dokon_kategoriyalari'),
    t('tariffs.Dokon_raqobatchilari'),
    t('tariffs.Dokon_kunlik_sotuvlari'),
    t('tariffs.Barcha_mahsulotlar'),
    t('tariffs.Mahsulot_tahlili'),
    t('tariffs.Mahsulot_raqobatchilari'),
    t('tariffs.24/7_doimiy_yordam'),
    t('tariffs.Yangi_mahsulotlar'),
    t('tariffs.Osayotgan_mahsulotlar'),
    t('tariffs.Osayotgan kategoriyalar'),
    t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
  ];

  const ff = features_;

  return (
    <div
      className={clsxm(
        'flex h-[920px] max-h-[920px] w-[280px] min-w-[220px] shrink-0 flex-col items-center justify-between overflow-hidden rounded-lg border border-slate-300 bg-white',
        isProPlus && 'bg-gradient',
        'border-2 border-blue-500',
        i18n.language === 'ru' && 'h-[980px] max-h-[980px]'
      )}
    >
      <div className='w-full'>
        <div className='mb-2 flex items-center justify-between gap-3 border-b-2 border-blue-500 bg-blue-100 px-6 py-5 text-center text-xl font-bold'>
          <div className='flex items-center justify-start gap-3'>
            <Logo className='inline-block h-6 w-6' />
            <p className='font-primary font-bold'>{title}</p>
          </div>
          <div className='text-2xl font-bold'>{price}</div>
        </div>
        <ul className='mt-6 flex flex-col gap-2 pl-6'>
          {isPro && (
            <li className='flex items-start justify-start'>
              <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              {t('tariffs.30_kunlik')}
            </li>
          )}
          {isProPlus && (
            <li className='flex items-start justify-start'>
              <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              {t('tariffs.60_kunlik')}
            </li>
          )}
          {ff.map((f: string) => (
            <li key={f} className='flex items-start justify-start'>
              {/* <GiCheckMark className='text-primary mr-2 inline-block h-5 w-5' /> */}
              {features.includes(f) ? (
                <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              ) : (
                <IoCloseOutline className='mr-2 inline-block h-5 w-5 text-red-500' />
              )}
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full px-6 py-3'>
        <Button
          onClick={() => sendToRegister(title)}
          className={clsxm(
            `bg-${color} w-full rounded px-4 py-2 text-white hover:bg-purple-700`
            // !isPro && 'bg-blue-500'
          )}
          // disabled={isProPlus}
        >
          {buttonTitle ? buttonTitle : `Buy ${price}` || 'Buy'}
        </Button>
      </div>
    </div>
  );
}

export default LandingTarifs;
