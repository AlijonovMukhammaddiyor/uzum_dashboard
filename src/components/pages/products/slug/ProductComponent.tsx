import React from 'react';
import { useTranslation } from 'react-i18next';

import AboutProduct from '@/components/pages/products/slug/components/AboutProduct';
import ProductAnalytics from '@/components/pages/products/slug/components/ProductAnalytics';
import ProductPosition from '@/components/pages/products/slug/components/ProductPosition';
import SimilarProducts from '@/components/pages/products/slug/components/SimilarProducts';
import SkuTest from '@/components/pages/products/slug/components/SkuTest';

import { UserType } from '@/types/user';

interface ProductComponentProps {
  product_id: string;
  activeTab: string;
  user: UserType;
}

function ProductComponent({
  product_id,
  activeTab,
  user,
}: ProductComponentProps) {
  const { t } = useTranslation('products');

  return (
    <div className=''>
      <AboutProduct
        product_id={product_id}
        className={activeTab !== t('tabs.about_product') ? 'hidden' : ''}
      />
      <ProductAnalytics
        product_id={product_id}
        className={activeTab !== t('tabs.graph_analysis') ? 'hidden' : ''}
        isActive={activeTab === t('tabs.graph_analysis') ? true : false}
      />
      <SimilarProducts
        user={user}
        product_id={product_id}
        className={activeTab !== t('tabs.similar_products') ? 'hidden' : ''}
        isActive={activeTab === t('tabs.similar_products') ? true : false}
      />
      <ProductPosition
        product_id={product_id}
        className={activeTab !== t('tabs.position') ? 'hidden' : ''}
        isActive={activeTab === t('tabs.position') ? true : false}
      />

      <SkuTest
        product_id={product_id}
        className={activeTab !== 'Test' ? 'hidden' : ''}
        isActive={activeTab === 'Test' ? true : false}
      />
    </div>
  );
}

export default ProductComponent;
