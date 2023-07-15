import React from 'react';

import AboutProduct from '@/components/pages/products/slug/components/AboutProduct';
import ProductAnalytics from '@/components/pages/products/slug/components/ProductAnalytics';
import SimilarProducts from '@/components/pages/products/slug/components/SimilarProducts';

interface ProductComponentProps {
  product_id: string;
  activeTab: string;
}

function ProductComponent({ product_id, activeTab }: ProductComponentProps) {
  return (
    <div className=''>
      <AboutProduct
        product_id={product_id}
        className={activeTab !== 'Mahsulot haqida' ? 'hidden' : ''}
      />
      <ProductAnalytics
        product_id={product_id}
        className={activeTab !== 'Grafik Analiz' ? 'hidden' : ''}
        isActive={activeTab === 'Grafik Analiz' ? true : false}
      />
      <SimilarProducts
        product_id={product_id}
        className={activeTab !== "O'xshash Mahsulotlar" ? 'hidden' : ''}
        isActive={activeTab === "O'xshash Mahsulotlar" ? true : false}
      />
    </div>
  );
}

export default ProductComponent;
