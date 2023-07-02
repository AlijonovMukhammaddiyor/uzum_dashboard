import React from 'react';

import {
  categoryAnalyticsColumnDefs,
  subCategoryAnalyticsColumnDefs,
} from '@/components/columnDefs';
import CategoryProductsTable from '@/components/pages/category/slug/components/CategoryProductsTable';
import CategoryAreaChart from '@/components/pages/home/components/CategoryAreaChart';
import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
import SubCategoriesPieChart from '@/components/shared/PieChart';
import ScatterPlot from '@/components/shared/Scatter';
import Table from '@/components/shared/Table';
import clsxm from '@/lib/clsxm';
import API from '@/lib/api';

export interface Props {
  activeTab: string;
  categoryId: string;
  title: string;
}

function CategoryComponent({ activeTab, categoryId }: Props) {
  return (
    <div>
      <CategoryProductsTable
        categoryId={categoryId}
        className={clsxm(activeTab !== 'Tovarlar' && 'hidden')}
      />

      <div
        className={clsxm(
          'flex flex-col gap-6',
          activeTab !== 'Trend' && 'hidden'
        )}
      >
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={0}
          setActiveTab={() => {
            //sdc
          }}
          className='-mb-3'
        />
        <CategoryAreaChart />
        {/* <Table
          columnDefs={categoryAnalyticsColumnDefs}
          className=''
          fetchData={() => {
            const api = new API(null);
            return api.get(`/category/analytics/` + categoryId + '/');
          }}
        /> */}
      </div>
      {/* 
      <div
        className={clsxm(
          'flex flex-col gap-6',
          activeTab !== 'SubKategoriyalar' && 'hidden'
        )}
      >
        <SubCategoriesPieChart />
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={0}
          setActiveTab={() => {
            //sdc
          }}
          className='-mb-3'
        />
        <Table
          className='h-[600px]'
          columnDefs={subCategoryAnalyticsColumnDefs}
          fetchData={() => {}}
        />
      </div>

      <div
        className={clsxm(
          'flex flex-col gap-6',
          activeTab !== 'Narxlar' && 'hidden'
        )}
      >
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={0}
          setActiveTab={() => {
            //sdc
          }}
          className='-mb-3'
        />
        <CategoryAreaChart />
        <Table
          columnDefs={categoryAnalyticsColumnDefs}
          fetchData={() => {}}
          className=''
        />
      </div>

      <div
        className={clsxm(
          'flex flex-col gap-6',
          activeTab !== 'Do`konlar' && 'hidden'
        )}
      >
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={0}
          setActiveTab={() => {
            //sdc
          }}
          className='-mb-3'
        />
        <ScatterPlot className='' data={[]} />
        <Table
          columnDefs={categoryAnalyticsColumnDefs}
          data={[]}
          className=''
        />
      </div> */}
    </div>
  );
}

export default CategoryComponent;
