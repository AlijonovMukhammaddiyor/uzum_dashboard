import React from 'react';

import clsxm from '@/lib/clsxm';

import Loading from '@/components/Loading';

// props is everything div accepts
type ContainerProps = {
  loading?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function Container({ children, loading, className, ...rest }: ContainerProps) {
  return (
    <div className={clsxm('relative', className)} {...rest}>
      {children}
      {loading && <Loading />}
    </div>
  );
}

export default Container;
