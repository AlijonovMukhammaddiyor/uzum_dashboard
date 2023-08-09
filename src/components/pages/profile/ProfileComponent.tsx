import React from 'react';
import { useTranslation } from 'react-i18next';

import Tarifs from '@/components/pages/profile/components/Tarifs';
import Tabs from '@/components/shared/Tabs';

import { UserType } from '@/types/user';
const ProfileComponent = ({ user }: { user: UserType }) => {
  const { t, i18n } = useTranslation('tabs');
  const [activeTab, setActiveTab] = React.useState<string>(t('profile.plans'));
  console.log(activeTab);
  const isProPlus = user.is_proplus;

  React.useEffect(() => {
    setActiveTab(t('profile.plans'));
  }, [i18n.language, t]);
  return (
    <div>
      <Tabs
        tabs={[
          t('profile.plans'),
          t('profile.payments'),
          t('profile.others'),
          // 'Asosiy kategoriyalar',
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='overflow-auto'
      />
      <Tarifs />
    </div>
  );
};

export default ProfileComponent;
