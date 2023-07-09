import Image from 'next/image';
import React from 'react';

import dashboard from '@/assets/dashboard2.png';

function LandingMain() {
  return (
    <div className='bg-gradient h-[calc(100vh-98px)] w-full overflow-hidden'>
      <div className='layout relative flex h-full items-center  justify-between gap-16'>
        <div className='base:justify-center base:gap-20 flex h-full w-full flex-col justify-center gap-10 py-5 2xl:justify-center '>
          <div className=''>
            <h1 className='font-primary text-3xl font-semibold tracking-wider sm:text-4xl md:text-5xl lg:text-6xl'>
              Kam <span className='text-primary'>vaqtda</span>
            </h1>
            <h1 className='font-primary text-3xl font-semibold tracking-wider sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl '>
              Katta <span className='text-[#0085FF]'>natijalar</span>!
            </h1>
            <p className='mt-4 text-base md:mt-0 md:text-xl lg:text-2xl'>
              Ma'lumotlarni daromadga aylantiring.
            </p>
            <p className='text-base md:block md:text-xl lg:text-2xl'>
              Hoziroq o'z muvaffaqiyatingizni boshlang!
            </p>
          </div>
          <div className='base:bottom-[370px] base:top-[300px] base:left-[500px] base:w-[900px] base:hidden bottom-[290px] right-0 w-full overflow-hidden lg:-right-40  lg:left-[700px]'>
            <Image
              src={dashboard}
              alt='dashboard'
              className='h-full w-full object-contain '
            />
          </div>
          <div className='w-full'>
            <div className='flex w-full items-center justify-start gap-6'>
              <a href="#ta'riflar" className='w-full'>
                <div className='bg-primary base:mt-0 hover:text-primary base:max-w-max flex w-full cursor-pointer items-center justify-center rounded-lg px-3 py-2 text-lg text-white shadow-xl transition-all duration-200 hover:bg-purple-300 md:px-6 md:py-4 md:text-2xl xl:text-2xl'>
                  Ro'yxatdan o'ting
                </div>
              </a>
              {/* <div className='bg-primary hover:text-primary mt-10 flex cursor-pointer items-center justify-center rounded-lg px-6 py-4 text-3xl text-white transition-all duration-200 hover:bg-purple-300'>
              <p>Kirish</p>
            </div> */}
            </div>
            {/* <p className='ml-2 mt-2 text-slate-500 md:mt-1'>
              3 kun davomida bepul sinab ko'ring
            </p> */}
          </div>
        </div>
        <div className='base:flex hidden h-[80vh]'>
          <Image
            src={dashboard}
            alt='dashboard'
            className='h-full w-full object-contain '
          />
        </div>
      </div>
    </div>
  );
}

export default LandingMain;
