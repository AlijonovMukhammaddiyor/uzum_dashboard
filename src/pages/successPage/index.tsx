import React from 'react';
import { AiFillRead } from 'react-icons/ai';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { BiCheckCircle } from 'react-icons/bi';
import { BsTelegram } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';

const SuccessPage = () => {
  return (
    <div className='bg_gradient min-h-screen w-full'>
      <div className='layout pt-5'>
        <div className='mx-auto   flex w-11/12 items-center justify-between rounded-lg border border-green-700 bg-green-500 bg-opacity-10 px-4 py-2 font-medium text-green-900 md:w-4/5 lg:w-1/2'>
          <div className='flex items-center gap-2'>
            <BiCheckCircle className='text-xl' />
            <p className='text-sm'>Siz ro`yxatdan muvaffaqiyatli o`tdingiz</p>
          </div>
          <span className='cursor-pointer px-2 text-black'>
            <GrClose />
          </span>
        </div>
        <div className=' mx-auto mt-32 flex w-11/12 flex-col gap-16  pb-10 lg:w-1/2'>
          <div>
            <h1>🎉 Jamoamizga a`zo bo`lganligingiz uchun tashakkur!</h1>
            <p className='mt-3'>
              Tez orada siz barcha xizmatlardan foydalanishingiz mumkin bo`ladi.
              {/* Ungagacha har qanday savol va takliflaringizni quyidagi manzilga
            yuboring:
            <a href='mailto:ulughbek4real.w@gmail.com'>ulughbek4real.com</a> */}
            </p>
            <p>
              Yangiliklardan xabardor bo`lish uchun bizni ijtimoiy tarmoqlarda
              ham kuzatib boring:
            </p>
            <div className='mt-3 flex gap-3'>
              <div className='flex  cursor-pointer items-center justify-end gap-4 rounded-md bg-blue-500 px-3 py-2 text-white transition-all duration-200 hover:bg-blue-200 hover:text-blue-500 '>
                <BsTelegram className='text-2xl' />
                <p className='hidden text-sm md:inline'>Kanalga Qo'shilish</p>
              </div>
              <div className='flex  cursor-pointer items-center justify-end gap-4 rounded-md bg-red-600 px-3 py-2 text-white transition-all duration-200 hover:bg-red-200 hover:text-red-500 '>
                <AiFillYoutube className='text-2xl' />
                <p className='hidden text-sm md:inline'>Kanalga Qo'shilish</p>
              </div>
              <div className='flex  cursor-pointer items-center justify-end gap-4 rounded-md bg-pink-700 px-3 py-2 text-white transition-all duration-200 hover:bg-pink-200 hover:text-pink-500 '>
                <AiFillInstagram className='text-2xl' />
                <p className='hidden text-sm md:inline'>Kanalga Qo'shilish</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-3 rounded-lg border border-black p-5 '>
              <div className='flex justify-between'>
                <p className='flex items-center gap-2 text-green-800'>
                  <AiFillRead className='text-2xl' /> blog
                </p>
                <p>o`qish</p>
              </div>
              <h3 className='font-semibold md:text-xl '>
                Online bozorda muvaffaqiyatni ta'minlash: Analitika
              </h3>
              <p className='text-slate-500'>
                Zamonaviy online bozorda muvaffaqiyatli bo`lish uchun nimalarga
                e'tibor berish kerakligini bilish juda muhim.
              </p>
            </div>

            <div className='flex flex-col gap-3 rounded-lg border border-black p-5 '>
              <div className='flex justify-between'>
                <p className='flex items-center gap-2 text-green-800'>
                  <AiFillRead className='text-2xl' /> blog
                </p>
                <p>o`qish</p>
              </div>
              <h3 className='font-semibold md:text-xl'>
                Online bozorda muvaffaqiyatni ta'minlash: Analitika
              </h3>
              <p className='text-slate-500'>
                Zamonaviy online bozorda muvaffaqiyatli bo`lish uchun nimalarga
                e'tibor berish kerakligini bilish juda muhim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
