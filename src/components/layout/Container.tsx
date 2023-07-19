import React, { useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';

import Loading from '@/components/Loading';

type ContainerProps = {
  loading?: boolean;
  customStyle?: React.CSSProperties;
  titleContainerStyle?: React.CSSProperties;
  show?: boolean;
  animation?: 'fade' | 'slide';
  title?: string;
  explanation?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Container({
  children,
  loading,
  className,
  show = true,
  titleContainerStyle,
  title,
  explanation,
  ...rest
}: ContainerProps) {
  const [isVisible, setIsVisible] = useState(show);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  return (
    <div
      className={clsxm(
        'relative overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-500',
        className
      )}
      {...rest}
    >
      {title && (
        <div
          className='flex items-center justify-between bg-purple-100 px-5 py-3 text-purple-700'
          style={titleContainerStyle}
        >
          <h4 className='text-base'>{title}</h4>
          {explanation && (
            <button
              onClick={toggleSidebar}
              className='rounded-md bg-orange-200 px-2 py-1 text-xs text-purple-600'
            >
              Qo'llanmani {isSidebarOpen ? 'yashirish' : "ko'rsatish"}
            </button>
          )}
        </div>
      )}
      {loading && <Loading />}
      {children}
      {isSidebarOpen && explanation && (
        <aside className='absolute right-0 top-0 h-full w-64 overflow-y-scroll bg-white p-5 shadow-md'>
          <button
            onClick={toggleSidebar}
            className='absolute right-2 top-2 rounded-md bg-red-200 px-2 py-1 text-xs'
          >
            Yopish
          </button>
          <p className='mt-5 text-sm'>{explanation}</p>
        </aside>
      )}
    </div>
  );
}

export default Container;
