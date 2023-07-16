import { GetServerSidePropsContext } from 'next';
import * as React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import Layout from '@/components/layout/Layout';
import SellersTable from '@/components/pages/sellers/SellersContainer';
import Tabs from '@/components/shared/Tabs';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';
export interface ShopsProps {
  user: UserType;
}
export default function Sellers({ user }: ShopsProps) {
  const [activeTab, setActiveTab] = React.useState<string>('Sotuvchilar');
  const { dispatch } = useContextState();

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({ type: 'PATH', payload: { path: null } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Layout>
      {/* <div className='w-full rounded-md bg-white p-3'>
        <p className='font-primary w-full text-center text-lg text-black'>
          Sotuv miqdoriga ko`ra do`konlar segmentatsiyasi
        </p>
        <HistogramPlot />
      </div> */}

      <Tabs
        tabs={['Sotuvchilar']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-4'
      />
      <div className='h-[calc(100vh-150px)]'>
        <SellersTable
          className={clsxm(activeTab === 'Sotuvchilar' ? '' : 'hidden')}
        />

        {/* <MainAnalytics
          className={clsxm(activeTab === 'Umumiy' ? '' : 'hidden')}
        /> */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res = await api.getCurrentUser();

    return {
      props: {
        user: res,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
}
