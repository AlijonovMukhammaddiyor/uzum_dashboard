import * as React from 'react';

// import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function Products() {
  return (
    <Layout>
      <Seo />
      {/* <Table columnDefs={productTableColumnDefs} data={[]} className='h-full' /> */}
    </Layout>
  );
}
