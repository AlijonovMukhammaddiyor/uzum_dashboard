import React from 'react';

import HomeStatisticsContainer from '@/components/pages/home/components/HomeStatisticsContainer';

import { UserType } from '@/types/user';

function HomeComponent({ user }: { user: UserType }) {
  return (
    <div className='flex w-full min-w-[1400px] flex-col items-start justify-start gap-4 overflow-scroll pb-12'>
      <HomeStatisticsContainer user={user} />

      {/* <MainCategories
        className={clsxm(
          activeTab === 'Asosiy kategoriyalar' ? '-mt-20' : 'hidden'
        )}
      /> */}
    </div>
  );
}

export default HomeComponent;
