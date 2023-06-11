import { useRouter } from 'next/router';
import React from 'react';

import {
  categoryAnalyticsColumnDefs,
  productTableColumnDefs,
  subCategoryAnalyticsColumnDefs,
} from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import CategoryAreaChart from '@/components/pages/home/components/CategoryAreaChart';
import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
import Seo from '@/components/Seo';
import SubCategoriesPieChart from '@/components/shared/PieChart';
import ScatterPlot from '@/components/shared/Scatter';
import Table from '@/components/shared/Table';
import Tabs from '@/components/shared/Tabs';

function Category() {
  const [rendered, setRendered] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>('Tovarlar');

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
          href={`https://uzum.uz/uz/category/${slug}-23232`}
          className='text-sm text-blue-500 hover:underline'
        >
          https://uzum.uz/uz/category/{slug}-23232
        </a>
      </div>

      <Tabs
        tabs={[
          'Tovarlar',
          'Trend',
          'SubKategoriyalar',
          'Narxlar',
          'Do`konlar',
          'Kunlik',
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4'
      />
      {rendered && activeTab === 'Tovarlar' && (
        <Table
          columnDefs={productTableColumnDefs}
          data={[]}
          className='h-[1016px]'
        />
      )}
      {rendered && activeTab === 'Trend' && (
        <div className='flex flex-col gap-6'>
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
            data={[]}
            className=''
          />
        </div>
      )}
      {rendered && activeTab === 'SubKategoriyalar' && (
        <div className='flex flex-col gap-6'>
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
            data={[]}
          />
        </div>
      )}
      {rendered && activeTab === 'Narxlar' && (
        <div className='flex flex-col gap-6'>
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
            data={[]}
            className=''
          />
        </div>
      )}
      {rendered && activeTab === 'Do`konlar' && (
        <div className='flex flex-col gap-6'>
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
        </div>
      )}
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
