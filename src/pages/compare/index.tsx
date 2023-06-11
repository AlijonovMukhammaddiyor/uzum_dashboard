import * as React from 'react';
import {
  HiOutlineBuildingStorefront,
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
} from 'react-icons/hi2';

import clsxm from '@/lib/clsxm';

import Layout from '@/components/layout/Layout';
import CampaignProductsDropdown from '@/components/pages/campaigns/CampaignProductsDropdown';
import Seo from '@/components/Seo';

export default function Compare() {
  const [activeTab, setActiveTab] = React.useState('sellers');

  return (
    <Layout
      path={{
        'Do`konlar': '/sellers',
      }}
    >
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <div className='flex w-full items-center justify-start gap-6'>
        <CompareTab
          activeTab={activeTab}
          setActiveTab={() => {
            setActiveTab('sellers');
          }}
          title='Do`konlarni Taqqoslash'
          tab='sellers'
          icon={<HiOutlineBuildingStorefront className='h-6 w-6' />}
        />
        <CompareTab
          activeTab={activeTab}
          setActiveTab={() => {
            setActiveTab('products');
          }}
          title='Mahsulotlarni Taqqoslash'
          tab='products'
          icon={<HiOutlineShoppingBag className='h-6 w-6' />}
        />
        <CompareTab
          activeTab={activeTab}
          setActiveTab={() => {
            setActiveTab('categories');
          }}
          title='Kategoriyalarni Taqqoslash'
          tab='categories'
          icon={<HiOutlineSquares2X2 className='h-6 w-6' />}
        />
      </div>
      <div className='mt-6 flex w-full items-center gap-10 rounded-md bg-white p-3'>
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
      <div className='mt-6 w-full rounded-md bg-white p-3'></div>
    </Layout>
  );
}

function CompareTab({
  activeTab,
  setActiveTab,
  title,
  tab,
  icon,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  title: string;
  tab: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={clsxm(
        'flex h-[50px] w-[300px] cursor-pointer items-center justify-center gap-2 rounded-md bg-white',
        activeTab === tab && 'bg-primary text-white',
        activeTab !== tab && 'text-primary hover:bg-slate-100'
      )}
      onClick={() => setActiveTab(tab)}
    >
      {icon}
      {title}
    </div>
  );
}
