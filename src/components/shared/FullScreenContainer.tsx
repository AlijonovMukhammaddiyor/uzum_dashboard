import React from 'react';
import { LuShrink } from 'react-icons/lu';

interface Props {
  setFullScreen?: React.Dispatch<React.SetStateAction<string | null>>;
}

function FullScreenContainer({ setFullScreen }: Props) {
  return (
    <div className='min-w-screen absolute h-full min-h-screen w-full bg-white'>
      <LuShrink
        className='text-primary absolute right-5 top-5 h-6 w-6'
        onClick={() => {
          if (!setFullScreen) return;
          setFullScreen(null);
        }}
      />
      {/* {children} */}
    </div>
  );
}

export default FullScreenContainer;
