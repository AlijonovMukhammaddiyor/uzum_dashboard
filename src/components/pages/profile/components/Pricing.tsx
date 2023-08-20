import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Button from '@/components/shared/buttons/Button';

import { useContextState } from '@/context/Context';

function Pricing({ className }: { className?: string }) {
  const { t, i18n } = useTranslation('landing');
  const { state } = useContextState();
  const [currentPlan, setCurrentPlan] = React.useState<string>(
    t('tariffs.choosePlan')
  );
  const [months, setMonths] = React.useState<number>(1);

  const sendToRegister = (plan: string) => {
    Router.push({
      pathname: '/register',
      query: {
        plan:
          plan === t('tariffs.free')
            ? 'free'
            : plan === t('tariffs.premium')
            ? 'premium'
            : 'basic',
      },
    });
  };

  useEffect(() => {
    setCurrentPlan(t('tariffs.choosePlan'));
  }, [t, i18n.language]);

  return (
    <div
      id="ta'riflar"
      className={clsxm('flex w-full justify-center ', className)}
    >
      <div className='w-full overflow-hidden'>
        <div className='mb-4 mt-10 flex w-full items-center justify-between'>
          <div className='flex max-w-max gap-12 rounded-md'></div>
          <div className='border-primary flex h-10 w-[200px] items-center justify-between rounded-md border'>
            {/* 1 Month Option */}
            {/* {state.user?.tariff === 'trial' && (
              <p className='absolute left-[380px] top-16 text-xs'>
                {i18n.language === 'uz'
                  ? "1 kunlik sinov versiyasida do'konlarni tanlash imkoniyati mavjud emas"
                  : 'Возможность выбора магазинов недоступна в пробной версии на 1 день'}
              </p>
            )} */}
            <div
              className={clsxm(
                'flex h-full w-1/2 cursor-pointer items-center justify-center',
                months === 1
                  ? 'bg-primary rounded-l-md text-white'
                  : 'hover:rounded-l-md hover:bg-purple-100'
              )}
              onClick={() => setMonths(1)}
            >
              {i18n.language === 'uz' ? '1 oy' : '1 месяц'}
            </div>

            {/* Divider */}
            <div className='bg-primary h-full w-px self-center'></div>

            {/* 3 Months Option */}
            <div
              className={clsxm(
                'relative flex h-full w-1/2 cursor-pointer items-center justify-center',
                months === 3
                  ? 'bg-primary rounded-r-md text-white'
                  : 'hover:rounded-r-md hover:bg-purple-100'
              )}
              onClick={() => setMonths(3)}
            >
              {i18n.language === 'uz' ? '3 oy' : '3 месяца'}

              {/* Discount Tag */}
              <span className='absolute right-[-0px] top-[-20px] rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white'>
                -15%
              </span>
            </div>
          </div>
        </div>

        <div
          className={clsxm(
            'flex w-full max-w-full flex-1 items-center gap-5 overflow-x-auto p-3 px-0 lg:justify-center',
            'no-scrollbar overflow-scroll'
          )}
        >
          <Tarif
            title={t('tariffs.free')}
            price={0}
            isCurrentPlan={state.user?.tariff === 'free'}
            setCurrentPlan={setCurrentPlan}
            months={months}
            features={[
              t('tariffs.Umumiy_malumotlar'),
              // t('tariffs.Barcha_Kategoriyalar'),
              t('tariffs.Barcha_dokonlar'),
              t('tariffs.Barcha_mahsulotlar'),
              t('tariffs.24/7_doimiy_yordam'),
            ]}
            color='primary'
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
          />
          <Tarif
            title={t('tariffs.beginner')}
            isCurrentPlan={state.user?.tariff === 'base'}
            setCurrentPlan={setCurrentPlan}
            price={299000}
            months={months}
            features={[
              t('tariffs.1_dukon'),
              t('tariffs.30_kunlik'),
              // t('tariffs.Umumiy_malumotlar'),
              t('tariffs.Barcha_Kategoriyalar'),
              // t('tariffs.Kategoriya_trendi'),
              // t('tariffs.Kategoriya_mahsulotlari'),
              // t('tariffs.Ichki_kategoriyalar'),
              // t('tariffs.Kategoriya_narx_segmentatsiyasi'),
              // t('tariffs.Kategoriya_dokonlari'),
              // t('tariffs.Barcha_dokonlar'),
              // t('tariffs.Dokon_tahlili'),
              // t('tariffs.Dokon_mahsulotlari'),
              // t('tariffs.Dokon_kategoriyalari'),
              // t('tariffs.Dokon_raqobatchilari'),
              t('tariffs.Dokon_kunlik_sotuvlari'),
              // t('tariffs.Barcha_mahsulotlar'),
              // t('tariffs.Mahsulot_tahlili'),
              t('tariffs.Mahsulot_raqobatchilari'),
              t('tariffs.24/7_doimiy_yordam'),
              t('tariffs.Barcha_nishalar'),
            ]}
            color='primary'
            isPro
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
            isFreeTrial={true}
          />
          <Tarif
            title={t('tariffs.seller')}
            isCurrentPlan={state.user?.tariff === 'seller'}
            setCurrentPlan={setCurrentPlan}
            price={499000}
            months={months}
            features={[
              t('tariffs.4_dukon'),
              t('tariffs.60_kunlik'),
              // t('tariffs.Umumiy_malumotlar'),
              t('tariffs.Barcha_Kategoriyalar'),
              // t('tariffs.Kategoriya_trendi'),
              // t('tariffs.Kategoriya_mahsulotlari'),
              // t('tariffs.Ichki_kategoriyalar'),
              // t('tariffs.Kategoriya_narx_segmentatsiyasi'),
              // t('tariffs.Kategoriya_dokonlari'),
              // t('tariffs.Barcha_dokonlar'),
              // t('tariffs.Dokon_tahlili'),
              // t('tariffs.Dokon_mahsulotlari'),
              // t('tariffs.Dokon_kategoriyalari'),
              t('tariffs.Dokon_raqobatchilari'),
              t('tariffs.Dokon_kunlik_sotuvlari'),
              // t('tariffs.Barcha_mahsulotlar'),
              // t('tariffs.Mahsulot_tahlili'),
              t('tariffs.Mahsulot_raqobatchilari'),
              t('tariffs.24/7_doimiy_yordam'),
              // t('tariffs.Yangi_mahsulotlar'),
              t('tariffs.Osayotgan_mahsulotlar'),
              t('tariffs.Osayotgan_kategoriyalar'),
              t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
              t('tariffs.Barcha_nishalar'),
              t('tariffs.addsImpactCheck'),
            ]}
            color='primary'
            buttonTitle={t('tariffs.select')}
            isProPlus
            sendToRegister={sendToRegister}
          />
          <Tarif
            title={t('tariffs.business')}
            isCurrentPlan={state.user?.tariff === 'business'}
            setCurrentPlan={setCurrentPlan}
            price={899000}
            features={[
              t('tariffs.Barcha_dokonlar_full'),
              t('tariffs.90_kunlik'),
              // t('tariffs.Umumiy_malumotlar'),
              t('tariffs.Barcha_Kategoriyalar'),
              // t('tariffs.Kategoriya_trendi'),
              // t('tariffs.Kategoriya_mahsulotlari'),
              // t('tariffs.Ichki_kategoriyalar'),
              // t('tariffs.Kategoriya_narx_segmentatsiyasi'),
              // t('tariffs.Kategoriya_dokonlari'),
              // t('tariffs.Barcha_dokonlar'),
              // t('tariffs.Dokon_tahlili'),
              t('tariffs.Dokon_mahsulotlari'),
              // t('tariffs.Dokon_kategoriyalari'),
              t('tariffs.Dokon_raqobatchilari'),
              t('tariffs.Dokon_kunlik_sotuvlari'),
              // t('tariffs.Barcha_mahsulotlar'),
              // t('tariffs.Mahsulot_tahlili'),
              // t('tariffs.Mahsulot_raqobatchilari'),

              // t('tariffs.Yangi_mahsulotlar'),
              t('tariffs.Osayotgan_mahsulotlar'),
              t('tariffs.Osayotgan_kategoriyalar'),
              t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
              t('tariffs.Barcha_nishalar'),
              t('tariffs.addsImpactCheck'),
              t('tariffs.24/7_doimiy_yordam'),
            ]}
            months={months}
            color='primary'
            isEnterprise
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
            isFreeTrial={true}
          />
        </div>
        <div className='min-h-screen pb-16'>
          <div className='my-24 w-full border bg-slate-200 p-4 text-center font-semibold text-black'>
            <p>Tariflarni taqqoslash</p>
          </div>
          <PricingTable featuresData={getPricingData(t)} t={t} />
        </div>
      </div>
    </div>
  );
}

