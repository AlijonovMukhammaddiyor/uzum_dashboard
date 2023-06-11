import React from 'react';

function SectionOverview() {
  return (
    <div className='mt-6 w-full py-28'>
      <div className='layout flex h-full flex-col items-center justify-center gap-10'>
        <div className='flex w-full flex-col items-center justify-center'>
          <h2 className='font-primary mb-4 w-[80%] text-center text-[40px] font-normal'>
            Sizning savdoingizni{' '}
            <span className='text-primary'>rivojlantirish</span>
          </h2>
          <h2 className=' w-[80%] text-center text-[40px] font-normal'>
            uchun mo'ljallangan
          </h2>
        </div>
        <div className='mt-10 flex w-full flex-row items-center justify-center gap-10 xl:flex-row xl:justify-center'>
          <div className='flex justify-evenly gap-10 xl:w-1/2'>
            <div className='flex h-[200px] w-[250px] flex-col gap-4 rounded-lg border-2 border-blue-500 p-3 shadow-md'>
              <p className='bg-linear w-max rounded-lg px-2 py-1'>
                Ichki analitika
              </p>
              <p className=''>
                Tezkor va samarali savdo boshqaruv tizimini yaratish uchun
                ma'lumotlaringizni tahlil qiling.
              </p>
            </div>
            <div className='flex h-[200px] w-[250px] flex-col gap-4 rounded-lg border-2 border-blue-500 p-3 shadow-md'>
              <p className='bg-linear w-max rounded-lg px-2 py-1'>
                Tashqi analitika
              </p>
              <p className=''>
                O'zingizni ishonchli his qilish uchun bozor va raqobatchilarning
                o'zaro ta'sirini yaxshilab ko'rib chiqing.
              </p>
            </div>
          </div>
          <div className='flex justify-evenly gap-10 xl:w-1/2'>
            <div className='flex h-[200px] w-[250px] flex-col gap-4 rounded-lg border-2 border-blue-500 p-3 shadow-md'>
              <p className='bg-linear w-max rounded-lg px-2 py-1'>Trendlar</p>
              <p className=''>
                Istiqbolli nish va joriy trendlarni aniqlang va o'z
                biznesingizga ularga moslashtiring.
              </p>
            </div>
            <div className='flex h-[200px] w-[250px] flex-col gap-4 rounded-lg border-2 border-blue-500 p-3 shadow-md'>
              <p className='bg-linear w-max rounded-lg px-2 py-1'>Studio</p>
              <p className=''>
                Mahsulotlar uchun ajoyib, jozibali banner va rasmlarni yaratish
                imkoniyati.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionOverview;
