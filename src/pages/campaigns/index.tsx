import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import BadgeContainer from '@/components/pages/campaigns/BadgeContainer';
import CampaignProductsDropdown from '@/components/pages/campaigns/CampaignProductsDropdown';
import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
import Seo from '@/components/Seo';
import AreaChartComponent from '@/components/shared/MultiAreaChart';

export default function Campaigns() {
  return (
    <Layout
      path={{
        'Do`konlar': '/sellers',
      }}
    >
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <div className='mb-6 flex w-full flex-wrap items-center justify-start gap-4'>
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
        <BadgeContainer />
      </div>

      <div className='relative mb-6 w-full rounded-md bg-white p-3'>
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={0}
          setActiveTab={() => {
            //sdc
          }}
          className='absolute right-3 top-3'
        />
        <div className='mt-10 flex h-[400px] w-full items-start justify-start gap-5'>
          <div className='relative flex w-1/4 flex-col gap-10'>
            <div className='w-full rounded-md bg-slate-200 p-2 pb-6'>
              <p className='mb-2 font-bold'>Mahsulotlar</p>
              <CampaignProductsDropdown
                values={[
                  'Powerful, lightweight and fully',
                  '14 Kun sdcbsdiucs soicdbsudicbsdicsd sidvcsiudcs',
                  '30 Kun sdcbsidcu sdcisvdcisvdicvsdics siduvcsidvcisvcisd sdicvusidcvsicvusi',
                  '60 Kun',
                  '90 Kun',
                ]}
                activeTab={0}
                setActiveTab={() => {
                  //sdc
                }}
                className='h-12 w-full bg-slate-100'
              />
            </div>

            <div className='w-full rounded-md p-2 pb-6'>
              <p className='mb-2 font-bold'>Do'konlar</p>
              <CampaignProductsDropdown
                values={[
                  'Powerful, lightweight and fully',
                  '14 Kun sdcbsdiucs soicdbsudicbsdicsd sidvcsiudcs',
                  '30 Kun sdcbsidcu sdcisvdcisvdicvsdics siduvcsidvcisvcisd sdicvusidcvsicvusi',
                  '60 Kun',
                  '90 Kun',
                ]}
                activeTab={0}
                setActiveTab={() => {
                  //sdc
                }}
                className='h-12 w-full bg-slate-100'
              />
            </div>
          </div>
          <div className='relative h-full w-3/4 flex-1'>
            <Image
              src='https://images.uzum.uz/ci03eilenntd8rfau5b0/main_page_banner.jpg'
              className='h-full w-full rounded-md'
              alt=''
              layout='fill'
            />
          </div>
        </div>
      </div>

      <div className='relative h-[600px] w-full rounded-md bg-white p-3'>
        <AreaChartComponent />
      </div>
    </Layout>
  );
}
