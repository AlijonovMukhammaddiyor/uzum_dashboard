import React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import Pricing from '@/components/pages/profile/components/Pricing';
import ShopsSelect from '@/components/pages/profile/components/ShopsSelect';
import Tabs from '@/components/shared/Tabs';

import { UserType } from '@/types/user';

const ProfileComponent = ({ user }: { user: UserType }) => {
  const { t, i18n } = useTranslation('tabs');
  const [activeTab, setActiveTab] = React.useState<string>(
    t('profile.payments')
  );

  React.useEffect(() => {
    setActiveTab(t('profile.payments'));
  }, [i18n.language, t]);

  return (
    <div>
      <Tabs
        tabs={[
          t('profile.payments'),
          t('profile.shops'),
          // t('profile.others'),
          // 'Asosiy kategoriyalar',
        ]}
        disbaledTabs={
          !user.is_pro ? (!user.is_proplus ? [t('profile.shops')] : []) : []
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='overflow-auto'
      />
      <Pricing
        className={clsxm(activeTab === t('profile.payments') ? '' : 'hidden')}
      />
      <ShopsSelect
        user={user}
        className={clsxm(activeTab === t('profile.shops') ? '' : 'hidden')}
      />
    </div>
  );
};

export default ProfileComponent;
