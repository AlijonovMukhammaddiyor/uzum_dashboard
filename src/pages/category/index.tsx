import * as React from 'react';

import Layout from '@/components/layout/Layout';
import CategoryComponent from '@/components/pages/category/CategoryComponent';
import Seo from '@/components/Seo';

export default function Category() {
  return (
    <Layout
      path={{
        Kategoriyalar: '/category',
      }}
    >
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <CategoryComponent />
    </Layout>
  );
}
