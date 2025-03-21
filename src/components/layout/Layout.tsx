/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

// close icon
import clsxm from '@/lib/clsxm';

import FloatingButtons from '@/components/layout/floating/FloatingButtons';
import Header from '@/components/sections/Header';
import Sidebar from '@/components/sections/Sidebar';

import telegram from '@/assets/telegram.png';
import youtube from '@/assets/youtube.png';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { i18n } = useTranslation('common');
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);
  const [hasClosedWarning, setHasClosedWarning] = React.useState(true);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(true);

  const checkScreenWidth = () => {
    if (window.innerWidth < 1500 || window.innerHeight < 840) {
      setIsWarningVisible(true);
    } else {
      setIsWarningVisible(false);
    }
  };

  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const closedWarning = localStorage.getItem('closedWarning');
      if (closedWarning === 'true') {
        setHasClosedWarning(false);
        window.localStorage.removeItem('closedWarning');
      }
      const closedWarning2 = localStorage.getItem('closedWarning');

      if (closedWarning2) {
        const parsed = JSON.parse(closedWarning2);
        if (parsed.hasClosedWarning !== 'true') {
          setHasClosedWarning(false);
          return;
        }
        if (parsed.expiresAt > new Date().getTime()) {
          setHasClosedWarning(true);
        } else {
          setHasClosedWarning(false);
        }
      } else {
        setHasClosedWarning(false);
      }
    } catch (e) {
      console.log(e);
    }

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasClosedWarning]);

  const closeWarning = () => {
    setIsWarningVisible(false);
    setHasClosedWarning(true);
    localStorage.setItem(
      'closedWarning',
      JSON.stringify({
        hasClosedWarning: 'true',
        expiresAt: new Date().getTime() + 1000 * 60 * 60 * 24 * 1,
      })
    );
  };

  function getOS() {
    if (typeof window === 'undefined') return 'Unknown OS';
    let os = 'Unknown OS';
    if (window.navigator.userAgent.indexOf('Windows') != -1) {
      os = 'Windows';
    } else if (window.navigator.userAgent.indexOf('Mac OS') != -1) {
      os = 'Macintosh';
    } else if (window.navigator.userAgent.indexOf('Linux') != -1) {
      os = 'Linux';
    } else {
      os = 'Unknown OS';
    }

    return os;
  }

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(1); // 80% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (router.pathname === '/login') return;
    if (router.pathname === '/register') return;

    (document.documentElement.style as any).zoom = zoomLevel;
    document.body.style.width = `${100 / zoomLevel}vw`;
    document.body.style.height = `${100 / zoomLevel}vh`;

    const nextDiv = document.getElementById('__next') as HTMLDivElement;
    nextDiv.style.width = `${100 / zoomLevel}vw`;
    nextDiv.style.height = `${100 / zoomLevel}vh`;

    const uzanalitikaDiv = document.getElementById(
      'uzanalitika'
    ) as HTMLDivElement;

    uzanalitikaDiv.style.width = `${100 / zoomLevel}vw`;
    uzanalitikaDiv.style.height = `${100 / zoomLevel}vh`;
  }, [router.pathname, zoomLevel]);

  const buttonsList = [
    {
      onClick: () => alert('clicked instagram'),
      src: youtube,
      label: i18n.language === 'uz' ? "Qo'llanma" : 'Руководство',
      bgColor: '#FE0000',
      href: 'https://www.youtube.com/watch?v=zsZtVNYyPEc&t=1s',
    },
    {
      onClick: () => alert('clicked medium'),
      src: telegram,
      label: i18n.language === 'uz' ? 'Guruh' : 'Группа',
      bgColor: '#039BE5',
      href: 'https://t.me/uzum_uzanalitika',
    },
  ];

  return (
    <div
      className='relative flex h-full w-full items-start justify-start overflow-hidden  bg-white pt-10'
      id='uzanalitika'
    >
      {isWarningVisible && !hasClosedWarning && (
        <div className='fixed left-1/2 top-4 z-[1999] -translate-x-1/2 transform rounded bg-yellow-300 p-6 shadow-lg'>
          <div className='mb-4 flex items-center justify-start'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/images/layout/alarm.png'
              width={32}
              height={32}
              alt='Warning'
            />
            <p className='ml-4'>
              {i18n.language === 'uz'
                ? "Ekraningiz o'lchami ozgina kichik. Saytdan qulay foydalanish uchun ekraningiz o'lchami quyidagicha kattalashtiring"
                : 'Размер вашего экрана немного мал. Чтобы использовать сайт удобно, увеличьте размер экрана до следующего'}
            </p>
          </div>

          {(getOS() === 'Windows' || getOS() === 'Linux') && (
            <div className='mb-3 flex items-center justify-start gap-4'>
              <img
                src='/images/layout/windows.png'
                width={32}
                height={32}
                alt='Windows'
              />
              <p>
                {i18n.language === 'uz' ? 'Klaviaturadan' : 'Нажмите'}{' '}
                <strong>{i18n.language === 'uz' ? 'Ctrl' : 'Ctrl'}</strong>{' '}
                {i18n.language === 'uz' ? 'va' : 'и'}{' '}
                <strong className='text-xl'>-</strong>{' '}
                {i18n.language === 'uz' ? 'ni bosing' : 'нажмите'}
              </p>
            </div>
          )}

          {getOS() === 'Macintosh' && (
            <div className='mb-3 flex items-center justify-start gap-4'>
              <img
                src='/images/layout/apple.png'
                width={32}
                height={32}
                alt='Mac'
              />
              <p>
                {i18n.language === 'uz' ? 'Klaviaturadan' : 'Нажмите'}{' '}
                <strong>{i18n.language === 'uz' ? '⌘' : '⌘'}</strong>{' '}
                {i18n.language === 'uz' ? 'va' : 'и'}{' '}
                <strong className='text-xl'>-</strong>{' '}
                {i18n.language === 'uz' ? 'ni bosing' : 'на клавиатуре.'}
              </p>
            </div>
          )}

          <button
            onClick={closeWarning}
            className='mt-2 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600'
          >
            {i18n.language === 'uz' ? 'Tushunaman, yopish' : 'Понял, закрыть'}
          </button>
        </div>
      )}

      <FloatingButtons
        buttonType='plus'
        buttonsList={buttonsList}
        left={50}
        dimension={50}
        direction='up'
      />

      {/*  */}

      <Sidebar
        className='fixed left-0 top-0 z-50 h-full'
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveTab={setActiveTab}
      />
      <Header />
      <div
        className={clsxm(
          'ml-20 flex h-full w-full items-start justify-start overflow-scroll'
        )}
      >
        <div className='flex h-full w-full flex-1 flex-col py-3 pr-4'>
          <Toaster
            position='top-center'
            reverseOrder={false}
            gutter={32}
            toastOptions={{
              duration: 2000,
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
