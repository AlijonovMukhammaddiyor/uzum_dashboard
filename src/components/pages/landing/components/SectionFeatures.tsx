import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';

import clsxm from '@/lib/clsxm';

function SectionFeatures() {
  const { t, i18n } = useTranslation('landing', {});
  const [currentImage, setCurrentImage] = React.useState<string>(
    '/landing/features/home_umumiy.png'
  );
  const [activeDescription, setActiveDescription] = React.useState<string>(
    t('features.CategoryAnalytics.children.3.description')
  );
  const [activeTab, setActiveTab] = React.useState<string>(
    t('features.CategoryAnalytics.children.3.title')
  );

  useEffect(() => {
    setActiveDescription(
      t(`features.CategoryAnalytics.children.3.description`)
    );
    setActiveTab(t(`features.CategoryAnalytics.children.3.title`));
    setCurrentImage(t(`features.CategoryAnalytics.children.3.image`));
  }, [i18n.language, t]);

  const [isShown, setIsShown] = React.useState<boolean>(false);

  return (
    <div className='relative w-full py-8 md:py-28' id='services'>
      <div className='layout'>
        <h1 className='font-primary text-2xl font-semibold leading-8 tracking-wider md:mb-6 md:text-[35px] md:leading-[40px] xl:text-[43px] xl:leading-[60px]'>
          {t('features.title')}
        </h1>
        <div className='mg:gap-16 relative flex w-full flex-col items-start justify-start gap-10 md:flex-row'>
          <div
            className={clsxm(
              'md:four-sided-shadow relative w-full bg-white pl-4 pt-7 transition-all md:z-10 md:w-[300px] md:rounded-xl  md:bg-transparent md:py-10 md:pt-10 md:shadow-none'
            )}
          >
            <div className='flex w-full flex-col items-start justify-start gap-6'>
              {Object.keys(t('features', { returnObjects: true })).map(
                (featureKey) => {
                  const features: {
                    [key: string]: {
                      title: string;
                      description: string;
                      image: string;
                    };
                  } = (t('features', { returnObjects: true }) as any)[
                    featureKey
                  ];
                  return (
                    <ul className='flex w-full flex-col' key={featureKey}>
                      <li>
                        <h3 className='mb-2'>
                          {t(`features.${featureKey}.title`)}
                        </h3>{' '}
                        {/* Use feature.title */}
                      </li>
                      <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
                        {Object.keys(features.children).map((item: string) => {
                          // console.log('item', item, features.children);
                          return (
                            <li
                              key={item}
                              className={clsxm(
                                'px-4 py-2 md:relative md:flex md:w-[270px] md:cursor-pointer md:items-center md:gap-4',
                                'min-w-max cursor-pointer rounded-3xl bg-slate-200 md:min-w-0 md:bg-transparent',
                                activeTab ===
                                  (t(
                                    `features.${featureKey}.children.${item}.title`
                                  ) as string) &&
                                  'bg-primary md:bg-primary md:list_link text-white md:rounded-l-md md:rounded-r-none'
                              )}
                              onClick={() => {
                                setCurrentImage(
                                  t(
                                    `features.${featureKey}.children.${item}.image`
                                  ) as string
                                );
                                setActiveTab(
                                  t(
                                    `features.${featureKey}.children.${item}.title`
                                  ) as string
                                );
                                setActiveDescription(
                                  t(
                                    `features.${featureKey}.children.${item}.description`
                                  ) as string
                                );
                                setIsShown(false);
                              }}
                            >
                              <span className='text-xs sm:text-base'>
                                {
                                  t(
                                    `features.${featureKey}.children.${item}.title`
                                  ) as string
                                }
                              </span>
                            </li>
                          );
                        })}
                      </div>
                    </ul>
                  );
                }
              )}
            </div>
          </div>
          <div className='four-sided-shadow flex-1 flex-col items-start justify-start rounded-lg  bg-slate-200 px-6 py-6 pb-12 md:static md:mt-6 md:flex'>
            <h2 className='mb-4 text-[18px] lg:text-3xl'>{activeTab}</h2>
            <div className='flex w-full flex-col gap-3'>
              <p className='mb-2'>{t(activeDescription)}</p>
              <div className='h-full w-full'>
                <Zoom>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentImage}
                    alt={activeTab}
                    className='h-full w-full object-cover'
                  />
                </Zoom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function ListItem({
//   title,
//   image,
//   setCurrentImage,
//   setActiveTab,
//   setIsShown,
//   activeTab,
// }: {
//   title: string;
//   image: string;
//   setCurrentImage: React.Dispatch<React.SetStateAction<string>>;
//   setActiveTab: React.Dispatch<React.SetStateAction<string>>;
//   setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
//   activeTab: string;
// }) {
//   const { t } = useTranslation('landing');
//   console.log('title', title);

//   return (

//   );
// }

export default SectionFeatures;
