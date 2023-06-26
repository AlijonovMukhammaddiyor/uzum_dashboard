// import { Pie } from '@ant-design/plots';
import dynamic from 'next/dynamic';

const Pie = dynamic(
  () => import('@ant-design/plots').then((item) => item.Pie),
  {
    ssr: false,
  }
);

import React from 'react';

const DemoPie = () => {
  const data = [
    {
      type: '分类一vv',
      value: 27,
    },
    {
      type: '分类二we',
      value: 25,
    },
    {
      type: '分类三sc',
      value: 18,
    },
    {
      type: '分类四ss',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '分类二aa',
      value: 25,
    },
    {
      type: '分类三gg',
      value: 18,
    },
    {
      type: '分类四12',
      value: 15,
    },
    {
      type: '分类五w',
      value: 10,
    },
    {
      type: '其他wdew',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <Pie {...config} style={{ height: '100%', width: '100%', flexGrow: '1' }} />
  );
};

// ReactDOM.render(<DemoPie />, document.getElementById('container'));

function SubCategoriesPieChart() {
  return (
    <div className='flex min-h-[600px] w-full items-center justify-between overflow-x-scroll bg-white p-3'>
      <div className='flex min-h-[600px] w-1/2 min-w-[800px] flex-col items-center justify-between'>
        <p>Mahsulotlar Ulushi</p>
        <DemoPie />
      </div>
      <div className='flex min-h-[600px] w-1/2 min-w-[800px] flex-col items-center justify-between'>
        <p>Buyurtmalar Ulushi</p>
        <DemoPie />
      </div>
      <div className='flex min-h-[600px] w-1/2 min-w-[800px] flex-col items-center justify-between'>
        <p>Buyurtmalar Ulushi</p>
        <DemoPie />
      </div>
    </div>
  );
}

export default SubCategoriesPieChart;
