import React from 'react';

import clsxm from '@/lib/clsxm';

import GrowingCategories from '@/components/pages/home/components/GrowingCategories';
import GrowingProducts from '@/components/pages/home/components/GrowingProducts';
import HomeStatisticsContainer from '@/components/pages/home/components/HomeStatisticsContainer';
import NewProducts from '@/components/pages/home/components/NewProducts';
import Tabs from '@/components/shared/Tabs';

import { UserType } from '@/types/user';

function HomeComponent({ user }: { user: UserType }) {
  const [activeTab, setActiveTab] = React.useState<string>('Umumiy');
  const isProPlus = user.is_proplus;
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
        premiumTabs={[
          'Yangi mahsulotlar',
          "O'sayotgan mahsulotlar",
          "O'sayotgan kategoriyalar",
        ]}
        disbaledTabs={
          isProPlus
            ? []
            : [
                "O'sayotgan mahsulotlar",
                "O'sayotgan kategoriyalar",
                'Yangi mahsulotlar',
              ]
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4 overflow-auto'
      />
      <HomeStatisticsContainer
        className={clsxm(activeTab === 'Umumiy' ? '' : 'hidden')}
      />

      <NewProducts
        className={clsxm(
          activeTab === 'Yangi mahsulotlar' ? '-mt-8' : 'hidden'
        )}
      />

      {activeTab === "O'sayotgan mahsulotlar" && (
        <GrowingProducts
          className={clsxm(
            activeTab === "O'sayotgan mahsulotlar" ? '-mt-12' : 'hidden'
          )}
        />
      )}

      {activeTab === "O'sayotgan kategoriyalar" && (
        <GrowingCategories
          className={clsxm(
            activeTab === "O'sayotgan kategoriyalar" ? '-mt-16' : 'hidden'
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
