import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/layout/Layout';
import ShopCategories from '@/components/pages/sellers/components/ShopCategories';
import ShopPosition from '@/components/pages/sellers/components/ShopPosition';
import ShopProducts from '@/components/pages/sellers/components/ShopProducts';
import ShopSales from '@/components/pages/sellers/components/ShopSales';
import Seo from '@/components/Seo';
import Tabs from '@/components/shared/Tabs';

function Category() {
  const [rendered, setRendered] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>('Pozitsiya');

  React.useEffect(() => {
    setRendered(true);
  }, []);

  const router = useRouter();
  const { slug } = router.query;

  const slugToName = (slug: string) => {
    const name = slug.replace(/-/g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const reverseSlug = slugToName(slug as string);

  if (!rendered) return <></>;

  return (
    <Layout
      path={{
        Kategoriyalar: '/category',
        [reverseSlug as string]: `/category/${slug}`,
      }}
    >
      <Seo />
      <div className='flex w-full items-center justify-start gap-3'>
        <p>URL:</p>
        <a
          href={`https://uzum.uz/uz/${slug}`}
          className='text-sm text-blue-500 hover:underline'
        >
          https://uzum.uz/uz/{slug}
        </a>
      </div>
      <Tabs
        tabs={[
          'Pozitsiya',
          'Tovarlar',
          'Sotuv Analitika',
          'Kategoriya Analitika',
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4'
      />
      {activeTab === 'Pozitsiya' && <ShopPosition />}
      {activeTab === 'Tovarlar' && <ShopProducts />}
      {activeTab === 'Sotuv Analitika' && <ShopSales />}
      {activeTab === 'Kategoriya Analitika' && <ShopCategories />}
    </Layout>
  );
}

export default Category;

export async function getServerSideProps({ params }: any) {
  const { slug } = params;

  // Fetch your post data here

  return {
    props: {
      slug,
      // Pass your post data here
    },
  };
}
