import React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import GrowingCategories from '@/components/pages/home/components/GrowingCategories';
import GrowingProducts from '@/components/pages/home/components/GrowingProducts';
import HomeStatisticsContainer from '@/components/pages/home/components/HomeStatisticsContainer';
import NewProducts from '@/components/pages/home/components/NewProducts';
import Tabs from '@/components/shared/Tabs';

import { UserType } from '@/types/user';

function HomeComponent({ user }: { user: UserType }) {
  const { t, i18n } = useTranslation('tabs');
  const [activeTab, setActiveTab] = React.useState<string>(t('home.overview'));
  console.log(t('home.overview'));
  console.log(activeTab);
  const isProPlus = user.is_proplus;

  React.useEffect(() => {
    setActiveTab(t('home.overview'));
  }, [i18n.language, t]);

  return (
    <div className='flex w-full min-w-[1200px] flex-col items-start justify-start gap-4 overflow-scroll'>
      <Tabs
        tabs={[
          t('home.overview'),
          t('home.new_products'),
          t('home.promising_products'),
          t('home.promising_categories'),
          // 'Asosiy kategoriyalar',
        ]}
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
      <HomeStatisticsContainer
        className={clsxm(activeTab === t('home.overview') ? '' : 'hidden')}
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

export default HomeComponent;
