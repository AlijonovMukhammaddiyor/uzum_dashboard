import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import clsxm from '@/lib/clsxm';

import Header from '@/components/sections/Header';
import Sidebar from '@/components/sections/Sidebar';

import alarm from '@/assets/alarm.png';
import mac from '@/assets/apple.png';
import windows from '@/assets/windows.png';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { i18n } = useTranslation('common');
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);
  const [hasClosedWarning, setHasClosedWarning] = React.useState(
    localStorage.getItem('closedWarning') === 'true'
  );

  const checkScreenWidth = () => {
    if (window.innerWidth < 1500 || window.innerHeight < 840) {
      setIsWarningVisible(true);
    } else {
      setIsWarningVisible(false);
    }
  };

  React.useEffect(() => {
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
    localStorage.setItem('closedWarning', 'true');
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

  return (
    <div className='main_layout_container flex h-screen w-screen items-start justify-start overflow-hidden  bg-slate-100 pt-10'>
      {isWarningVisible && (
        <div className='fixed left-1/2 top-4 z-[1999] -translate-x-1/2 transform rounded bg-yellow-300 p-6 shadow-lg'>
          <div className='mb-4 flex items-center justify-start'>
            <Image src={alarm} width={32} height={32} alt='Warning' />
            <p className='ml-4'>
              {i18n.language === 'uz'
                ? "Ekraningiz o'lchami ozgina kichik. Saytdan qulay foydalanish uchun ekraningiz o'lchami quyidagicha kattalashtiring"
                : 'Размер вашего экрана немного мал. Чтобы использовать сайт удобно, увеличьте размер экрана до следующего'}
            </p>
          </div>

          {(getOS() === 'Windows' || getOS() === 'Linux') && (
            <div className='mb-3 flex items-center justify-start gap-4'>
              <Image src={windows} width={32} height={32} alt='Windows' />
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
              <Image src={mac} width={32} height={32} alt='Mac' />
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
          'ml-20 flex h-full w-screen items-start justify-start overflow-scroll'
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
