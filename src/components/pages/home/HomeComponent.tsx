import React from 'react';

import clsxm from '@/lib/clsxm';

import GrowingCategories from '@/components/pages/home/components/GrowingCategories';
import GrowingProducts from '@/components/pages/home/components/GrowingProducts';
import HomeStatisticsContainer from '@/components/pages/home/components/HomeStatisticsContainer';
import NewProducts from '@/components/pages/home/components/NewProducts';
import Tabs from '@/components/shared/Tabs';

function HomeComponent() {
  const [activeTab, setActiveTab] = React.useState<string>('Umumiy');

  return (
    <div className='flex w-full min-w-[1200px] flex-col items-start justify-start gap-4 overflow-scroll'>
      <Tabs
        tabs={[
          'Umumiy',
          'Yangi mahsulotlar',
          "O'sayotgan mahsulotlar",
          "O'sayotgan kategoriyalar",
          // 'Asosiy kategoriyalar',
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4 min-w-[1200px] overflow-scroll'
      />
      <HomeStatisticsContainer
        className={clsxm(activeTab === 'Umumiy' ? '' : 'hidden')}
      />

      <NewProducts
        className={clsxm(
          activeTab === 'Yangi mahsulotlar' ? '-mt-8' : 'hidden'
        )}
      />

      <GrowingProducts
        className={clsxm(
          activeTab === "O'sayotgan mahsulotlar" ? '-mt-12' : 'hidden'
        )}
      />

      <GrowingCategories
        className={clsxm(
          activeTab === "O'sayotgan kategoriyalar" ? '-mt-16' : 'hidden'
        )}
      />

      {/* <MainCategories
        className={clsxm(
          activeTab === 'Asosiy kategoriyalar' ? '-mt-20' : 'hidden'
        )}
      /> */}
    </div>
  );
}

export default HomeComponent;
