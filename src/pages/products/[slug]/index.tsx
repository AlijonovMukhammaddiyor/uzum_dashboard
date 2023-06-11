import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import { ImImages } from 'react-icons/im';
import {
  MdOutlinePriceChange,
  MdOutlineRateReview,
  MdOutlineTypeSpecimen,
} from 'react-icons/md';
import { TbFileDescription } from 'react-icons/tb';

import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
import ImagesCarousel from '@/components/pages/products/components/ImagesCarousel';
import ProductAnalyticsChart from '@/components/pages/products/components/ProductAnalyticsChart';
import ProductPerformanceRadarChart from '@/components/pages/products/components/ProductPerformanceRadarChart';
import Seo from '@/components/Seo';
import Table from '@/components/shared/Table';

function Product() {
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
        Mahsulotlar: '/products',
        [reverseSlug as string]: `/products/${slug}`,
      }}
    >
      <Seo />
      <div className='flex w-full flex-col items-center justify-start gap-3'>
        <div className='flex h-[100px] w-full items-center justify-between p-3'>
          <div className='flex h-full items-center justify-start gap-3'>
            <Image
              src='https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3271&q=80'
              width={100}
              height={100}
              alt=''
            />
            <div className='flex h-full flex-col items-start justify-center gap-2'>
              <p className='text-lg font-bold'>Some Product title here</p>
              <a
                href={`https://uzum.uz/uz/product/${slug}-23972`}
                className='text-primary text-sm hover:underline'
              >
                https://uzum.uz/uz/product/{slug}-23972
              </a>
            </div>
          </div>
          <DropDown
            values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
            activeTab={0}
            setActiveTab={() => {
              //sdc
            }}
            className='h-[40px]'
          />
        </div>
        <div className='flex w-full items-start justify-start gap-5 overflow-x-scroll'>
          <div className='flex w-1/3 min-w-[800px] flex-col gap-6'>
            <div className='flex w-full flex-col items-start justify-start gap-8 rounded-md bg-white p-6'>
              <div className='flex w-full items-center justify-start '>
                <div className='flex justify-start gap-2'>
                  <HiOutlineBuildingStorefront className='text-primary h-6 w-6 flex-shrink-0' />
                  <p className='text-primary w-[200px] font-bold'>Do`kon</p>
                </div>
                <p>Some Seller Name</p>
              </div>
              <div className='flex w-full items-center justify-start '>
                <div className='flex items-start justify-start gap-2'>
                  <MdOutlinePriceChange className='text-primary h-6 w-6 flex-shrink-0' />
                  <p className='text-primary w-[200px] font-bold'>Narx</p>
                </div>
                <p>Some Seller Name</p>
              </div>
              <div className='flex w-full items-center justify-start '>
                <p className='text-primary ml-8 w-[200px] font-bold'>
                  Chegirmasiz Narx
                </p>
                <p>Some Seller Name</p>
              </div>
              <div className='flex w-full items-center justify-start '>
                <div className='flex items-start justify-start gap-2'>
                  <AiOutlineStar className='text-primary h-6 w-6 flex-shrink-0' />
                  <p className='text-primary w-[200px] font-bold'>Reyting</p>
                </div>
                <p>Some Seller Name</p>
              </div>
              <div className='flex w-full items-center justify-start '>
                <div className='flex items-start justify-start gap-2'>
                  <MdOutlineRateReview className='text-primary h-6 w-6 flex-shrink-0' />
                  <p className='text-primary w-[200px] font-bold'>
                    Izohlar Soni
                  </p>
                </div>

                <p>Some Seller Name</p>
              </div>
              <div className='flex w-full items-center justify-start '>
                <div className='flex items-start justify-start gap-2'>
                  <MdOutlineTypeSpecimen className='text-primary h-6 w-6 flex-shrink-0' />
                  <p className='text-primary w-[200px] font-bold'>Turlari</p>
                </div>
                <p>Some Seller Name</p>
              </div>
              <div className='flex w-full items-center justify-start '>
                <div className='flex items-start justify-start gap-2'>
                  <TbFileDescription className='text-primary h-6 w-6 flex-shrink-0' />
                  <p className='text-primary w-[200px] font-bold'>Ma'lumot</p>
                </div>
                <p>Some Seller Name</p>
              </div>
              <div className='flex w-full items-center justify-start '>
                <div className='flex items-start justify-start gap-2'>
                  <BsCalendarDate className='text-primary h-6 w-6 flex-shrink-0' />
                  <p className='text-primary w-[200px] font-bold'>
                    Kiritilgan Vaqt
                  </p>
                </div>
                <p>Some Seller Name</p>
              </div>
              <div className='flex w-full items-start justify-start '>
                <div className='flex items-start justify-start gap-2'>
                  <ImImages className='text-primary h-6 w-6 flex-shrink-0' />
                  <p className='text-primary w-[200px] font-bold'>Rasmlar</p>
                </div>
                <div className=''>
                  <ImagesCarousel
                    images={[
                      'https://images.unsplash.com/photo-1685988755134-6d6457cb9ed3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1630&q=80',
                      'https://images.unsplash.com/photo-1682686581312-506a8b53190e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
                      'https://images.unsplash.com/photo-1685731880079-dc735ec4e004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
                      'https://images.unsplash.com/photo-1682687982093-4773cb0dbc2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
                      'https://images.unsplash.com/photo-1685979457408-e897fca4782f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
                      'https://images.unsplash.com/photo-1661956600655-e772b2b97db4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80',
                      'https://plus.unsplash.com/premium_photo-1685886388079-a752867fac9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
                      'https://images.unsplash.com/photo-1686040268975-5dba451e0b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className='flex h-[800px] w-full flex-col items-start justify-start gap-5 bg-slate-100 p-3'>
              <p className='text-primary w-full text-center font-bold'>
                Kategoriya Bo'yicha Top 5 Mahsulotlar bilan Taqqoslash
              </p>
              <div className='h-full w-full bg-white'>
                <ProductPerformanceRadarChart />
              </div>
            </div>
            <div className='flex w-full flex-col items-start justify-start gap-5 bg-slate-100 p-3'>
              <p className='text-primary w-full text-center font-bold'>
                Izohlar
              </p>
              <div className='h-full w-full bg-white'>
                <Table columnDefs={productTableColumnDefs} data={[]} />
              </div>
            </div>
          </div>

          <div className='flex w-2/3 flex-1 flex-col items-start justify-start gap-6'>
            <div className='w-full min-w-[1200px] flex-1 gap-6 rounded-md bg-white p-3'>
              <ProductAnalyticsChart />
              <Table
                columnDefs={productTableColumnDefs}
                data={[]}
                className='mt-10'
              />
            </div>
            <div className='w-full bg-slate-100 p-3'>
              <p className='text-primary mb-4 w-full text-center font-bold'>
                O'xshash Mahsulotlar
              </p>
              <Table columnDefs={productTableColumnDefs} data={[]} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;

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
