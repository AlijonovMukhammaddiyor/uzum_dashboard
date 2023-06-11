import Image from 'next/image';
import React from 'react';

import dashboard from '@/assets/dashboard.png';

function LandingMain() {
  return (
    <div className='bg-gradient relative h-[80vh] w-full'>
      <div className='layout flex h-full items-center justify-between gap-16'>
        <div className='flex h-full flex-col items-start justify-center overflow-hidden lg:w-[500px] xl:w-[690px]'>
          <h1 className='font-primary text-[55px] font-semibold leading-[60px] xl:text-[63px] xl:leading-[70px]'>
            Kam <span className='text-primary'>vaqtda</span>
          </h1>
          <h1 className='font-primary mb-8 text-[55px] font-semibold leading-[60px] xl:text-[63px] xl:leading-[70px]'>
            katta <span className='text-[#0085FF]'>natijalar</span>!
          </h1>
          <p className='font-primary xl:text-2 xl max-w-full text-2xl leading-[38px]  tracking-wider'>
            Ma'lumotlarni daromadga aylantiring.
          </p>
          <p className='font-primary max-w-full text-2xl leading-[38px] tracking-wider xl:text-2xl'>
            Hoziroq o'z muvaffaqiyatingizni boshlang!
          </p>
          <div className='flex items-center justify-start gap-6'>
            <div className='bg-primary hover:text-primary mt-10 flex cursor-pointer items-center justify-center rounded-lg px-6 py-4 text-2xl text-white shadow-xl transition-all duration-200 hover:bg-purple-300 xl:text-2xl'>
              Ro'yxatdan o'ting
            </div>
            {/* <div className='bg-primary hover:text-primary mt-10 flex cursor-pointer items-center justify-center rounded-lg px-6 py-4 text-3xl text-white transition-all duration-200 hover:bg-purple-300'>
              <p>Kirish</p>
            </div> */}
          </div>
          <p className='ml-2 mt-1 text-slate-500'>
            7 kun davomida bepul sinab ko'ring
          </p>
        </div>
        <div className='absolute  right-0 max-h-[calc(100%-200px)] w-2/5 min-w-[580px] overflow-hidden rounded-l-lg shadow-xl'>
          <Image
            src={dashboard}
            alt='dashboard'
            className='h-full w-full object-contain'
          />
        </div>
      </div>
    </div>
  );
}

export default LandingMain;
