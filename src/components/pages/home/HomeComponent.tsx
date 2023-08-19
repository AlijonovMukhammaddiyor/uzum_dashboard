import React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import GrowingCategories from '@/components/pages/home/components/GrowingCategories';
import GrowingProducts from '@/components/pages/home/components/GrowingProducts';
import HomeStatisticsContainer from '@/components/pages/home/components/HomeStatisticsContainer';
import NewProducts from '@/components/pages/home/components/NewProducts';
import { RenderAlert } from '@/components/shared/AlertComponent';
import Tabs from '@/components/shared/Tabs';

import { UserType } from '@/types/user';

function HomeComponent({ user }: { user: UserType }) {
  const { t, i18n } = useTranslation('tabs');
  const [activeTab, setActiveTab] = React.useState<string>(t('home.overview'));
  const [notAllowedTab, setNotAllowedTab] = React.useState<string>('');
  const isProPlus = user.tariff === 'seller' || user.tariff === 'business';

  React.useEffect(() => {
    setActiveTab(t('home.overview'));
  }, [i18n.language, t]);

  React.useEffect(() => {
    switch (notAllowedTab) {
      case t('home.new_products.title'):
        RenderAlert({
          alertTitle: t('tariffs.change_tariff'),
          alertSubtitle: t('home.new_products.info'),
          buttonTitle: t('tariffs.tariffs'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('home.promising_products.title'):
        RenderAlert({
          alertTitle: t('tariffs.change_tariff'),
          alertSubtitle: t('home.promising_products.info'),
          buttonTitle: t('tariffs.tariffs'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('home.promising_categories.title'):
        RenderAlert({
          alertTitle: t('tariffs.change_tariff'),
          alertSubtitle: t('home.promising_categories.info'),
          buttonTitle: t('tariffs.tariffs'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      default:
        break;
    }
  }, [notAllowedTab]);

  return (
    <div className='flex w-full min-w-[1400px] flex-col items-start justify-start gap-4 overflow-scroll pb-12'>
      <Tabs
        tabs={[
          t('home.overview'),
          t('home.new_products.title'),
          t('home.promising_products.title'),
          t('home.promising_categories.title'),
          // 'Asosiy kategoriyalar',
        ]}
        premiumTabs={[
          t('home.new_products.title'),
          t('home.promising_products.title'),
          t('home.promising_categories.title'),
        ]}
        disbaledTabs={
          isProPlus
            ? []
            : [
                t('home.promising_products.title'),
                t('home.promising_categories.title'),
                t('home.new_products.title'),
              ]
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setNotAllowedTab={setNotAllowedTab}
        className='overflow-auto'
      />

      <HomeStatisticsContainer
        user={user}
        className={clsxm(activeTab === t('home.overview') ? '' : 'hidden')}
      />

      <NewProducts
        className={clsxm(
          activeTab === t('home.new_products.title') ? 'mt-0' : 'hidden'
        )}
      />

      {activeTab === t('home.promising_products.title') && (
        <GrowingProducts
          className={clsxm(
            activeTab === t('home.promising_products.title') ? '' : 'hidden'
          )}
        />
      )}

      {activeTab === t('home.promising_categories.title') && (
        <GrowingCategories
          className={clsxm(
            activeTab === t('home.promising_categories.title') ? '' : 'hidden'
          )}
        />
      )}

      {/* <MainCategories
        className={clsxm(
          activeTab === 'Asosiy kategoriyalar' ? '-mt-20' : 'hidden'
        )}
      /> */}
    </div>
  );
}

export default HomeComponent;
