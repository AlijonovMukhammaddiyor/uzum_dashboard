import { useTranslation } from 'next-i18next';
import React from 'react';

export interface LoginFooterFooterComponentProps {
  onNext: () => void;
  username: string;
}

function LoginFooter({ onNext, username }: LoginFooterFooterComponentProps) {
  const { t } = useTranslation('login');

  return (
    <div className='mt-6 flex max-w-sm items-center justify-between'>
      <div className=''>
        <div className='flex items-center justify-start gap-1 text-sm text-slate-500'>
          {t('forgot.password')}{' '}
          <p
            className='text-primary cursor-pointer'
            onClick={() => {
              if (!username) return alert(t('nousername.validate.error'));
              onNext();
            }}
          >
            {t('forgot.password.link')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginFooter;
