import React from 'react';

import clsxm from '@/lib/clsxm';

import CategoryProductsTable from '@/components/pages/category/slug/components/CategoryProductsTable';
import CategoryShops from '@/components/pages/category/slug/components/CategoryShops';
import CategoryTrends from '@/components/pages/category/slug/components/CategoryTrends';
import Segmentation from '@/components/pages/category/slug/components/Segmentation';
import Subcategories from '@/components/pages/category/slug/components/Subcategories';

export interface Props {
  activeTab: string;
  categoryId: string;
  title: string;
}

function CategoryComponent({ activeTab, categoryId }: Props) {
  const [mounted, setMounted] = React.useState<boolean>(false);

  return (
    <div>
      <CategoryProductsTable
        categoryId={categoryId}
        className={clsxm(activeTab !== 'Tovarlar' && 'hidden')}
      />

      <CategoryTrends
        className={clsxm(activeTab !== 'Trend' && 'hidden')}
        categoryId={categoryId}
      />

      <Subcategories
        className={clsxm(activeTab !== 'Ichki Kategoriyalar' && 'hidden')}
        categoryId={categoryId}
      />

      <Segmentation
        className={clsxm(activeTab !== 'Segmentatsiya' && 'hidden')}
        categoryId={categoryId}
      />

      <CategoryShops
        className={clsxm(activeTab !== 'Sotuvchilar' && 'hidden')}
        categoryId={categoryId}
      />

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
