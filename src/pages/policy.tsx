import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Footer1 from '@/components/pages/landing/components/Footer1';
import LandingHeader from '@/components/pages/landing/components/LandingHeader';

import policy from '@/assets/policy.json';

export default function Policy() {
  const router = useRouter();
  const { t, i18n } = useTranslation('policy');
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  return (
    <div>
      <LandingHeader />
      <div className='bg-gradient w-full overflow-hidden pb-32 pt-20'>
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
            {t('title')}
          </h1>
          <div className='w-full'>
            <p className='mb-4 text-gray-600'>{t('subtitle1')}</p>
            <p className='mb-4 text-gray-600'>{t('subtitle2')}</p>
            <ol className='list-outside list-disc pl-5'>
              {Object.entries(policy).map(([key, value]) => {
                if (typeof value === 'string') {
                  return <></>;
                }
                return (
                  <div key={key}>
                    <div className='mb-4 font-semibold'>
                      {t(`${key}.title`)}
                    </div>
                    <ul className='list-outside list-disc pl-5'>
                      {Object.entries(value).map(([key2, value2]) => {
                        if (key2 === 'title') {
                          return <></>;
                        }
                        return (
                          <div key={key2}>
                            <li className='mb-4 text-gray-600'>
                              {t(`${key}.${key2}`)}
                            </li>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </ol>
            {i18n.language === 'ru' && (
              <p>
                Этот документ был написан и заверен на узбекском языке. В
                русской версии могут быть небольшие ошибки перевода
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || 'uz',
        ['landing', 'common', 'policy'],
        null,
        ['uz', 'ru']
      )),
    },
  };
}
