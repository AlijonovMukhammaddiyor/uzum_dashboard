import React from 'react';

import HomeStatisticsContainer from '@/components/pages/home/components/HomeStatisticsContainer';

function HomeComponent() {
  return (
    <div className='flex w-full flex-col items-start justify-start gap-4'>
      <div className='flex w-full max-w-full items-center justify-start gap-4 bg-white p-3'>
        <HomeStatisticsContainer
          statistics={{
            orders: 4200,
            pastOrders: 3200,
            products: 2300,
            pastProducts: 2000,
            shops: 30,
            pastShops: 34,
          }}
        />
      </div>
      {/* <div className='flex w-full items-center justify-start gap-4 bg-white p-3'></div> */}
    </div>
  );
}

export default HomeComponent;
