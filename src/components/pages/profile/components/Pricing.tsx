import Image from 'next/image';
import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';
// import notice icon from react icons
import { IoWarningOutline } from 'react-icons/io5';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import BusinessAccess from '@/components/pages/profile/components/BusinessAccess';
import CountingDown from '@/components/pages/profile/components/CountingDown';
import { RenderAlert } from '@/components/shared/AlertComponent';
import Button from '@/components/shared/buttons/Button';

import payme from '@/assets/payme.png';
import { useContextState } from '@/context/Context';

function Pricing({ className }: { className?: string }) {
  const { t, i18n } = useTranslation('landing');
  const { state } = useContextState();
  const [currentPlan, setCurrentPlan] = React.useState<string>(
    t('tariffs.choosePlan')
  );
  const [months, setMonths] = React.useState<number>(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [promocode, setPromocode] = useState('');
  const [isPromo, setIsPromo] = useState(false);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.85); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
      className={clsxm('w-full justify-center', className)}
      style={
        {
          // zoom: zoomLevel,
        }
      }
    >
      <div className='flex w-full items-center justify-end'>
        <PromoCodeContainer
          setPromoCode={setPromocode}
          setIsPromo={setIsPromo}
          promoCode={promocode}
        />
      </div>

      <CountingDown discountEndDate={new Date('2023-10-24T23:59:59')} />
      <div
        className='mx-auto w-full rounded-md bg-transparent px-4 py-8'
        style={{
          zoom: zoomLevel,
        }}
      >
        {state.user?.tariff === 'trial' && (
          <div className='mb-8 flex items-center space-x-4 rounded-md border border-yellow-500 bg-yellow-100 p-4 shadow-md'>
            <IoWarningOutline className='text-2xl text-yellow-500' />
            <p className='font-medium text-gray-700'>
              {i18n.language === 'uz'
                ? `Siz hozirda "Boshlang'ich" tarifini ma'lum cheklovlar bilan sinov tariqasida foydalanmoqdasiz (7 KUN). `
                : 'В настоящее время вы используете тариф «Стартовый» с некоторыми ограничениями в качестве пробного периода.(7 ДНЕЙ)'}
            </p>
          </div>
        )}
        {/* 3. Billing Option */}
        <div className='mb-8 grid h-[400px] w-full min-w-[1200px] grid-cols-5 gap-4 overflow-scroll'>
          <div className='mt-3 flex items-center justify-center'>
            <div className='h-[200px] rounded-2xl border border-slate-300 p-6'>
              <div className='mb-4 text-center font-medium text-green-600'>
                {i18n.language === 'uz'
                  ? "3 oylik to'lov tanlaganingizda 33% chegirma!"
                  : i18n.language === 'ru'
                  ? 'Сэкономьте 33% при выборе оплаты на 3 месяца!'
                  : 'Save 33% when you choose 3-month billing!'}
              </div>
              <div className='flex items-center justify-center space-x-4'>
                <div className='flex items-center gap-1'>
                  <input
                    type='checkbox'
                    id='1month'
                    className=''
                    checked={months === 1}
                    onChange={() => setMonths(1)}
                  />
                  <label htmlFor='1month' className='text-xs font-medium'>
                    {i18n.language === 'uz'
                      ? '1 oy'
                      : i18n.language === 'ru'
                      ? '1 месяц'
                      : 'Monthly'}
                  </label>
                </div>
                <div className='flex items-center gap-1'>
                  <input
                    type='checkbox'
                    id='3month'
                    className=''
                    checked={months === 3}
                    onChange={() => setMonths(3)}
                  />
                  <label htmlFor='3months' className='text-xs font-medium'>
                    {i18n.language === 'uz'
                      ? '3 oy'
                      : i18n.language === 'ru'
                      ? '3 месяца'
                      : '3 Months'}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Tarif
              title={t('tariffs.free')}
              price={0}
              isCurrentPlan={state.user?.tariff === 'free'}
              setCurrentPlan={setCurrentPlan}
              months={months}
              features={[
                t('tariffs.Umumiy_malumotlar'),
                t('tariffs.30_kunlik'),
                t('tariffs.24/7_doimiy_yordam'),
              ]}
              color='primary'
              buttonTitle={t('tariffs.select')}
              sendToRegister={sendToRegister}
              isPromo={isPromo}
            />
          </div>
          <div className='flex items-center justify-center'>
            <Tarif
              title={t('tariffs.beginner')}
              isCurrentPlan={state.user?.tariff === 'base'}
              setCurrentPlan={setCurrentPlan}
              price={
                state.user?.referred_by === '0746b5'
                  ? !state.user?.is_paid
                    ? 12.5
                    : 19.0
                  : 19.0
              }
              months={months}
              isPromo={isPromo}
              features={[
                t('tariffs.1_dukon'),
                t('tariffs.60_kunlik'),
                t('tariffs.24/7_doimiy_yordam'),
              ]}
              color='primary'
              isPro
              buttonTitle={t('tariffs.select')}
              sendToRegister={sendToRegister}
              isFreeTrial={true}
            />
          </div>
          <div className='flex items-center justify-center'>
            <Tarif
              title={t('tariffs.seller')}
              isCurrentPlan={state.user?.tariff === 'seller'}
              setCurrentPlan={setCurrentPlan}
              price={
                state.user?.referred_by === '0746b5'
                  ? !state.user?.is_paid
                    ? 22.5
                    : 33.0
                  : 33.0
              }
              months={months}
              features={[
                t('tariffs.4_dukon'),
                t('tariffs.90_kunlik'),
                t('tariffs.24/7_doimiy_yordam'),
              ]}
              isPromo={isPromo}
              color='primary'
              buttonTitle={t('tariffs.select')}
              isProPlus
              sendToRegister={sendToRegister}
            />
          </div>
          <div className='flex items-center justify-center'>
            <Tarif
              title={t('tariffs.business')}
              setPopupOpen={setPopupOpen}
              popupOpen={popupOpen}
              isCurrentPlan={state.user?.tariff === 'business'}
              setCurrentPlan={setCurrentPlan}
              price={70}
              features={[
                t('tariffs.Barcha_dokonlar_full'),
                t('tariffs.90_kunlikplus'),
                t('tariffs.24/7_doimiy_yordam'),
              ]}
              months={months}
              color='primary'
              isEnterprise
              buttonTitle={t('tariffs.select')}
              sendToRegister={sendToRegister}
              isFreeTrial={true}
              isPromo={isPromo}
            />
          </div>
        </div>
        <div className='grid w-full min-w-[1200px] grid-cols-5 gap-4 overflow-scroll border-b'>
          <div></div>
          <div className='flex items-center justify-center border-t p-4 text-sm'>
            {t('tariffs.30_kunlik')}
          </div>
          <div className='flex items-center justify-center border-t p-4 text-sm'>
            {t('tariffs.60_kunlik')}
          </div>
          <div className='flex items-center justify-center border-t p-4 text-sm'>
            {t('tariffs.90_kunlik')}
          </div>
          <div className='flex items-center justify-center border-t p-4 text-sm'>
            {t('tariffs.90_kunlikplus')}
          </div>
        </div>
        <h3 className='font-merri my-5 w-full text-center'>
          {i18n.language === 'uz' ? 'Tariflarni taqqoslash' : 'Сравнить тарифы'}
        </h3>
        <PricingTable featuresData={getPricingData(t)} t={t} />
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
  isProPlus,
  months = 1,
  isEnterprise,
  isFreeTrial,
  isPromo,
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
  setPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  popupOpen?: boolean;
  isPromo?: boolean;
}) {
  const { t, i18n } = useTranslation('landing');
  const [loading, setLoading] = useState(false);
  const { state } = useContextState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [businessCode, setBusinessCode] = useState('');

  const handlePayment = (discount = 0) => {
    const api = new API(null);
    alert(
      i18n.language === 'uz'
        ? "Hozirda to'lovlar qabul qilish malum muddatga to'xtatilgan"
        : 'Прием платежей временно приостановлен'
    );
    // return;
    // if (isCurrentPlan) return;
    // if (price === 0) return;
    // const price_ =
    //   getPrice(
    //     isPro
    //       ? 'base'
    //       : isProPlus
    //       ? 'seller'
    //       : isBusiness
    //       ? 'business'
    //       : 'free',
    //     months,
    //     state.user?.referred_by === '0746b5' && !state.user?.is_paid, // isReferre
    //     true, // isReal
    //     false, // isShow,
    //     state.user?.referred_by === '280cf3' && !state.user?.is_paid
    //   ) - discount;
    // setLoading(true);
    // api
    //   .post('/payments/paylink/', {
    //     amount: Math.floor(price_ * 12000),
    //     months,
    //     tariff:
    //       title === t('tariffs.free')
    //         ? 'free'
    //         : title === t('tariffs.beginner')
    //         ? 'base'
    //         : title === t('tariffs.seller')
    //         ? 'seller'
    //         : 'business',
    //   })
    //   .then((res) => {
    //     logger(res.data, 'res');
    //     setLoading(false);
    //     window.location.href = res.data.pay_link;
    //   })
    //   .catch((err) => {
    //     logger(err, 'err');
    //     setLoading(false);
    //   });
  };

  const isBusiness = title === t('tariffs.business');
  const isFree = title === t('tariffs.free');

  const getPrice = (
    productType: 'base' | 'seller' | 'business' | 'free',
    months: number,
    isReferred: boolean,
    isReal: boolean,
    isShow: boolean,
    isKomiljon: boolean
  ): number => {
    // Base monthly prices
    const basePrices = {
      base: 25,
      seller: 45,
      business: 70,
      free: 0,
    };
    isKomiljon = isPromo ? true : isKomiljon;
    // isReferred = true;

    // Price multipliers
    const oneMonthPromoDiscount = 0.85; // 25% off
    const referralDiscount = 0.6; // 50% off for the first month
    const komiljon_discount = 0.7; // 30% off for the first month
    const threeMonthMultiplier = 3; // for a 3-month period
    const threeMonthDiscount = 0.67; // 33% off for a 3-month period

    // Calculate the regular price
    const regularPrice = basePrices[productType];

    if (productType === 'free') return 0;

    if (productType === 'business')
      if (months === 3) return 170;
      else if (isPromo) return 65;
      else return 70;

    // Calculate the show price
    let showPrice = regularPrice * months;
    if (months === 3 && !isReferred && !isKomiljon) {
      showPrice = showPrice * threeMonthDiscount;
      if (isReal) return showPrice;
      return regularPrice * threeMonthMultiplier;
    } else if (months === 1 && !isReferred && !isKomiljon) {
      if (isReal) return showPrice * oneMonthPromoDiscount;
      return regularPrice;
    } else if (months === 3 && isReferred) {
      const referredPrice = showPrice * 0.6;
      // (showPrice - regularPrice * referralDiscount) * threeMonthDiscount;
      if (isReal) return referredPrice;
      return regularPrice * threeMonthMultiplier;
    } else if (months === 1 && isReferred) {
      showPrice = regularPrice * referralDiscount;
      if (isReal) return showPrice;
      return regularPrice;
    } else if (months === 3 && isKomiljon) {
      const komiljonPrice = showPrice * threeMonthDiscount;
      // (showPrice - regularPrice * komiljon_discount) * threeMonthDiscount;
      if (isReal) return komiljonPrice;
      return regularPrice * threeMonthMultiplier;
    } else if (months === 1 && isKomiljon) {
      showPrice = regularPrice * komiljon_discount;
      if (isReal) return showPrice;
      return regularPrice;
    }

    return 0;
  };

  return (
    <div
      className={clsxm(
        'relative mt-5 flex max-w-[220px] flex-col space-y-4 rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl',
        isProPlus && 'scale-[1.15]'
      )}
    >
      <BusinessAccess
        open={popupOpen}
        setOpen={setPopupOpen}
        closeModal={() => {
          setPopupOpen(false);
          if (businessCode === '777777') {
            handlePayment();
          } else {
            RenderAlert({
              alertTitle:
                i18n.language === 'uz'
                  ? 'Iltimos, kodni tekshirib qayta kiriting!'
                  : 'Пожалуйста, проверьте код и повторите попытку!',
              alertSubtitle:
                i18n.language === 'uz'
                  ? 'Agar sizda maxsus kod bo`lmasa, biz bilan bog`laning.'
                  : 'Если у вас нет специального кода, свяжитесь с нами.',
              buttonTitle:
                i18n.language === 'uz'
                  ? 'Biz bilan bog`lanish'
                  : 'Свяжитесь с нами',
              buttonLink: 'https://t.me/Alijonov_md',
            });
            setBusinessCode('');
            return;
          }
        }}
        businessCode={businessCode ?? ''}
        setBusinessCode={setBusinessCode}
      />
      {isProPlus && (
        <div
          className={`bg-primary absolute -left-8 top-4 rotate-[-35deg] transform bg-${color}-600 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg`}
        >
          {i18n.language === 'uz' ? 'Энг яхши таклиф' : 'Лучшее предложение'}
        </div>
      )}
      <h3 className='text-primary text-center text-2xl font-semibold'>
        {title}
      </h3>

      <div className='flex flex-col items-center space-y-2'>
        {!isBusiness && (
          <div className='flex items-center space-x-2'>
            <span className='text-lg text-gray-500 line-through'>
              $
              {getPrice(
                isPro
                  ? 'base'
                  : isProPlus
                  ? 'seller'
                  : isBusiness
                  ? 'business'
                  : 'free',
                months,
                state.user?.referred_by === '0746b5' && !state.user?.is_paid, // isReferred
                false, // isReal
                true, // isShow
                state.user?.referred_by === '280cf3' && !state.user?.is_paid
              ).toFixed(2)}
            </span>

            <span className='text-3xl font-bold'>
              $
              {getPrice(
                isPro
                  ? 'base'
                  : isProPlus
                  ? 'seller'
                  : isBusiness
                  ? 'business'
                  : 'free',
                months,
                state.user?.referred_by === '0746b5' && !state.user?.is_paid, // isReferre
                true, // isReal
                false, // isShow
                state.user?.referred_by === '280cf3' && !state.user?.is_paid
              ).toFixed(2)}
            </span>
          </div>
        )}

        {!isBusiness && !isFree && (
          <span className='bg-primary inline-block rounded-full px-3 py-1 text-sm text-white'>
            {months} {t('tariffs.month')}
          </span>
        )}
        {isBusiness && (
          <span className='inline-block rounded-full px-3 text-sm'>
            {i18n.language === 'uz'
              ? '3 tagacha foydalanuvchi foydalansa bo`ladi'
              : 'До 3 пользователей могут пользоваться'}
          </span>
        )}
      </div>

      {!isFree && (
        <Button
          isLoading={loading}
          onClick={() => {
            if (!isCurrentPlan) {
              handlePayment();
            }
          }}
          className={clsxm(
            'w-full transform rounded-md py-2 text-white transition-transform duration-300 ',
            isCurrentPlan
              ? 'bg-gray-400'
              : `bg-${color} hover:bg-${color}-700 transition-colors hover:bg-purple-900`
          )}
        >
          <div className='flex items-center justify-center gap-2'>
            <Image
              src={payme}
              alt='payme'
              className='rounded-md'
              width={30}
              height={30}
              style={{
                display: isCurrentPlan ? 'none' : 'flex',
              }}
            />
            {isCurrentPlan ? t('tariffs.current') : buttonTitle}
          </div>
        </Button>
      )}

      <p className='text-center text-sm text-slate-500'>
        {isPro
          ? t('tariffs.about_pro')
          : isProPlus
          ? t('tariffs.about_premium')
          : isBusiness
          ? t('tariffs.about_enterprise')
          : t('tariffs.about_free')}
      </p>

      {!isBusiness && !isFree && (
        <span
          className={clsxm(
            'absolute -top-6 right-0 mr-2 mt-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white',
            months === 3 && 'text-green-300',
            state.user?.referred_by === '280cf3' &&
              !state.user?.is_paid &&
              '-right-10'
          )}
        >
          {state.user?.referred_by === '0746b5' &&
            !state.user?.is_paid &&
            'Soff: '}
          {state.user?.referred_by === '280cf3' &&
            !state.user?.is_paid &&
            'Komiljon: '}
          {(
            ((getPrice(
              isPro
                ? 'base'
                : isProPlus
                ? 'seller'
                : isBusiness
                ? 'business'
                : 'free',
              months,
              state.user?.referred_by === '0746b5' && !state.user?.is_paid, // isReferred
              false, // isReal
              true, // isShow
              state.user?.referred_by === '280cf3' && !state.user?.is_paid
            ) -
              getPrice(
                isPro
                  ? 'base'
                  : isProPlus
                  ? 'seller'
                  : isBusiness
                  ? 'business'
                  : 'free',
                months,
                state.user?.referred_by === '0746b5' && !state.user?.is_paid, // isReferred
                true, // isReal
                false, // isShow
                state.user?.referred_by === '280cf3' && !state.user?.is_paid
              )) /
              getPrice(
                isPro
                  ? 'base'
                  : isProPlus
                  ? 'seller'
                  : isBusiness
                  ? 'business'
                  : 'free',
                months,
                state.user?.referred_by === '0746b5' && !state.user?.is_paid, // isReferred
                false, // isReal
                true, // isShow
                state.user?.referred_by === '280cf3' && !state.user?.is_paid
              )) *
            100
          ).toFixed(1)}
          % OFF
        </span>
      )}
    </div>
  );
}

