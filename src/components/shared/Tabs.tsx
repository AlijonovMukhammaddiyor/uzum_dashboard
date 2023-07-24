import React from 'react';

import clsxm from '@/lib/clsxm';

export interface TabsProps {
  tabs: string[];
  activeTab: string;
  activeColor?: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  tabWidth?: string;
  disbaledTabs?: string[];
  premiumTabs?: string[];
}

function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  className,
  disbaledTabs,
  premiumTabs,
  activeColor = 'bg-white bg-opacity-[0.8]',
}: TabsProps) {
  return (
    <div
      className={clsxm(
        'no-scrollbar relative w-max rounded-lg  bg-gray-300  p-1',
        className
      )}
    >
      <ol className='no-scrollbar flex items-center justify-start gap-3'>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={clsxm(
              `tab relative flex min-w-[120px] cursor-pointer justify-center rounded-lg p-3 text-sm font-semibold`,
              activeTab === tab ? `active ${activeColor}` : '',
              activeTab !== tab && 'hover:bg-slate-400 hover:bg-opacity-25',
              disbaledTabs?.includes(tab) &&
                'cursor-not-allowed bg-slate-400 bg-opacity-25 opacity-50'
            )}
            onClick={() => {
              if (!disbaledTabs?.includes(tab)) {
                setActiveTab(tab);
              }
            }}
          >
            {premiumTabs?.includes(tab) && (
              <span className='absolute right-0 top-0 text-xs font-bold text-red-500'>
                🌟
              </span>
            )}
            {tab}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Tabs;
