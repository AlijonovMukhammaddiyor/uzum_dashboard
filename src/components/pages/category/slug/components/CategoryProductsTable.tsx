import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import { CategoryProductTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

export interface Props {
  activeTab?: string;
  categoryId: string;
  className?: string;
}

function CategoryProductsTable({ categoryId, className }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 200);
  }, []);

  if (!mounted) return null;

  const loadData = () => {
    const api = new API(null);
    setLoading(true);
    return api.get(`/category/products/` + categoryId + '/');
  };

  return (
    <Container
      loading={loading}
      className={clsxm('overflow-scroll', className)}
    >
      <Table
        columnDefs={CategoryProductTableColumnDefs}
        className='h-[1016px]'
        fetchData={loadData}
        setLoading={setLoading}
      />
    </Container>
  );
}

export default CategoryProductsTable;
