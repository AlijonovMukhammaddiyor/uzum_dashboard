import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

const Footer1 = () => {
  const { t } = useTranslation('landing');

  return (
    <footer className='text-black-100  flex  flex-col border-t border-gray-200 bg-[#333] text-white'>
      <div className='flex flex-wrap justify-between gap-5 px-6 py-10 max-md:flex-col sm:px-16'>
        <div className='flex flex-col items-start justify-start gap-6'>
          <p className='text-base text-slate-100'>
            {t('footer.all_rights_reserved')}&copy;
          </p>
        </div>

        <div className='flex w-full flex-1 flex-wrap gap-20 max-md:mt-10 md:justify-end'>
          {Object.keys(t('footer.footer_links', { returnObjects: true })).map(
            (item) => {
              const footerLink: {
                title: string;
                links: { title: string; link: string }[];
              } = (t('footer.footer_links', { returnObjects: true }) as any)[
                item
              ];
              return (
                <div
                  key={footerLink.title}
                  className='flex min-w-[170px] flex-col gap-6 text-base'
                >
                  <h3 className='font-bold'>{footerLink.title}</h3>
                  <div className='flex flex-col gap-5'>
                    {footerLink.links.map((linkItem) => (
                      <Link
                        key={linkItem.title}
                        href={linkItem.link}
                        className='text-gray-300'
                        target='_blank'
                      >
                        {linkItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className='mt-10 flex flex-wrap items-center justify-between border-t border-gray-900 px-6 pt-10 sm:px-16'>
        <p>
          @2023 "RAQAMLITAHLIL GROUP" MCHJ. {t('footer.all_rights_reserved')}.
        </p>

        <div className='flex flex-1 justify-center gap-10 max-sm:mt-4 sm:justify-end'>
          <Link href='/policy' className='text-gray-300'>
            {t('footer.privacy_policy')}
          </Link>
          <Link href='/terms' className='text-gray-300'>
            {t('footer.terms_of_use')}
          </Link>
        </div>
      </div>
      <div className='mt-10 items-center justify-between border-t border-gray-900 px-6 py-10 text-center leading-snug tracking-wide text-gray-400 sm:px-16 md:text-left'>
        <p className='text-xs'>{t('footer.footer_message.1')}</p>
        <p className='text-xs'>{t('footer.footer_message.2')}</p>
        <p className='text-xs'>{t('footer.footer_message.3')}</p>
      </div>
    </footer>
  );
};

export default Footer1;
