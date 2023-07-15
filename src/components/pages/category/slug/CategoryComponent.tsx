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
  return (
    <div>
      <CategoryProductsTable
        categoryId={categoryId}
        className={clsxm(activeTab !== 'Tovarlar' && 'hidden')}
      />

      <CategoryTrends
        className={clsxm(activeTab !== 'Trend' && 'hidden')}
        categoryId={categoryId}
        isActive={activeTab === 'Trend' ? true : false}
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
    </div>
  );
}

export default CategoryComponent;