function Tarif({
  isCurrentPlan,
  title,
  price,
  features,
  color,
  buttonTitle,
  isPro,
  sendToRegister,
  isProPlus,
  isFreeTrial,
  isEnterprise,
  setCurrentPlan,
  months = 1,
}: {
  isCurrentPlan?: boolean;
  title: string;
  price: number;
  features: string[];
  color: string;
  buttonTitle?: string;
  isPro?: boolean;
  sendToRegister: (plan: string) => void;
  setCurrentPlan?: (plan: string) => void;
  isProPlus?: boolean;
  isEnterprise?: boolean;
  isFreeTrial?: boolean;
  months?: number;
}) {
  const { t, i18n } = useTranslation('landing');
  const { state } = useContextState();
  const [loading, setLoading] = useState(false);
  const features_ = [
    t('tariffs.60_kunlik'),
    t('tariffs.90_kunlik'),
    t('tariffs.30_kunlik'),
    t('tariffs.Barcha_dokonlar_full'),
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

    t('tariffs.Yangi_mahsulotlar'),
    t('tariffs.Osayotgan_mahsulotlar'),
    t('tariffs.Osayotgan_kategoriyalar'),
    t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
    t('tariffs.Barcha_nishalar'),
    t('tariffs.addsImpactCheck'),
    t('tariffs.4_dukon'),
    t('tariffs.1_dukon'),
    t('tariffs.24/7_doimiy_yordam'),
  ];

  const handlePayment = () => {
    const api = new API(null);
    if (price === 0) return;
    setLoading(true);

    api
      .post('/payments/paylink/', {
        amount: price * months,
        months,
        tariff:
          title === t('tariffs.free')
            ? 'free'
            : title === t('tariffs.beginner')
            ? 'base'
            : title === t('tariffs.seller')
            ? 'seller'
            : 'business',
      })
      .then((res) => {
        logger(res.data, 'res');
        setLoading(false);
        window.location.href = res.data.pay_link;
      })
      .catch((err) => {
        logger(err, 'err');
        setLoading(false);
      });
  };

  return (
    <div
      className={clsxm(
        'four-sided-shadow relative mt-10 flex h-[350px] max-h-[350px] w-[300px] shrink-0 flex-grow  flex-col gap-7 border  bg-white px-5  py-8',
        isProPlus && 'border-primary border'
      )}
    >
      {state.user?.tariff === 'trial' && title === t('tariffs.beginner') && (
        <p className='absolute -top-12 text-center text-sm'>
          {i18n.language === 'uz'
            ? 'Sizda ushbu tarifning 1 kunlik sinov versiyasi mavjud'
            : 'У вас есть 1-дневная пробная версия этого тарифа'}
        </p>
      )}
      <div className=' flex items-center justify-start gap-3'>
        <p className='font-primary font-semibold'>{title}</p>

        {/* Best Offer Label  */}
        {isProPlus && (
          <span className='absolute left-0 top-0 flex h-8 w-full items-center justify-center bg-blue-500 text-xs uppercase text-white'>
            {i18n.language === 'uz'
              ? 'eng yaxshi qiymat'
              : 'лучшее предложение'}
          </span>
        )}
      </div>
      <div className='relative flex flex-col gap-1 text-3xl font-medium'>
        <p className=' '>
          {/* {months === 3 && (
            <span className='text-base text-slate-500 line-through'>
              {price}
              {i18n.language === 'uz' ? "so'm/oyiga" : 'сум/месяц'}
            </span>
          )} */}
          {months === 1
            ? price.toLocaleString()
            : price === 0
            ? 0
            : Math.floor(price * 0.85).toLocaleString()}{' '}
          {i18n.language === 'uz' ? "so'm" : 'сум'}
          <span className=' text-xs  '>/{t('tariffs.month')}</span>
        </p>
        {price !== 0 ? (
          <p className='text-sm font-light text-blue-400'>
            {t('tariffs.save_15%')}
          </p>
        ) : (
          <p className='text-sm font-light text-blue-400'>
            {t('tariffs.always_free')}
          </p>
        )}
        {title === t('tariffs.free') ? (
          <p className='mt-6 h-[60px] text-sm font-light tracking-wide'>
            {t('tariffs.about_free')}
          </p>
        ) : title === t('tariffs.beginner') ? (
          <p className='mt-6 h-[60px] text-sm font-light tracking-wide'>
            {t('tariffs.about_pro')}
          </p>
        ) : title === t('tariffs.seller') ? (
          <p className='mt-6 h-[60px] text-sm font-light tracking-wide'>
            {t('tariffs.about_premium')}
          </p>
        ) : (
          <p className='mt-6 h-[60px] text-sm font-light tracking-wide'>
            {t('tariffs.about_enterprise')}
          </p>
        )}
      </div>
      <div className='w-full '>
        <Button
          onClick={() => {
            if (!isCurrentPlan) handlePayment();
          }}
          className={clsxm(
            `w-full bg-${color}  px-4 py-4 text-white`,
            !isCurrentPlan && 'hover:bg-purple-700'
          )}
          disabled={
            (isCurrentPlan || loading) && state.user?.tariff !== 'trial'
          }
          isLoading={loading}
        >
          <>
            {isCurrentPlan
              ? i18n.language === 'uz'
                ? 'Hozirgi'
                : 'Текущий'
              : t('tariffs.select')}
          </>
        </Button>
      </div>
      {/* <ul className=' flex flex-col gap-2  '>
        {ff.map((f: string) => {
          if (!features.includes(f)) return null;
          return (
            <li key={f} className='flex items-start justify-start'>
              <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              {f}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}

export default Pricing;

const PricingTable = ({
  featuresData,
  t,
}: {
  featuresData: {
    title: string;
    free: string;
    beginner: string;
    seller: string;
    business: string;
    isTitle?: boolean;
  }[];
  t: any;
}) => {
  const { i18n } = useTranslation('common');

  return (
    <div className='flex w-full flex-col border border-b-0 px-10'>
      <div className='flex h-24 shrink-0 '>
        <div className='  flex w-[500px] items-center justify-start  font-medium'>
          {t('tariffs.Umumiy_malumotlar')}
        </div>
        <div className=' flex  w-64  flex-grow items-center justify-center border-x  font-medium'>
          {t('tariffs.free')}
        </div>
        <div className=' b flex  w-64  flex-grow items-center justify-center font-medium'>
          {t('tariffs.beginner')}
        </div>
        <div className=' flex  w-64 flex-grow  items-center justify-center border-x font-medium'>
          {t('tariffs.seller')}
        </div>
        <div className=' flex  w-64 flex-grow  items-center justify-center  font-medium'>
          {t('tariffs.business')}
        </div>
      </div>
      {featuresData.map((data, idx) => (
        <div
          className={clsxm(
            'flex h-12 shrink-0 border-b',
            data.isTitle && 'h-28 border-b-0'
          )}
          key={idx}
        >
          <div
            className={clsxm(
              'flex w-[500px] items-center justify-start text-sm',
              data.isTitle && 'text-md font-medium'
            )}
          >
            {data.title}
          </div>
          <div className='flex w-64 flex-grow items-center justify-center border-x text-sm'>
            {data.free}
          </div>
          <div className='flex w-64 flex-grow items-center justify-center  text-sm'>
            {data.beginner}
          </div>
          <div className='flex w-64 flex-grow items-center justify-center border-x text-sm'>
            {data.seller}
          </div>
          <div className=' flex w-64 flex-grow items-center justify-center  text-sm'>
            {data.business}
          </div>
        </div>
      ))}
    </div>
  );
};

const getPricingData = (t: any) => {
  return [
    {
      title: t('tariffs.Malumotlar'),
      free: t('tariffs.30_kunlik'),
      beginner: t('tariffs.30_kunlik'),
      seller: t('tariffs.60_kunlik'),
      business: t('tariffs.90_kunlik'),
    },
    {
      title: t('tariffs.Jami_buyurtmalar_va_daromad_tahlili'),
      free: '✓',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Jami_mahsulotlar_va_izohlar_tahlili'),
      free: '✓',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Jami_dokonlar_va_sotuvchilar_tahlili'),
      free: '✓',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Top_5_mahsulotlar_va_dokonlar_tahlili'),
      free: '✓',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Yangi_mahsulotlar'),
      free: '',
      beginner: '',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Osayotgan_mahsulotlar'),
      free: '',
      beginner: '',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Osayotgan_kategoriyalar'),

      free: '',
      beginner: '',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Kategoriyalar'),
      free: '',
      beginner: '',
      seller: '',
      business: '',
      isTitle: true,
    },
    {
      title: t('tariffs.Barcha_Kategoriyalar'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },

    {
      title: t('tariffs.Kategoriya_trendi'),
      free: '',
      beginner: t('tariffs.30_kunlik'),
      seller: t('tariffs.60_kunlik'),
      business: t('tariffs.90_kunlik'),
    },
    {
      title: t('tariffs.Kategoriya_mahsulotlari'),
      free: '',
      beginner: '',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Kategoriya_narx_segmentatsiyasi'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },

    {
      title: t('tariffs.Ichki_kategoriyalar'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Kategoriya_dokonlari'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },

    {
      title: t('tariffs.Dokonlar'),
      free: '',
      beginner: '',
      seller: '',
      business: '',
      isTitle: true,
    },
    {
      title: t('tariffs.Barcha_dokonlar'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Dokon_tahlili'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Dokon_mahsulotlari'),

      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Dokon_kategoriyalari'),
      free: '',
      beginner: t('tariffs.1_dukon'),
      seller: t('tariffs.4_dukon'),
      business: t('tariffs.Barcha_dokonlar_full'),
    },
    {
      title: t('tariffs.Dokon_raqobatchilari'),
      free: '',
      beginner: t('tariffs.1_dukon'),
      seller: t('tariffs.4_dukon'),
      business: t('tariffs.Barcha_dokonlar_full'),
    },
    {
      title: t('tariffs.Dokon_kunlik_sotuvlari'),
      free: '',
      beginner: t('tariffs.1_dukon'),
      seller: t('tariffs.4_dukon'),
      business: t('tariffs.Barcha_dokonlar_full'),
    },
    {
      title: t('tariffs.Mahsulotlar'),
      free: '',
      beginner: '',
      seller: '',
      business: '',
      isTitle: true,
    },
    {
      title: t('tariffs.Barcha_mahsulotlar'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Mahsulot_tahlili'),
      free: '',
      beginner: t('tariffs.30_kunlik'),
      seller: t('tariffs.60_kunlik'),
      business: t('tariffs.90_kunlik'),
    },

    {
      title: t('tariffs.Mahsulot_raqobatchilari'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },

    {
      title: t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),

      free: '',
      beginner: '',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Nishalar'),
      free: '',
      beginner: '',
      seller: '',
      business: '',
      isTitle: true,
    },
    {
      title: t('tariffs.Barcha_nishalar'),

      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Reklamalar'),
      free: '',
      beginner: '',
      seller: '',
      business: '',
      isTitle: true,
    },
    {
      title: t('tariffs.addsImpactCheck'),

      free: '',
      beginner: '',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.24/7_doimiy_yordam'),

      free: ' ✓',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
  ];
};
