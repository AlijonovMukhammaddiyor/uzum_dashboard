import Image from 'next/image';
import React from 'react';

import dashboard from '@/assets/dashboard.png';

function LandingMain() {
  return (
    <div className='bg-gradient relative h-[80vh] w-full'>
      <div className='layout flex h-full items-center  justify-between gap-16'>
        <div className=' flex h-full flex-col justify-between  py-5 md:justify-around 2xl:justify-center 2xl:gap-20 '>
          <div className=''>
            <h1 className=' font-primary text-4xl font-semibold tracking-wider md:text-5xl lg:text-6xl'>
              Kam <span className='text-primary'>vaqtda</span>
            </h1>
            <h1 className='font-primary text-4xl font-semibold tracking-wider md:mb-6 md:text-5xl lg:text-6xl '>
              katta <span className='text-[#0085FF]'>natijalar</span>!
            </h1>
            <p className='trackin-wide text-base md:text-xl lg:text-2xl'>
              Ma'lumotlarni daromadga aylantiring.
            </p>
            <p className='trackin-wide hidden text-base md:block md:text-xl lg:text-2xl'>
              Hoziroq o'z muvaffaqiyatingizni boshlang!
            </p>
          </div>
          <div className=' '>
            <div className=' flex items-center justify-start gap-6'>
              <a href="#ta'riflar">
                {' '}
                <div className=' bg-primary hover:text-primary flex cursor-pointer items-center justify-center  rounded-lg px-3 py-2 text-lg text-white shadow-xl transition-all duration-200 hover:bg-purple-300 md:px-6 md:py-4 md:text-2xl xl:text-2xl'>
                  Ro'yxatdan o'ting
                </div>
              </a>
              {/* <div className='bg-primary hover:text-primary mt-10 flex cursor-pointer items-center justify-center rounded-lg px-6 py-4 text-3xl text-white transition-all duration-200 hover:bg-purple-300'>
              <p>Kirish</p>
            </div> */}
            </div>
            <p className='ml-2 mt-2 text-slate-500 md:mt-1'>
              3 kun davomida bepul sinab ko'ring
            </p>
          </div>
        </div>
        <div className='absolute right-0 max-h-[calc(100%-250px)] w-11/12 overflow-hidden  md:max-h-[calc(100%-200px)] md:w-2/5'>
          <Image
            src={dashboard}
            alt='dashboard'
            className=' h-full w-full object-contain '
          />
        </div>
      </div>
    </div>
  );
}

export default LandingMain;
