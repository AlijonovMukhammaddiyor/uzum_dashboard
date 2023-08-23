import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  children?: JSX.Element | JSX.Element[];
  loadText?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Container({
  children,
  loading,
  className,
  show = true,
  titleContainerStyle,
  title,
  loadText,
  explanation,
  ...rest
}: ContainerProps) {
  const [isVisible, setIsVisible] = useState(show);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);
  const { t } = useTranslation('common');

  return (
    <div
      className={clsxm(
        'relative rounded-lg border border-gray-300 shadow-sm transition-all duration-500',
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
              {t('container.explanation')}
            </button>
          )}
        </div>
      )}
      {loading && <Loading loadText={loadText} />}
      {children}
      {isSidebarOpen && explanation && (
        <aside className='absolute right-0 top-0 h-full w-64 overflow-y-scroll bg-white p-5 shadow-md'>
          <button
            onClick={toggleSidebar}
            className='absolute right-2 top-2 rounded-md bg-red-200 px-2 py-1 text-xs'
          >
            {t('container.close')}
          </button>
          <p className='mt-5 text-sm'>{explanation}</p>
        </aside>
      )}
    </div>
  );
}

export default Container;
