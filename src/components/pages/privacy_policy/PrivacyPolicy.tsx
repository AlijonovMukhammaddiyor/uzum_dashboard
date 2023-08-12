import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Footer1 from '@/components/pages/landing/components/Footer1';
import LandingHeader from '@/components/pages/landing/components/LandingHeader';

import policy from '@/assets/policy.json';

const PrivacyPolicy = () => {
  const contactEmail = 'info@uzanalitika.uz';
  const privacyPolicyLink = 'https://uzanalitika.uz/privacy-policy';
  const wesiteLink = 'https://uzanalitika.uz';

  const router = useRouter();
  const { t } = useTranslation('login');
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
    <>
      <LandingHeader />
      <div className=' w-full overflow-hidden bg-white pb-32 pt-20'>
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
        <div className='layout flex flex-col gap-8 rounded-lg bg-white p-20 shadow-lg'>
          <h1 className='border-b border-gray-400 pb-4 text-2xl font-bold'>
            Mahfiylik siyosati
          </h1>
          <div className='w-full'>
            <p className='mb-4 text-gray-600'>
              Shaxsiy ma'lumotlarga nisbatan ushbu Maxfiylik siyosati (bundan
              keyin - Maxfiylik siyosati) Internetda joylashtirilgan:
              www.uzanalitika.uz (bundan keyin - Sayt) veb-saytida
              joylashtirilgan barcha ma'lumotlarga qo'llaniladi.
            </p>
            <p className='mb-4 text-gray-600'>
              Saytdan foydalanish Foydalanuvchi tomonidan uning Siyosatiga va
              unda ko’rsatilgan shaxsiy ma'lumotlarini qayta ishlash shartlariga
              so'zsiz roziligini anglatadi; ushbu shartlarga rozi bo'lmaganda,
              Foydalanuvchi Saytdan foydalanishni rad qilishi kerak.
            </p>
            <ol className='list-outside list-decimal pl-5'>
              {Object.entries(policy).map(([key, value]) => (
                <li key={key} className='mb-4'>
                  <h2 className='mb-2 text-lg font-semibold'>{key}</h2>
                  {Object.entries(value as any).map(([key, value]) => (
                    <p key={key} className='mb-2 text-sm text-gray-500'>
                      {key}: {value as any}
                    </p>
                  ))}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  );
};

export default PrivacyPolicy;