const PromoCodeContainer = ({
  promoCode,
  setPromoCode,
  setIsPromo,
}: {
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  setIsPromo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { i18n } = useTranslation('common');

  const handleApplyClick = () => {
    setIsPromo(promoCode === 'Ajoyib');
    setIsConfirmed(promoCode === 'Ajoyib');
  };

  return (
    <div className='mr-10 flex flex-col items-center justify-center gap-3 rounded-lg bg-white pt-6'>
      <input
        type='text'
        value={promoCode}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleApplyClick();
          }
        }}
        placeholder={i18n.language === 'uz' ? 'Promo kod' : 'Промо код'}
        className={`h-10 w-52 rounded border-2 px-2 text-sm transition-colors duration-200 focus:outline-none ${
          isConfirmed
            ? 'border-green-500'
            : 'border-purple-200 focus:border-purple-500'
        }`}
      />
      <button
        onClick={handleApplyClick}
        className='w-52 rounded-lg bg-purple-500 py-2 text-white transition-colors duration-200 hover:bg-purple-600 focus:outline-none'
      >
        {isConfirmed
          ? '✓'
          : i18n.language === 'uz'
          ? 'Kodni tasdiqlash'
          : 'Подтвердить код'}
      </button>
    </div>
  );
};

export default Pricing;

