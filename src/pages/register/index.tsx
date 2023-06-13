import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {FaApple} from 'react-icons/fa'
import {GiStarShuriken} from 'react-icons/gi'

const Register = () => {
  return (
    <div className='flex min-h-screen'>
      <div className='flex-1 flex justify-center items-center '>
      <div className=' max-w-sm w-5/6 flex flex-col gap-6'>
      <div>
      <div className='flex items-center'><GiStarShuriken  className='text-xl md:text-2xl mr-2'/><h2 className='font-semibold'> Sign Up</h2></div>
        <p className='text-sm mt-2 text-gray-600'>Free forever. No credit card needed.</p>
      </div>
       <div className='flex flex-col gap-3'>
       <button className='py-2 flex justify-center items-center gap-2 border border-slate-300 rounded-md text-sm'><FcGoogle className='text-2xl'/> Sign up with Google </button>
        <button className='py-2 flex justify-center items-center gap-2 border border-slate-300 rounded-md text-sm'><FaApple className='text-2xl'/> Sign up with Apple</button>
       </div>
       <div className='flex items-center justify-between text-slate-300 text-sm'><span className='w-2/5 h-px bg-slate-300'></span>OR<span className='w-2/5 h-px bg-slate-300'></span></div>
        <form className='flex flex-col '> 
          <label className='text-sm' htmlFor="name">Your Name</label>
          <input className='rounded-md mb-4 mt-1 border border-slate-300 placeholder:text-sm' type="text" name="name" id="name" placeholder='Your Name' />
          <label className='text-sm' htmlFor="email">Your E-mail</label>
          <input className='rounded-md mb-4 mt-1 border border-slate-300 placeholder:text-sm' type="email"  name="email" id="email" placeholder='Your E-mail' />
          <label className='text-sm' htmlFor="password">Password</label>
          <input className='rounded-md mb-4 mt-1 border border-slate-300 placeholder:text-sm' type="password" name="password" id="password" placeholder='At least 8 characters' />
          <div className='text-sm my-2'><input type='checkbox' className='mr-2' /> I agree to all the <a className='text-primary' href='#'>Term, Privacy Policy</a> and <a className='text-primary' href='#'>Fees.</a></div>
          <button className=" bg-primary w-full rounded py-2 my-4 text-white hover:bg-purple-700">Ro'yxatdan o'tish </button>

          <p className='text-sm'>Have an account? <a className='text-primary' href="#">Log In</a></p>

        </form>
      </div>

      </div>

      <div className='hidden md:flex flex-1 bg-purple-500 bg-opacity-10'></div>
    </div>
  )
}

export default Register