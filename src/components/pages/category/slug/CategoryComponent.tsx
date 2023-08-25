import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('tabs');
  return (
    <div className='w-full max-w-full pb-12'>
      <CategoryProductsTable
        categoryId={categoryId}
        className={clsxm(activeTab !== t('categories.goods') && 'hidden')}
        activeTab={activeTab}
      />

      <CategoryTrends
        className={clsxm(activeTab !== t('categories.trend') && 'hidden')}
        categoryId={categoryId}
        isActive={activeTab === t('categories.trend') ? true : false}
      />

      <Subcategories
        className={clsxm(
          activeTab !== t('categories.subcategories') && 'hidden'
        )}
        categoryId={categoryId}
        isActive={activeTab === t('categories.subcategories') ? true : false}
      />

      <Segmentation
        className={clsxm(
          activeTab !== t('categories.segmentation') && 'hidden'
        )}
        categoryId={categoryId}
        isActive={activeTab === t('categories.segmentation') ? true : false}
      />

      <CategoryShops
        className={clsxm(activeTab !== t('categories.sellers') && 'hidden')}
        categoryId={categoryId}
        activeTab={activeTab}
      />
    </div>
  );
}

export default CategoryComponent;
