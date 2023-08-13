import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import Select from 'react-select';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Button from '@/components/shared/buttons/Button';

import Logo from '@/assets/logo/logo_only.svg';

function Tarifs({ className }: { className?: string }) {
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
          <div className='flex max-w-max gap-12 rounded-md'>
            {/* <Select
              className='basic-single  w-[300px] cursor-pointer rounded-md focus:outline-none focus:ring-0'
              classNamePrefix='select'
              defaultValue={{
                value: currentPlan,
                label: currentPlan,
              }}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              styles={{
                dropdownIndicator: (provided) => ({
                  ...provided,
                  svg: {
                    fill: 'white',
                  },
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(119, 67, 219, 1)',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white', // This changes the text color of the selected value
                }),
                option: (provided) => ({
                  ...provided,
                  color: 'black', // This changes the text color of the options
                }),
              }}
              onChange={(e) => {
                setCurrentPlan(e?.value ?? t('tariffs.free'));
              }}
              name='color'
              options={[
                { value: t('tariffs.free'), label: t('tariffs.free') },
                { value: t('tariffs.pro'), label: t('tariffs.pro') },
                { value: t('tariffs.premium'), label: t('tariffs.premium') },
                {
                  value: t('tariffs.enterprise'),
                  label: t('tariffs.enterprise'),
                },
              ]}
            /> */}
            <Select
              className='basic-single w-[300px] cursor-pointer rounded-md focus:outline-none focus:ring-0'
              classNamePrefix='select'
              defaultValue={{
                value: t('tariffs.choosePayment'),
                label: t('tariffs.choosePayment'),
              }}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              styles={{
                dropdownIndicator: (provided) => ({
                  ...provided,
                  svg: {
                    fill: 'white',
                  },
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(119, 67, 219, 1)',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white', // This changes the text color of the selected value
                }),
                option: (provided) => ({
                  ...provided,
                  color: 'black', // This changes the text color of the options
                }),
              }}
              onChange={(e) => {
                // setCurrentPlan(e?.value ?? t('tariffs.free'));
              }}
              name='color'
              options={[
                { value: 'PayMe', label: 'PayMe' },
                { value: 'Click', label: 'Click' },
              ]}
            />

            {/* <button className='bg-primary h-10 rounded-md px-7 py-2 text-white hover:bg-purple-700'>
              {t('tariffs.pay')}
            </button> */}
          </div>
          <div className='border-primary flex h-10 w-[200px] items-center justify-between rounded-full border'>
            {/* 1 Month Option */}
            <div
              className={clsxm(
                'flex h-full w-1/2 cursor-pointer items-center justify-center',
                months === 1
                  ? 'bg-primary rounded-l-full text-white'
                  : 'hover:rounded-l-full hover:bg-purple-100'
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
                  ? 'bg-primary rounded-r-full text-white'
                  : 'hover:rounded-r-full hover:bg-purple-100'
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
            'flex w-full max-w-full flex-1 items-start justify-start gap-12 overflow-x-auto p-3 px-0',
            'no-scrollbar overflow-scroll'
            // 'flex-col md:flex-row'
          )}
        >
          {/* <div className='flex-1'></div> */}
          <Tarif
            title={t('tariffs.free')}
            price={0}
            isCurrentPlan={currentPlan === t('tariffs.free')}
            setCurrentPlan={setCurrentPlan}
            months={months}
            features={[
              t('tariffs.Umumiy_malumotlar'),
              t('tariffs.Barcha_Kategoriyalar'),
              t('tariffs.Barcha_dokonlar'),
              t('tariffs.Barcha_mahsulotlar'),
              t('tariffs.24/7_doimiy_yordam'),
            ]}
            color='primary'
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
          />
          {/* <div className='flex-1'></div> */}
          <Tarif
            title={t('tariffs.pro')}
            isCurrentPlan={currentPlan === t('tariffs.pro')}
            setCurrentPlan={setCurrentPlan}
            price={39}
            months={months}
            features={[
              t('tariffs.2_dukon'),
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
              t('tariffs.nishesSelection'),
            ]}
            color='primary'
            isPro
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
            isFreeTrial={true}
          />
          {/* <div className='flex-1'></div> */}
          <Tarif
            title={t('tariffs.premium')}
            isCurrentPlan={currentPlan === t('tariffs.premium')}
            setCurrentPlan={setCurrentPlan}
            price={59}
            months={months}
            features={[
              t('tariffs.5_dukon'),
              t('tariffs.60_kunlik'),
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
              t('tariffs.nishesSelection'),
              t('tariffs.addsImpactCheck'),
            ]}
            color='primary'
            buttonTitle={t('tariffs.select')}
            isProPlus
            sendToRegister={sendToRegister}
          />
          {/* <div className='flex-1'></div> */}
          <Tarif
            title={t('tariffs.enterprise')}
            isCurrentPlan={currentPlan === t('tariffs.enterprise')}
            setCurrentPlan={setCurrentPlan}
            price={99}
            features={[
              t('tariffs.Barcha_dokonlar_full'),
              t('tariffs.90_kunlik'),
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
              t('tariffs.24/7_doimiy_yordam'),
            ]}
            months={months}
            color='primary'
            isEnterprise
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
            isFreeTrial={true}
          />
          {/* <div className='flex-1'></div> */}
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
        ' relative mt-8  flex h-[1050px] max-h-[1050px] w-[350px] min-w-[220px] shrink-0 flex-col items-center justify-between rounded-lg border border-slate-300 bg-white',
        // isProPlus && 'bg-gradient',
        'border-2 border-blue-500',
        // isPro && 'bg-gradient  w-[320px] min-w-[220px] sm:w-[400px] ',
        isProPlus && 'bg-gradient'
      )}
    >
      <div className='relative w-full '>
        <div
          className={clsxm(
            'mb-2 flex items-center justify-between gap-3 border-b-2 border-blue-500 bg-blue-100 px-6 py-5 text-center text-xl font-bold',
            // isFreeTrial &&
            //   'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
            isProPlus && 'bg-linear'
          )}
        >
          <div className='relative flex items-center justify-start gap-3'>
            <Logo className='inline-block h-6 w-6' />
            <p className='font-primary font-bold'>{title}</p>

            {/* Best Offer Label */}
            {isProPlus && (
              <span className='absolute -top-[56px] left-12 w-[200px] transform rounded-full bg-red-500 px-2 py-1 text-xs text-white'>
                {i18n.language === 'uz'
                  ? 'eng yaxshi qiymat'
                  : 'лучшее предложение'}
              </span>
            )}
          </div>
          <div className='relative flex items-center justify-end gap-2 text-2xl font-bold'>
            {months === 3 && price !== 0 && (
              <span className='text-lg text-slate-700 line-through'>
                ${price * 3}
              </span>
            )}
            <p>
              $
              {months === 1
                ? price
                : price === 0
                ? 0
                : Math.floor(price * 3 * 0.85)}
            </p>
          </div>
        </div>
        <ul className='mt-6 flex flex-col gap-2 pl-6 '>
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
      {(isPro || isProPlus || isEnterprise) && (
        <div className='w-full px-6 py-3'>
          <Button
            onClick={() => handlePayment()}
            className={clsxm(
              `bg-${color} w-full rounded px-4 py-2 text-white hover:bg-purple-700`
            )}
            isLoading={loading}
          >
            <>{t('tariffs.pay')}</>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Tarifs;
