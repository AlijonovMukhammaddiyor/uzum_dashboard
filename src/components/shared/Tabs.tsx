import React from 'react';

import clsxm from '@/lib/clsxm';

export interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  tabWidth?: string;
}

function Tabs({ tabs, activeTab, setActiveTab, className }: TabsProps) {
  return (
    <div
      className={clsxm(
        'relative h-8 w-full overflow-x-scroll border-b border-slate-300',
        className
      )}
    >
      <ol className='flex w-full items-center justify-start gap-3 overflow-x-scroll'>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={clsxm(
              `tab flex min-w-[120px] cursor-pointer justify-center rounded-md px-2 py-1 text-sm ${
                activeTab === tab ? 'active bg-primary bg-opacity-25' : ''
              }`,
              activeTab !== tab && 'hover:bg-slate-400 hover:bg-opacity-25'
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Tabs;
