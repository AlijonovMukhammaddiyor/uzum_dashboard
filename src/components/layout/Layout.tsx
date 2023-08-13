import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Header from '@/components/sections/Header';
import Sidebar from '@/components/sections/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className='main_layout_container flex h-screen w-screen items-start justify-start  overflow-hidden bg-white'>
      <Sidebar
        className='fixed left-0 top-0 z-50 h-full'
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveTab={setActiveTab}
      />
      <div
        className={clsxm(
          'flex h-full flex-1 flex-col items-start justify-start overflow-scroll'
        )}
      >
        <Header />
        <div className='w-full flex-1 p-4 pl-20'>{children}</div>
      </div>
    </div>
  );
}
