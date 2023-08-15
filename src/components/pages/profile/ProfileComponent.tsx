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

  // console.log('user', user, new Date(user.shops_updated_at ?? '2023-01-01'));
  // check if it has been more than 30 days since the last update
  const more_than_30_days =
    Date.now() - new Date(user.shops_updated_at ?? '2023-01-01').getTime() >
    30 * 24 * 60 * 60 * 1000;
  const ShopsSelectDisabled =
    user.tariff === 'free' || user.tariff === 'business' || !more_than_30_days;

  return (
    <div className=''>
      {user.tariff === 'trial' && (
        <p className='absolute left-[380px] top-16 text-xs'>
          {i18n.language === 'uz'
            ? "1 kunlik sinov versiyasida do'konlarni tanlash imkoniyati mavjud emas"
            : 'Возможность выбора магазинов недоступна в пробной версии на 1 день'}
        </p>
      )}
      <Tabs
        tabs={[
          t('profile.payments'),
          t('profile.shops'),
          // t('profile.others'),
          // 'Asosiy kategoriyalar',
        ]}
        disbaledTabs={ShopsSelectDisabled ? [t('profile.shops')] : []}
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
