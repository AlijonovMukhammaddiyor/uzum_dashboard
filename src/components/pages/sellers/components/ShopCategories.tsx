import React from 'react';

import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
import ShopCategoryAnalyticsChart from '@/components/pages/sellers/components/ShopCategoryAnalyticsChart';

function ShopCategories() {
  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-8'>
      <div className='relative flex h-[600px] w-full flex-col rounded-md bg-white p-3'>
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={0}
          setActiveTab={() => {
            //sdc
          }}
          className='absolute right-3 top-3'
        />
        <h4 className='text-primary text-center'>
          Do'konning Kategoriyalar bo'yicha sotuv miqdori
        </h4>
        <ShopCategoryAnalyticsChart />
      </div>
    </div>
  );
}

export default ShopCategories;
