import React from 'react';

import clsxm from '@/lib/clsxm';

import GrowingProducts from '@/components/pages/home/components/GrowingProducts';
import HomeStatisticsContainer from '@/components/pages/home/components/HomeStatisticsContainer';
import NewProducts from '@/components/pages/home/components/NewProducts';
import Tabs from '@/components/shared/Tabs';

function HomeComponent() {
  const [activeTab, setActiveTab] = React.useState<string>('Umumiy');

  return (
    <div className='flex w-full flex-col items-start justify-start gap-4'>
      <Tabs
        tabs={['Umumiy', 'Yangi mahsulotlar', "O'sayotgan mahsulotlar"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4 min-w-[1200px]'
      />
      <HomeStatisticsContainer
        className={clsxm(activeTab === 'Umumiy' ? '' : 'hidden')}
      />

      <NewProducts
        className={clsxm(activeTab === 'Yangi mahsulotlar' ? '' : 'hidden')}
      />

      <GrowingProducts
        className={clsxm(
          activeTab === "O'sayotgan mahsulotlar" ? '' : 'hidden'
        )}
      />
    </div>
  );
}

export default HomeComponent;
