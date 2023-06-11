import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Header from '@/components/sections/Header';
import Sidebar from '@/components/sections/Sidebar';

export default function Layout({
  children,
  path,
}: {
  children: React.ReactNode;
  path: Record<string, string>;
}) {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className='flex h-screen w-screen items-start justify-start overflow-hidden bg-slate-200'>
      <Sidebar
        className=''
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
        <Header path={path} />
        <div className='w-full flex-1 p-4'>{children}</div>
      </div>
    </div>
  );
}
