import * as React from 'react';

import Layout from '@/components/layout/Layout';
import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
import WordsCloud from '@/components/pages/words/WordCloud';
import Seo from '@/components/Seo';

export default function Words() {
  return (
    <Layout
      path={{
        'Do`konlar': '/sellers',
      }}
    >
      <Seo templateTitle='Words' />
      <Seo />
      <div className='w-full rounded-md p-3'>
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={0}
          setActiveTab={() => {
            //sdc
          }}
          className=''
        />
        <WordsCloud />
      </div>
    </Layout>
  );
}
