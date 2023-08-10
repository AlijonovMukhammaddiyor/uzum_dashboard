import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import Select from 'react-select';

import clsxm from '@/lib/clsxm';

import Button from '@/components/shared/buttons/Button';

import Logo from '@/assets/logo/logo_only.svg';

function Tarifs({ className }: { className?: string }) {
  const { t, i18n } = useTranslation('landing');
  const [currentPlan, setCurrentPlan] = React.useState<string>(
    t('tariffs.choosePlan')
  );

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
        <div className=' mt-4 flex max-w-max gap-12 rounded-md px-12 py-4'>
          <Select
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
          />
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
          <button className='bg-primary rounded-md px-7 py-2 text-white hover:bg-purple-700'>
            {t('tariffs.pay')}
          </button>
          <p></p>
        </div>
        <div
          className={clsxm(
            '  flex w-full max-w-full flex-1 items-start gap-4 overflow-x-auto p-3 pt-10',
            'no-scrollbar overflow-scroll'
            // 'flex-col md:flex-row'
          )}
        >
          <div className='flex-1'></div>
          <Tarif
            title={t('tariffs.free')}
            price='$0'
            isCurrentPlan={currentPlan === t('tariffs.free')}
            setCurrentPlan={setCurrentPlan}
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
          <div className='flex-1'></div>
          <Tarif
            title={t('tariffs.pro')}
            isCurrentPlan={currentPlan === t('tariffs.pro')}
            setCurrentPlan={setCurrentPlan}
            price='$40'
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
            ]}
            color='primary'
            isPro
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
            isFreeTrial={true}
          />
          <div className='flex-1'></div>
          <Tarif
            title={t('tariffs.premium')}
            isCurrentPlan={currentPlan === t('tariffs.premium')}
            setCurrentPlan={setCurrentPlan}
            price='$60'
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
            ]}
            color='primary'
            buttonTitle={t('tariffs.select')}
            isProPlus
            sendToRegister={sendToRegister}
          />
          <div className='flex-1'></div>
          <Tarif
            title={t('tariffs.enterprise')}
            isCurrentPlan={currentPlan === t('tariffs.enterprise')}
            setCurrentPlan={setCurrentPlan}
            price='$99'
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
              t('tariffs.24/7_doimiy_yordam'),
              t('tariffs.Yangi_mahsulotlar'),
              t('tariffs.Osayotgan_mahsulotlar'),
              t('tariffs.Osayotgan kategoriyalar'),
              t('tariffs.Mahsulot_raqobatchilari_taqqoslash'),
            ]}
            color='primary'
            isEnterprise
            buttonTitle={t('tariffs.select')}
            sendToRegister={sendToRegister}
            isFreeTrial={true}
          />
          <div className='flex-1'></div>
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
}: {
  isCurrentPlan?: boolean;
  title: string;
  price: string;
  features: string[];
  color: string;
  buttonTitle?: string;
  isPro?: boolean;
  sendToRegister: (plan: string) => void;
  setCurrentPlan?: (plan: string) => void;
  isProPlus?: boolean;
  isEnterprise?: boolean;
  isFreeTrial?: boolean;
}) {
  const { t } = useTranslation('landing');
  const { i18n } = useTranslation('landing');
  const features_ = [
    t('tariffs.5_dukon'),
    t('tariffs.2_dukon'),
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
        ' relative flex  h-[1000px] max-h-[1000px] w-[350px] min-w-[220px] shrink-0 flex-col items-center justify-between overflow-hidden rounded-lg border border-slate-300 bg-white',
        // isProPlus && 'bg-gradient',
        'border-2 border-blue-500',
        i18n.language === 'ru' && 'h-[1000px] max-h-[1000px]',
        // isPro && 'bg-gradient  w-[320px] min-w-[220px] sm:w-[400px] ',
        isCurrentPlan && 'border-amber-500 bg-amber-100 '
      )}
    >
      <div className='relative w-full '>
        <div
          className={clsxm(
            'mb-2 flex items-center justify-between gap-3 border-b-2 border-blue-500 bg-blue-100 px-6 py-5 text-center text-xl font-bold',
            // isFreeTrial &&
            //   'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
            isCurrentPlan && 'border-amber-500    bg-amber-200'
          )}
        >
          <div className='flex items-center justify-start gap-3'>
            <Logo className='inline-block h-6 w-6' />
            <p className='font-primary font-bold'>{title}</p>
          </div>
          <div className='text-2xl font-bold'>
            <p>{price}</p>
          </div>
        </div>
        <ul className='mt-6 flex flex-col gap-2 pl-6 '>
          {/* {isPro && (
            <li className='flex  items-start justify-start'>
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
          {isEnterprise && (
            <li className='flex items-start justify-start'>
              <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              {t('tariffs.90_kunlik')}
            </li>
          )} */}
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
      <div className='w-full px-6 py-3'>
        <Button
          onClick={() => setCurrentPlan && setCurrentPlan(title)}
          className={clsxm(
            `bg-${color} w-full rounded px-4 py-2 text-white hover:bg-purple-700`,
            isCurrentPlan && 'bg-amber-500  hover:bg-amber-600'
            // !isPro && 'bg-blue-500'
          )}
          // disabled={isProPlus}
        >
          <>{buttonTitle ? buttonTitle : `Buy ${price}` || 'Buy'}</>
        </Button>
      </div>
    </div>
  );
}

export default Tarifs;
