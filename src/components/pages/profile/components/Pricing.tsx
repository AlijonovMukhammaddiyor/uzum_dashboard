import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Button from '@/components/shared/buttons/Button';

function Pricing({ className }: { className?: string }) {
  const { t, i18n } = useTranslation('landing');
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
      <div className=' w-full overflow-hidden'>
        <div className='mb-4 mt-10 flex w-full items-center justify-between'>
          <div className='flex max-w-max gap-12 rounded-md'></div>
          <div className='border-primary flex h-10 w-[200px] items-center justify-between rounded-md border'>
            {/* 1 Month Option */}
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
            isCurrentPlan={currentPlan === t('tariffs.free')}
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
            title={t('tariffs.pro')}
            isCurrentPlan={currentPlan === t('tariffs.pro')}
            setCurrentPlan={setCurrentPlan}
            price={39}
            months={months}
            features={[
              t('tariffs.2_dukon'),
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
              t('tariffs.nishesSelection'),
            ]}
            color='primary'
            isPro
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
            isFreeTrial={true}
          />
          <Tarif
            title={t('tariffs.premium')}
            isCurrentPlan={currentPlan === t('tariffs.premium')}
            setCurrentPlan={setCurrentPlan}
            price={59}
            months={months}
            features={[
              t('tariffs.5_dukon'),
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
              t('tariffs.Osayotgan kategoriyalar'),
              t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
              t('tariffs.nishesSelection'),
              t('tariffs.addsImpactCheck'),
            ]}
            color='primary'
            buttonTitle={t('tariffs.select')}
            isProPlus
            sendToRegister={sendToRegister}
          />
          <Tarif
            title={t('tariffs.enterprise')}
            isCurrentPlan={currentPlan === t('tariffs.enterprise')}
            setCurrentPlan={setCurrentPlan}
            price={99}
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
              t('tariffs.Osayotgan kategoriyalar'),
              t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
              t('tariffs.nishesSelection'),
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
        <div className='min-h-screen'>
          <div className='bg-primary my-24 w-full p-4 text-center font-semibold text-white'>
            <p>Tariflarni taqqoslash</p>
          </div>
          <PricingTable featuresData={getPricingData(t)} />
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
    t('tariffs.Osayotgan kategoriyalar'),
    t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
    t('tariffs.nishesSelection'),
    t('tariffs.addsImpactCheck'),
    t('tariffs.5_dukon'),
    t('tariffs.2_dukon'),
    t('tariffs.24/7_doimiy_yordam'),
  ];

  const ff = features_;

  const dollarToSumRate = 12107;

  const handlePayment = () => {
    const api = new API(null);
    setLoading(true);
    api
      .post('/payments/paylink/', {
        amount: price * dollarToSumRate,
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
        'four-sided-shadow relative mt-10 flex h-[800px] max-h-[800px] w-[300px] shrink-0 flex-grow  flex-col gap-7 border  bg-white px-5  py-8',
        isProPlus && 'border-primary translate-y-[-50px] border'
      )}
    >
      <div className=' flex items-center justify-start gap-3'>
        <p className='font-primary font-semibold'>{title}</p>

        {/* Best Offer Label  */}
        {isProPlus && (
          <span className='absolute left-0 top-0 flex h-8 w-full items-center justify-center bg-green-500 text-xs uppercase text-white'>
            {i18n.language === 'uz'
              ? 'eng yaxshi qiymat'
              : 'лучшее предложение'}
          </span>
        )}
      </div>
      <div className='relative flex flex-col gap-1 text-3xl font-medium'>
        <p className=' '>
          <span className='text-3xl font-normal'>$</span>
          {months === 1
            ? price
            : price === 0
            ? 0
            : Math.floor(price * 0.85)}{' '}
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
        {price === 0 ? (
          <p className='mt-6 h-[60px] text-sm font-light tracking-wide'>
            {t('tariffs.about_free')}
          </p>
        ) : price === 39 ? (
          <p className='mt-6 h-[60px] text-sm font-light tracking-wide'>
            {t('tariffs.about_pro')}
          </p>
        ) : price === 59 ? (
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
          onClick={() => handlePayment()}
          className={clsxm(
            `w-full bg-${color}  px-4 py-4 text-white hover:bg-purple-700`
          )}
          isLoading={loading}
        >
          <>{t('tariffs.select')}</>
        </Button>
      </div>
      <ul className=' flex flex-col gap-2  '>
        {ff.map((f: string) => {
          if (!features.includes(f)) return null;
          return (
            <li key={f} className='flex items-start justify-start'>
              <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              {f}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pricing;

const PricingTable = ({
  featuresData,
}: {
  featuresData: {
    title: string;
    free: string;
    pro: string;
    premium: string;
    enterprise: string;
    isTitle?: boolean;
  }[];
}) => {
  const { i18n } = useTranslation('common');

  return (
    <div className='flex w-full flex-col border px-10'>
      <div className='flex shrink-0'>
        <div className='  flex w-[500px] items-center justify-start  font-medium'>
          {i18n.language === 'uz' ? 'Xizmatlar' : 'Услуги'}
        </div>
        <div className=' flex h-24 w-64  flex-grow items-center justify-center border-x  font-medium'>
          Free
        </div>
        <div className=' b flex h-24 w-64  flex-grow items-center justify-center font-medium'>
          Pro
        </div>
        <div className=' flex h-24 w-64 flex-grow  items-center justify-center border-x font-medium'>
          Premium
        </div>
        <div className=' flex h-24 w-64 flex-grow  items-center justify-center  font-medium'>
          Enterprise
        </div>
      </div>
      {featuresData.map((data, idx) =>
        data.isTitle ? (
          <div className='flex shrink-0 border-t' key={idx}>
            <div className='flex w-[500px] items-center justify-start text-sm'>
              {data.title}
            </div>
          </div>
        ) : (
          <div className='flex shrink-0 border-t' key={idx}>
            <div className='flex w-[500px] items-center justify-start text-sm'>
              {data.title}
            </div>
            <div className='flex h-12 w-64 flex-grow items-center justify-center border-x text-sm'>
              {data.free}
            </div>
            <div className='flex h-12 w-64 flex-grow items-center justify-center  text-sm'>
              {data.pro}
            </div>
            <div className='flex h-12 w-64 flex-grow items-center justify-center border-x text-sm'>
              {data.premium}
            </div>
            <div className=' flex h-12 w-64 flex-grow items-center justify-center  text-sm'>
              {data.enterprise}
            </div>
          </div>
        )
      )}
    </div>
  );
};

const getPricingData = (t: any) => {
  return [
    {
      title: t('tariffs.Umumiy_malumotlar'),
      free: '✓',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
      isTitle: true,
    },
    {
      title: t('tariffs.Barcha_Kategoriyalar'),
      free: '✓',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },

    {
      title: t('tariffs.Barcha_dokonlar'),
      free: '✓',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Barcha_mahsulotlar'),
      free: '✓',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.24/7_doimiy_yordam'),

      free: '✓',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },

    {
      title: t('tariffs.Barcha_dokonlar_full'),
      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Kategoriya_trendi'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Kategoriya_mahsulotlari'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Ichki_kategoriyalar'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Kategoriya_narx_segmentatsiyasi'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Kategoriya_dokonlari'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Dokon_tahlili'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Dokon_mahsulotlari'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Dokon_kategoriyalari'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Dokon_raqobatchilari'),
      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Dokon_kunlik_sotuvlari'),
      free: '',
      pro: t('tariffs.2_dukon'),
      premium: t('tariffs.5_dukon'),
      enterprise: t('tariffs.Barcha_dokonlar_full'),
    },
    {
      title: t('tariffs.Barcha_mahsulotlar'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Yangi_mahsulotlar'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Osayotgan_mahsulotlar'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Osayotgan kategoriyalar'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },

    {
      title: t('tariffs.Mahsulot_tahlili'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.Mahsulot_raqobatchilari'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.nishesSelection'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.addsImpactCheck'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
    {
      title: t('tariffs.24/7_doimiy_yordam'),

      free: '',
      pro: '✓',
      premium: '✓',
      enterprise: '✓',
    },
  ];
};
