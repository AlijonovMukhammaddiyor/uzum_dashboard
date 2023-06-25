import React from 'react';

export interface LoginFooterFooterComponentProps {
  onNext: () => void;
  username: string;
}

function LoginFooter({ onNext, username }: LoginFooterFooterComponentProps) {
  return (
    <div className='mt-6 flex max-w-sm items-center justify-between'>
      <div className=''>
        <div className='flex items-center justify-start gap-1 text-sm text-slate-500'>
          Parolingizni unutdingizmi?{' '}
          <p
            className='text-primary cursor-pointer'
            onClick={() => {
              if (!username)
                return alert('Iltimos, foydalanuvchi nomini kiriting');
              onNext();
            }}
          >
            Yangi parol olish
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginFooter;
