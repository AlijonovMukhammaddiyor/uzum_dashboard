import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import clsxm from '@/lib/clsxm';

import Button from '@/components/shared/buttons/Button';
import CustomInput from '@/components/shared/InputField';

import { SERVER_URL } from '@/constant/env';

export interface NewPasswordProps {
  activeTab: number;
  currentTab: number;
  onNext: () => void;
  user: {
    username: string;
    password: string;
    phone_number: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
      phone_number: string;
    }>
  >;
}

const NewPassword = ({
  activeTab,
  currentTab,
  user,
  onNext,
  setUser,
}: NewPasswordProps) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setNewPassword(event.target.value);
  };

  const onSubmit = async () => {
    if (!isPasswordValid)
      return alert("Parol kamida 8 ta belgidan iborat bo'lishi kerak!");
    setSendingRequest(true);
    try {
      const res = await axios.post(SERVER_URL + '/newpassword/', {
        ...user,
        phone_number: '+' + user.phone_number,
        password: newPassword,
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSendingRequest(false);
          setSuccess(null);
          onNext();
        }, 2000);
      } else setSendingRequest(false);
    } catch (err) {
      setSuccess(false);
      setSendingRequest(false);
    }
  };

  useEffect(() => {
    validatePassword(newPassword);
  }, [newPassword]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return setIsPasswordValid(false);
    }

    setIsPasswordValid(true);
  };

  return (
    <div
      className={clsxm(
        'absolute top-full mt-7 flex w-full max-w-[400px] flex-col gap-2 transition-all duration-500',
        activeTab === currentTab ? 'left-0 opacity-100' : 'left-full opacity-0'
      )}
    >
      <div className='w-full flex-col items-start justify-start gap-1'>
        <CustomInput
          label='Yangi Parol'
          containerStyle='rounded-md'
          inputStyle='w-full h-10 px-3 text-base placeholder-slate-300 rounded-md'
          placeholder='Yangi Parol kiriting (majburiy)'
          name='password'
          value={newPassword}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
          }}
          onChange={(e) => {
            handleInputChange(e);
            setSuccess(null);
            validatePassword(e.target.value);
          }}
          required
          type={passwordShow ? 'text' : 'password'}
          rightIcon={
            passwordShow ? (
              <AiOutlineEye
                className='cursor-pointer text-slate-500'
                onClick={() => setPasswordShow(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className='cursor-pointer text-slate-500'
                onClick={() => setPasswordShow(true)}
              />
            )
          }
        />
        <p className='text-xs text-slate-400'>
          Parolda kamida 8 ta belgidan iborat bo'lishi kerak
        </p>
      </div>

      <span className='my-5 h-px w-full bg-slate-300'></span>
      {success === true && (
        <div className='flex w-full items-center justify-center gap-2'>
          <p className='text-green-500'>
            Parol muvaffaqiyatli yangilandi! Sizni kirish sahifasiga
            yo'naltiryapmiz.
          </p>
        </div>
      )}
      {success === false && (
        <div className='flex w-full items-center justify-center gap-2'>
          <p className='text-red-500'>
            Parol yangilashda xatolik! Agar bu takrorlanaversa, iltimos biz
            bilan bog'laning.
          </p>
        </div>
      )}
      <Button
        className='bg-primary mt-6 w-full text-white hover:bg-purple-700'
        onClick={onSubmit}
        isLoading={sendingRequest}
        spinnerColor='white'
        disabled={!isPasswordValid || sendingRequest}
      >
        Parolni Yangilash
      </Button>
    </div>
  );
};

export default NewPassword;
