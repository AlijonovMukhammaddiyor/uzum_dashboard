import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import clsxm from '@/lib/clsxm';

import Header from '@/components/sections/Header';
import Sidebar from '@/components/sections/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className='main_layout_container flex h-screen w-screen items-start justify-start overflow-hidden  bg-slate-100 pt-10'>
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
        <div className='flex h-full w-full flex-1 py-3 pr-4'>
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
