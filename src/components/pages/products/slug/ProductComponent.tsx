import React from 'react';
import { useTranslation } from 'react-i18next';

import AboutProduct from '@/components/pages/products/slug/components/AboutProduct';
import ProductAnalytics, {
  ProductAnalyticsType,
} from '@/components/pages/products/slug/components/ProductAnalytics';
import ProductPosition from '@/components/pages/products/slug/components/ProductPosition';
import SimilarProducts from '@/components/pages/products/slug/components/SimilarProducts';
import SkuAnalytics from '@/components/pages/products/slug/components/SkuAnalytics';

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
  const [product, setProduct] = React.useState<ProductAnalyticsType | null>(
    null
  );

  return (
    <div className='min-h-full'>
      <AboutProduct
        product_id={product_id}
        className={activeTab !== t('tabs.about_product') ? 'hidden' : ''}
      />
      <SkuAnalytics
        product_id={product_id}
        className={activeTab !== t('tabs.sku_analytics') ? 'hidden' : ''}
        isActive={activeTab === t('tabs.sku_analytics') ? true : false}
        user={user}
        characteristics={product?.characteristics ?? '[]'}
        data={product?.skus ?? []}
      />
      <ProductAnalytics
        product={product}
        setProduct={setProduct}
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
    </div>
  );
}

export default ProductComponent;
