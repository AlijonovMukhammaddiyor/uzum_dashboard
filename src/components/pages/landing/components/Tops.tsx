import React from 'react';

const demoProducts: {
  title: string;
  count: number;
}[] = [
  {
    title: 'Mahsulot 1',
    count: 100,
  },
  {
    title: 'Mahsulot 2',
    count: 90,
  },
  {
    title: 'Mahsulot 3',
    count: 86,
  },
  {
    title: 'Mahsulot 4',
    count: 80,
  },
  {
    title: 'Mahsulot 5',
    count: 70,
  },
];

const demoShops = [
  {
    title: 'Do`kon 1',
    count: 1000,
  },
  {
    title: 'Do`kon 2',
    count: 900,
  },
  {
    title: 'Do`kon 13',
    count: 800,
  },
  {
    title: 'Do`kon 14',
    count: 700,
  },
  {
    title: 'Do`kon 15',
    count: 650,
  },
];

function Tops() {
  return (
    <div className='relative w-full bg-[#F3F5F7] py-16 md:py-32'>
      <div className='layout flex flex-col justify-start gap-10 md:flex-row'>
        <div className='mx-auto flex w-11/12 flex-col items-start justify-start md:w-1/2'>
          <h3 className='mb-8'>Eng Ko'p sotilgan mahsulotlar</h3>
          <div className='w-full'>
            <ul className='flex w-full flex-col gap-5'>
              {demoProducts.map((item, index) => (
                <ListItem
                  key={index}
                  title={item.title}
                  count={item.count}
                  index={index + 1}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className='mx-auto flex w-11/12 flex-col items-start justify-start md:w-1/2'>
          <h3 className='mb-8'>Eng Ko'p sotgan Do`konlar</h3>
          <div className='w-full'>
            <ul className='flex w-full flex-col gap-5'>
              {demoShops.map((item, index) => (
                <ListItem
                  key={index}
                  title={item.title}
                  count={item.count}
                  index={index + 1}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  count,
  index,
}: {
  title: string;
  count: number;
  index: number;
}) {
  return (
    <li className='boder flex w-full items-center justify-between border-b border-slate-300'>
      <div className='flex items-center justify-start gap-5'>
        <p className='w-[30px] text-2xl text-blue-500'>0{index}</p>
        <div className='text-sm'>{title}</div>
      </div>
      <div className='text-sm'>{count}</div>
    </li>
  );
}

export default Tops;
