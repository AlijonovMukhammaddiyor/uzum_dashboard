import * as React from 'react';

import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/shared/PaginatedTable';

export default function Products() {
  return (
    <Layout
      path={{
        Mahsulotlar: '/products',
      }}
    >
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <Table columnDefs={productTableColumnDefs} data={[]} className='h-full' />
    </Layout>
  );
}
