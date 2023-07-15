import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Header from '@/components/sections/Header';
import Sidebar from '@/components/sections/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className='flex h-screen w-screen items-start justify-start overflow-hidden bg-slate-200'>
      <Sidebar
        className='h-screen'
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
        <div className='w-full flex-1 p-4'>{children}</div>
      </div>
    </div>
  );
}
