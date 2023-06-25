import React from 'react';
import { AiFillRead } from 'react-icons/ai';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { BiCheckCircle } from 'react-icons/bi';
import { BsTelegram } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

import clsxm from '@/lib/clsxm';

import LandingHeader from '@/components/pages/landing/components/LandingHeader';

const SuccessPage = () => {
  const [alertOpen, setAlertOpen] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 4000);
      if (window.localStorage.getItem('referral_code') === null) {
        return;
      }
      await navigator.clipboard.writeText(
        window.localStorage.getItem('referral_code') as string
      );
    } catch (error) {
      // console.error('Copy failed:', error);
    }
  };

  return (
    <div className='bg-gradient flex min-h-screen w-full items-start justify-center'>
      <div className='layout relative pt-5'>
        <LandingHeader />
        {alertOpen && (
          <div className='mx-auto  flex w-full items-center justify-between rounded-lg border border-green-500 bg-green-500 bg-opacity-10 px-4 py-2 font-medium text-green-600 md:w-4/5 lg:w-1/2'>
            <div className='flex items-center gap-2'>
              <BiCheckCircle className='text-xl' />
              <p className='text-sm'>Siz ro`yxatdan muvaffaqiyatli o`tdingiz</p>
            </div>
            <span className='cursor-pointer px-2 text-black'>
              <GrClose onClick={() => setAlertOpen(false)} />
            </span>
          </div>
        )}
        <div className='font-primary mx-auto mt-20 flex w-11/12 flex-col gap-16 pb-10 md:w-4/5 lg:w-1/2'>
          <div>
            <h1>🎉 Jamoamizga a'zo bo'lganligingiz uchun tashakkur!</h1>
            <div className='border-primary mb-10 mt-6 flex w-full flex-col items-center justify-start gap-6 rounded-md border-2 bg-slate-50 px-6 py-4'>
              <div className=''>
                <p>
                  Ushbu kod orqali siz do'stlaringizni taklif qilsangiz, har bir
                  obuna bo'lgan do'stingiz uchun{' '}
                  <span className='font-bold'>$3</span> miqdorda chegirmaga ega
                  bo'lasiz.
                </p>
                <p>
                  Kodni ko'chirib olish esingizdan chiqmasin. Xizmatimiz ishga
                  tushgunga qadar, bu kodni qayta ko'ra olmaysiz.
                </p>
              </div>
              {window.localStorage.getItem('referral_code') && (
                <div className='flex w-full items-center justify-start gap-6'>
                  <p className='font-bold'>Sizning Taklif Kodingiz</p>
                  <p className='flex h-full min-w-[120px] flex-1 items-center justify-between rounded-md border-2 border-slate-400 py-2 pl-4 pr-2 shadow-inner'>
                    <span>{window.localStorage.getItem('referral_code')}</span>
                    {!copied ? (
                      <FiCopy
                        className='cursor-pointer text-xl'
                        onClick={() => {
                          handleCopy();
                        }}
                      />
                    ) : (
                      <IoCheckmarkDoneOutline className='text-xl text-green-500' />
                    )}
                  </p>
                </div>
              )}
            </div>
            <p>
              Yangiliklardan xabardor bo'lish uchun bizni ijtimoiy tarmoqlarda
              ham kuzatib boring:
            </p>
            <div className='mt-3 flex gap-3'>
              <div className='flex  cursor-pointer items-center justify-end gap-4 rounded-md bg-blue-500 px-3 py-2 text-white transition-all duration-100 hover:bg-blue-200 hover:text-blue-500 lg:px-6'>
                <BsTelegram className='text-2xl' />
                <p className='lg:inline'>Kanalga Qo'shilish</p>
              </div>
              <div
                className={clsxm(
                  'flex cursor-pointer items-center justify-end gap-4 rounded-md bg-red-600 px-3 py-2 text-white transition-all duration-100 hover:bg-red-200 hover:text-red-500 lg:px-6',
                  'hidden'
                )}
              >
                <AiFillYoutube className='text-2xl' />
                <p className='hidden lg:inline'>Kanalga Qo'shilish</p>
              </div>
              <div
                className={clsxm(
                  'flex cursor-pointer items-center justify-end gap-4 rounded-md bg-pink-700 px-3 py-2 text-white transition-all duration-100 hover:bg-pink-200 hover:text-pink-500 lg:px-6',
                  'hidden'
                )}
              >
                <AiFillInstagram className='text-2xl' />
                <p className='hidden lg:inline'>Kanalga Qo'shilish</p>
              </div>
            </div>
          </div>
          <div className={clsxm('flex flex-col gap-8', 'hidden')}>
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
