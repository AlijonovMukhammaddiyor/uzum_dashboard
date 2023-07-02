import React from 'react';

import { shopCompetitorsTableColumnDefs } from '@/components/columnDefs';
import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
import PositionAreaChartComponent from '@/components/pages/sellers/components/PositionAreaChartComponent';
import Table from '@/components/shared/PaginatedTable';

function ShopSales() {
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
        <h4 className='text-primary mb-3 text-center'>Kunlik sotuv miqdori</h4>
        <PositionAreaChartComponent />
      </div>

      <Table columnDefs={shopCompetitorsTableColumnDefs} data={[]} />
    </div>
  );
}

export default ShopSales;
