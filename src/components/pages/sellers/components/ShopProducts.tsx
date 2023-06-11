import React from 'react';

import { shopProductsTableColumnDefs } from '@/components/columnDefs';
import Table from '@/components/shared/Table';

function ShopProducts() {
  return (
    <div className='w-full'>
      <div className='bg-slate-100flex w-full flex-col items-center justify-start gap-6 rounded-md bg-slate-100 pt-3'>
        <h4 className='text-primary mb-3 text-center'>
          Do'konnning mahsulotlari
        </h4>
        <Table
          columnDefs={shopProductsTableColumnDefs}
          data={[]}
          className='h-[1016px]'
        />
      </div>
    </div>
  );
}

export default ShopProducts;
