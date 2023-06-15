import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const router = useRouter();
  // plan will later be used to determine which plan the user is registering for
  const { plan } = router.query;

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 items-center justify-center '>
        <div className=' flex w-5/6 max-w-sm flex-col gap-6'>
          <div>
            <div className='flex items-center'>
              {/* <GiStarShuriken className='mr-2 text-xl md:text-2xl' /> */}
              <h2 className='font-semibold'>Ro`yxatdan o`ting</h2>
            </div>
            <p className='mt-2 text-sm text-gray-600'>
              Barcha xizmatimizdan 3 kun bepul foydalaning
            </p>
          </div>
          <div className='flex flex-col gap-3'>
            <button className='flex items-center justify-center gap-2 rounded-md border border-slate-300 py-2 text-sm'>
              <FcGoogle className='text-2xl' /> Google bilan ro`yxatdan o'ting{' '}
            </button>
          </div>
          <div className='flex items-center justify-between text-sm text-slate-300'>
            <span className='h-px w-2/5 bg-slate-300'></span>YOKI
            <span className='h-px w-2/5 bg-slate-300'></span>
          </div>
          <form className='flex flex-col '>
            <InputFlield
              type='text'
              name='name'
              label='Ism'
              placeholder='Ism'
            />
            <InputFlield
              type='text'
              name='Telefon raqam'
              label='Telefon raqam'
              placeholder='Telefon raqam'
            />

            <InputFlield
              type='password'
              name='password'
              label='Password'
              placeholder='Password'
            />
            <div className='my-2 text-xs sm:text-sm'>
              <input type='checkbox' className='mr-2' /> I agree to all the{' '}
              <a className='text-primary' href='#'>
                Term, Privacy Policy
              </a>{' '}
              and{' '}
              <a className='text-primary' href='#'>
                Fees.
              </a>
            </div>
            <button className=' bg-primary my-4 w-full rounded py-2 text-white hover:bg-purple-700'>
              Ro'yxatdan o'tish{' '}
            </button>

            <p className='text-xs sm:text-sm'>
              Have an account?{' '}
              <a className='text-primary' href='#'>
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className='hidden flex-1 bg-purple-500 bg-opacity-10 md:flex'></div>
    </div>
  );
};

export default Register;

const InputFlield = ({
  type,
  name,
  label,
  placeholder,
}: {
  type: string;
  name: string;
  label?: string;
  placeholder: string;
}) => {
  return (
    <>
      {label && (
        <label className='text-sm' htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className='mb-4 mt-1 rounded-md border border-slate-300 placeholder:text-sm'
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
    </>
  );
};
