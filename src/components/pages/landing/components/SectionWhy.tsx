import React from 'react';

function SectionWhy() {
  return (
    <div className='relative  w-full bg-[#F3F5F7] py-16 md:py-32'>
      <div className='layout flex h-full flex-col items-center justify-between gap-16 md:gap-32 lg:flex-row'>
        <div className=' flex h-full w-11/12 flex-col justify-center overflow-hidden text-center  lg:w-1/2  lg:items-start'>
          <h1 className=' font-primary text-3xl font-semibold leading-8 tracking-wider md:text-[35px] md:leading-[40px] xl:text-[43px] xl:leading-[60px]'>
            Nima uchun <span className='text-blue-500'>analitikasiz</span>
          </h1>
          <h1 className=' font-primary text-3xl font-semibold leading-8 tracking-wider md:text-[35px] md:leading-[40px] xl:text-[43px] xl:leading-[60px]'>
            bozorga kirish juda qiyin?
          </h1>

          {/* <p className='font-primary mb-3 max-w-full text-2xl leading-[38px] tracking-wider xl:text-3xl'>
            Xizmatlarimiz orqali onlayn savdoingizni tezlashtiring va
            biznesingizni yangi darajaga ko'taring.
          </p> */}
          <p className=' font-primary mt-6 max-w-full text-lg leading-6 tracking-wider text-slate-600 md:text-2xl md:leading-[38px] xl:text-2xl'>
            Aniq va so`nggi analitika ma'lumotlari shunchaki foyda emas, ular
            zaruratdir.
          </p>
        </div>
        <div className='flex w-11/12 flex-col items-start justify-start gap-10 md:w-1/2'>
          <ContainerItem
            title=''
            description='Yagona sotilmay qolgan mahsulotingiz analitika xizmati narxidan sezilarli darajada oshib ketishi mumkin.'
            icon=''
            color=''
            index={1}
          />
          <ContainerItem
            title=''
            description='Bizning xizmatlar bilan atiga bir necha minutlarda to`g`ri qarorlarni qbul qiling'
            icon=''
            color=''
            index={2}
          />
          <ContainerItem
            title=''
            description='So`nggi trendlar, bozordagi o`zgarishlar haqida tezkor yangiliklar bilan hammadan oldinda turing!'
            icon=''
            color=''
            index={3}
          />
          <ContainerItem
            title=''
            description='Chegirmalar va reklamalar mahsulotlar sotuviga qanday ta`sir qilayotgani haqida ma`lumotlarni oling.'
            icon=''
            color=''
            index={4}
          />
        </div>
      </div>
    </div>
  );
}

function ContainerItem({
  title,
  description,
  icon,
  color,
  index,
  className = '',
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
  className?: string;
  index?: number;
}) {
  return (
    <div className='flex w-full items-center justify-start gap-5 rounded-md border border-slate-300 p-4 md:h-[80px]'>
      <p className='text-primary text-3xl'>{index}</p>
      <div className='text-sm'>{description}</div>
    </div>
  );
}

export default SectionWhy;
