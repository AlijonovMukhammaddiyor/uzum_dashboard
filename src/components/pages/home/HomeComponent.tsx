import React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import HomeStatisticsContainer from '@/components/pages/home/components/HomeStatisticsContainer';

import { UserType } from '@/types/user';

function HomeComponent({ user }: { user: UserType }) {
  const { t, i18n } = useTranslation('tabs');
  const [activeTab, setActiveTab] = React.useState<string>(t('home.overview'));

  React.useEffect(() => {
    setActiveTab(t('home.overview'));
  }, [i18n.language, t]);

  return (
    <div className='flex w-full min-w-[1400px] flex-col items-start justify-start gap-4 overflow-scroll pb-12'>
      <HomeStatisticsContainer
        user={user}
        className={clsxm(activeTab === t('home.overview') ? '' : 'hidden')}
      />

      {/* <MainCategories
        className={clsxm(
          activeTab === 'Asosiy kategoriyalar' ? '-mt-20' : 'hidden'
        )}
      /> */}
    </div>
  );
}

export default HomeComponent;
