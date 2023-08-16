import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Header from '@/components/sections/Header';
import Sidebar from '@/components/sections/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className='main_layout_container flex h-screen w-screen items-start justify-start overflow-hidden  bg-white pt-10'>
      <Sidebar
        className='fixed left-0 top-0 z-50 h-full'
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveTab={setActiveTab}
      />
      <Header />
      <div className={clsxm('h-full w-screen overflow-scroll')}>
        <div className='h-full w-full flex-1 overflow-scroll p-4 pl-20'>
          {children}
        </div>
      </div>
    </div>
  );
}
