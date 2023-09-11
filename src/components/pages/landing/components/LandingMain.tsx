import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
// import to double right icon from react icons
import { FaExpandAlt } from 'react-icons/fa';
import { ImShrink2 } from 'react-icons/im';
import Popup from 'reactjs-popup';

import clsxm from '@/lib/clsxm';

import play from '@/assets/play.png';

function LandingMain({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { t, i18n } = useTranslation('landing');
  //
  return (
    <div className='moving_bg h-auto w-full overflow-hidden md:py-48'>
      <div className='layout relative flex h-full items-start justify-between gap-10  pb-10'>
        <div className='base:gap-20 base:w-1/2 flex h-full w-full flex-col justify-start gap-10  py-5'>
          <div className='base:text-start mt-28 flex max-w-full flex-col justify-center md:mt-12  '>
            <div className='flex max-w-full'>
              <h1 className='font-primary text_gradient base:leading-[58px] text-[36px] font-extrabold leading-[40px] lg:text-[52px]'>
                Специализированная аналитика для маркетплейса Uzum
              </h1>
            </div>
            <p className='mt-6 w-full text-base text-white md:w-4/5 md:text-xl lg:text-xl'>
              Откройте для себя высокодоходные сегменты, следите за актуальными
              тенденциями, отслеживайте эффективность продаж, выводите ваши
              товары на пик популярности и укрепляйте позиции на маркетплейсе с
              помощью наших передовых аналитических решений
            </p>
          </div>

          <div className='base:hidden max-w-ful relative h-full min-h-[400px] w-full rounded-md bg-transparent'>
            <p className='font-primary mb-6 w-[270px] rounded-md bg-black px-3 py-1 text-center text-base text-white'>
              {i18n.language === 'uz'
                ? 'Xizmatlarimizdan namunalar...'
                : 'Примеры наших услуг...'}
            </p>
            <div
              onClick={() => {
                setOpen(true);
              }}
              className='absolute right-3 top-16 z-[100] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-25'
            >
              <FaExpandAlt
                className='h-5 w-5 cursor-pointer text-black'
                onClick={() => {
                  setOpen(true);
                }}
              />
            </div>
            <div className='aspect-ratio-wrapper'>
              <iframe
                className='aspect-ratio-iframe'
                src='https://www.youtube.com/embed/zsZtVNYyPEc?si=UZBQQLbH7gs_PYt-'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className='w-full'>
            <div className='base:flex-row flex w-full flex-col items-center justify-start gap-4'>
              <Link href='/register' className='base:w-auto w-full'>
                <div
                  className={clsxm(
                    'base:mt-0 mx-auto flex w-full cursor-pointer items-center justify-center',
                    'get_started_button relative rounded-md border-2 py-4 pl-8 pr-16 text-[18px] shadow-xl transition-all duration-200'
                  )}
                >
                  <p className=''>{t('main.button.signup')}</p>
                  {/* <AiOutlineDoubleRight className='absolute right-2 ml-2 h-5 w-5' />
                   */}
                  <Image
                    src={play}
                    alt='play'
                    className='absolute right-2 ml-2 h-5 w-5'
                  />
                </div>
              </Link>
              {/* <div className='bg-primary hover:text-primary mt-10 flex cursor-pointer items-center justify-center rounded-lg px-6 py-4 text-3xl text-white transition-all duration-200 hover:bg-purple-300'>
              <p>Kirish</p>
            </div> */}
            </div>
            {/* <p className='ml-2 mt-2 text-slate-500 md:mt-1'>
              3 kun davomida bepul sinab ko'ring
            </p> */}
          </div>
        </div>
        <div className='base:inline relative mt-20 hidden h-[500px] min-h-[500px] w-3/4 rounded-md bg-transparent'>
          <p className='font-primary mb-6 w-[270px] rounded-md bg-black px-3 py-1 text-center text-base text-white'>
            {i18n.language === 'uz'
              ? 'Xizmatlarimizdan namunalar...'
              : 'Примеры наших услуг...'}
          </p>
          <div
            onClick={() => {
              setOpen(true);
            }}
            className='absolute right-3 top-16 z-[100] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-25'
          >
            <FaExpandAlt
              className='h-5 w-5 cursor-pointer text-black'
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
          <div className='aspect-ratio-wrapper'>
            <iframe
              className='aspect-ratio-iframe'
              src='https://www.youtube.com/embed/zsZtVNYyPEc?si=UZBQQLbH7gs_PYt-'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <Popup
          open={open}
          closeOnDocumentClick={false}
          onClose={() => setOpen(false)}
          contentStyle={{
            width: '100vw',
            height: '100vh',
            overflow: 'scroll',
            // padding: '50px 0 0 0',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999999,
          }}
        >
          <div
            onClick={() => {
              setOpen(false);
            }}
            className='absolute right-10 top-16 z-[10000] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-25'
          >
            <ImShrink2
              className='h-5 w-5 cursor-pointer text-black'
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          <iframe
            width='100%'
            height='92%'
            src='https://www.youtube.com/embed/zsZtVNYyPEc?si=UZBQQLbH7gs_PYt-'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen
          ></iframe>
        </Popup>
      </div>
    </div>
  );
}

export default LandingMain;
