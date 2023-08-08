import React from 'react';
import { useTranslation } from 'react-i18next';

import LandingTarifs from '@/components/pages/landing/components/LandingTarifs';
import Tabs from '@/components/shared/Tabs';

import { UserType } from '@/types/user';
const ProfileComponent = ({ user }: { user: UserType }) => {
  const { t, i18n } = useTranslation('tabs');
  const [activeTab, setActiveTab] = React.useState<string>(t('home.overview'));
  console.log(t('home.overview'));
  console.log(activeTab);
  const isProPlus = user.is_proplus;

  React.useEffect(() => {
    setActiveTab(t('home.overview'));
  }, [i18n.language, t]);
  return (
    <div>
      <Tabs
        tabs={[
          t('home.overview'),
          t('home.new_products'),
          t('home.promising_products'),
          t('home.promising_categories'),
          // 'Asosiy kategoriyalar',
        ]}
        premiumTabs={[
          t('home.new_products'),
          t('home.promising_products'),
          t('home.promising_categories'),
        ]}
        disbaledTabs={
          isProPlus
            ? []
            : [
                t('home.promising_products'),
                t('home.promising_categories'),
                t('home.new_products'),
              ]
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='overflow-auto'
      />
      <LandingTarifs />
    </div>
  );
};

export default ProfileComponent;