const PricingTable = ({ featuresData, t }: { featuresData: any; t: any }) => {
  const [openedSections, setOpenedSections] = useState<Record<number, boolean>>(
    {}
  );

  const sections = featuresData.reduce((acc: any, feature: any) => {
    if (feature.isTitle) {
      acc.push({
        title: feature.title,
        rows: [],
      });
    } else {
      acc[acc.length - 1].rows.push(feature);
    }
    return acc;
  }, []);

  const toggleSection = (sectionIdx: number) => {
    setOpenedSections((prev) => ({
      ...prev,
      [sectionIdx]: !prev[sectionIdx],
    }));
  };

  return (
    <div className='grid grid-cols-5 border-b'>
      {sections.map((section: any, sectionIdx: number) => (
        <React.Fragment key={sectionIdx}>
          {/* Title Row */}
          <div
            className={clsxm(
              'text-primary col-span-5 flex cursor-pointer items-center justify-start gap-6 border-t p-4 font-bold transition-all duration-300 hover:bg-gray-100',
              sectionIdx === 0 ? 'border-t-0' : ''
            )}
            onClick={() => toggleSection(sectionIdx)}
          >
            <p className='w-[200px]'>{section.title}</p>

            <span className='ml-2 transform transition-transform duration-300'>
              <BsChevronDown
                size={20}
                className={openedSections[sectionIdx] ? 'rotate-180' : ''}
              />
            </span>
          </div>
          {/* Details Rows */}
          <div
            className={clsxm(
              'col-span-5 grid grid-cols-5 gap-4 overflow-hidden transition-all duration-300 ease-in-out',
              openedSections[sectionIdx] ? 'max-h-[1000px]' : 'max-h-0'
            )}
          >
            {section.rows.map((rowFeature: any, rowIdx: number) => (
              <FeatureAccordion key={rowIdx} feature={rowFeature} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const FeatureAccordion: React.FC<any> = ({ feature }) => {
  return (
    <>
      <div
        className={clsxm(
          'cursor-pointer border-t p-4 text-sm transition-all duration-300 hover:bg-gray-100',
          'text-gray-700'
        )}
      >
        {feature.title}
      </div>
      <div className='flex items-center justify-center border-t p-4 text-sm'>
        {feature.free}
      </div>
      <div className='flex items-center justify-center border-t p-4 text-sm'>
        {feature.beginner}
      </div>
      <div className='flex items-center justify-center border-t p-4 text-sm'>
        {feature.seller}
      </div>
      <div className='flex items-center justify-center border-t p-4 text-sm'>
        {feature.business}
      </div>
    </>
  );
};

const getPricingData = (t: any) => {
  return [
    {
      title: t('tariffs.Malumotlar'),
      free: t('tariffs.30_kunlik'),
      beginner: t('tariffs.60_kunlik'),
      seller: t('tariffs.90_kunlik'),
      business: t('tariffs.90_kunlikplus'),
      isTitle: true,
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
      title: t('tariffs.weekly_best_products'),
      free: '',
      beginner: '',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.monthly_best_products'),

      free: '',
      beginner: '',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.bot'),
      free: '',
      beginner: '',
      seller: '',
      business: '',
      isTitle: true,
    },
    {
      title: t('tariffs.bot_report'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.bot_shop_reports'),
      free: '',
      beginner: t('tariffs.bot_1_shop'),
      seller: t('tariffs.bot_4_shop'),
      business: t('tariffs.bot_10_shops'),
    },

    {
      title: t('tariffs.bot_product_reports'),
      free: '',
      beginner: t('tariffs.bot_10_products'),
      seller: t('tariffs.bot_50_products'),
      business: t('tariffs.bot_100_products'),
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
      beginner: t('tariffs.60_kunlik'),
      seller: t('tariffs.90_kunlik'),
      business: t('tariffs.90_kunlikplus'),
    },
    {
      title: t('tariffs.Kategoriya_mahsulotlari'),
      free: '',
      beginner: '✓',
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
      title: t('tariffs.filters'),
      free: '',
      beginner: '✓',
      seller: '✓',
      business: '✓',
    },
    {
      title: t('tariffs.Mahsulot_tahlili'),
      free: '',
      beginner: t('tariffs.60_kunlik'),
      seller: t('tariffs.90_kunlik'),
      business: t('tariffs.90_kunlikplus'),
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

const Testimonials = ({
  className,
  tarif,
  name,
  text,
  profession,
}: {
  className: string;
  tarif: string;
  name: string;
  text: string;
  profession: string;
}) => {
  return (
    <div className={clsxm(' relative   border p-4 shadow-xl', className)}>
      <div className='absolute -left-10 -top-8  rounded-full p-2  text-blue-500'>
        <FaQuoteLeft className=' text-5xl ' />
      </div>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col'>
          <h3>{name}</h3>
          <p className='text-sm text-gray-500'>{profession}</p>
        </div>
        <span className='rounded-md bg-blue-500 px-2 text-white '>{tarif}</span>
      </div>
      <p className='mt-4 text-gray-500'>{text}</p>
    </div>
  );
};
