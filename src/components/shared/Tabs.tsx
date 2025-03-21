import React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

export interface TabsProps {
  tabs: string[];
  messages?: string[];
  activeTab: string;
  setNotAllowedTab: React.Dispatch<React.SetStateAction<string>>;
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
  setNotAllowedTab,
  setActiveTab,
  className,
  disbaledTabs,
  premiumTabs,
  activeColor = 'bg-white text-primary',
}: TabsProps) {
  const { t } = useTranslation('tabs');

  return (
    <div
      className={clsxm(
        'no-scrollbar bg-primary relative w-max  rounded-sm  p-1',
        className
      )}
    >
      {/* <Toaster /> */}
      <ol className='no-scrollbar flex items-center justify-start gap-3'>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={clsxm(
              `tab relative flex min-w-[120px] cursor-pointer justify-center rounded-sm p-3 py-1 text-sm font-semibold text-slate-100`,
              activeTab === tab ? `active ${activeColor}` : '',
              activeTab !== tab && 'hover:bg-slate-400 hover:bg-opacity-25',
              disbaledTabs?.includes(tab) &&
                'cursor-not-allowed bg-slate-400 bg-opacity-25'
            )}
            onClick={() => {
              if (!disbaledTabs?.includes(tab)) {
                setActiveTab(tab);
              } else {
                setNotAllowedTab(tab);
                // RenderAlert({
                //   tab,
                //   index,
                //   message,
                //   alertTitle: t('tariffs.change_tariff'),
                //   buttonTitle: t('tariffs.tariffs'),
                //   alertSubtitle: t('tariffs.not_available'),
                //   buttonLink: '/profile',
                // });
              }
            }}
          >
            {premiumTabs?.includes(tab) && (
              <span className='font-primary absolute right-0 top-0 z-50 text-xs font-bold text-red-500'>
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
