import React, { useState } from 'react';

function Switch() {
  const [value, setValue] = useState(1);
  return (
    <div className='App flex h-screen flex-col items-center justify-center bg-purple-100'>
      <h1 className='mb-4 text-2xl font-bold text-purple-700'>
        Choose your payment plan
      </h1>
      <div className='relative w-64'>
        <input
          type='range'
          min='1'
          max='3'
          step='2'
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className='slider h-2 w-full cursor-pointer appearance-none rounded-full bg-purple-400 outline-none'
        />
        <div className='absolute left-1/2 -mt-1 w-1/2 -translate-x-1/2 transform text-center'>
          <span className='text-purple-700'>
            {value === 1 ? '1 month' : '3 months (-15%)'}
          </span>
        </div>
      </div>
      <h2 className='mt-4 text-xl text-purple-700'>
        Total: ${value === 1 ? '10.00' : (10 * 3 * 0.85).toFixed(2)}
      </h2>
    </div>
  );
}

export default Switch;
