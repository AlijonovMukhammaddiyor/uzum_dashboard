import * as React from 'react';

import { shopsTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
import Seo from '@/components/Seo';
import HistogramPlot from '@/components/shared/Histogram';
import Table from '@/components/shared/PaginatedTable';

export default function Sellers() {
  return (
    <Layout
      path={{
        'Do`konlar': '/sellers',
      }}
    >
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <div className='w-full rounded-md bg-white p-3'>
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={0}
          setActiveTab={() => {
            //sdc
          }}
          className='-mb-3'
        />
        <p className='font-primary w-full text-center text-lg text-black'>
          Sotuv miqdoriga ko`ra do`konlar segmentatsiyasi
        </p>
        <HistogramPlot />
      </div>

      <Table columnDefs={shopsTableColumnDefs} data={[]} className='mt-6' />
    </Layout>
  );
}
