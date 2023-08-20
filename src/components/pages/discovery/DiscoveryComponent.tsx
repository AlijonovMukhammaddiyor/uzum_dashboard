import React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import ProductsFilter from '@/components/pages/discovery/ProductsFilter';
import GrowingCategories from '@/components/pages/home/components/GrowingCategories';
import GrowingProducts from '@/components/pages/home/components/GrowingProducts';
import NewProducts from '@/components/pages/home/components/NewProducts';
import Tabs from '@/components/shared/Tabs';

import { UserType } from '@/types/user';

function DiscoveryComponent({ user }: { user: UserType }) {
  const { t, i18n } = useTranslation('tabs');
  const [activeTab, setActiveTab] = React.useState<string>(t('home.filter'));
  const isProPlus = user.tariff === 'seller' || user.tariff === 'business';
  const [notAllowedTab, setNotAllowedTab] = React.useState<string>('');
  React.useEffect(() => {
    setActiveTab(t('home.filter'));
  }, [i18n.language, t]);

  return (
    <div className='flex w-full min-w-[1400px] flex-col items-start justify-start gap-4 overflow-scroll'>
      <Tabs
        tabs={[
          t('home.filter'),
          t('home.new_products'),
          t('home.promising_products'),
          t('home.promising_categories'),
          // 'Asosiy kategoriyalar',
        ]}
        setNotAllowedTab={setNotAllowedTab}
        premiumTabs={[
          t('home.new_products'),
          t('home.promising_products'),
          t('home.promising_categories'),
        ]}
        disbaledTabs={
          isProPlus
            ? []
            : [
                t('home.promising_products'),
                t('home.promising_categories'),
                t('home.new_products'),
              ]
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='overflow-auto'
      />
      <ProductsFilter
        className={clsxm(activeTab === t('home.filter') ? '' : 'hidden')}
      />

      <NewProducts
        className={clsxm(
          activeTab === t('home.new_products') ? 'mt-0' : 'hidden'
        )}
      />

      {activeTab === t('home.promising_products') && (
        <GrowingProducts
          className={clsxm(
            activeTab === t('home.promising_products') ? '' : 'hidden'
          )}
        />
      )}

      {activeTab === t('home.promising_categories') && (
        <GrowingCategories
          className={clsxm(
            activeTab === t('home.promising_categories') ? '' : 'hidden'
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

export default DiscoveryComponent;
