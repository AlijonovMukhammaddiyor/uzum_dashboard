import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { SegmentationTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import RangeChart from '@/components/shared/RangeChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  categoryId: string;
}

interface SegmentationType {
  average_rating: number;
  avg_purchase_price: number;
  from: number;
  to: number;
  total_products: number;
  total_orders: number;
  total_shops: number;
}

function Segmentation({ className, categoryId }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [data, setData] = React.useState<SegmentationType[]>([]);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          data: SegmentationType[];
        }>
      >(`/category/analytics/segmentation/` + categoryId + '?range=40')
      .then((res) => {
        setData(res.data.data.sort((a, b) => a.from - b.from));
        // setLabels(res.data.labels);
        logger(res.data.data, 'segmentation');
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in segmentation');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsxm(
        'flex min-w-[1200px] flex-col gap-6 overflow-x-scroll',
        className
      )}
    >
      {/* <SubCategoriesPieChart /> */}
      {/* <DropDown
        values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
        activeTab={0}
        setActiveTab={() => {
          //sdc
        }}
        className='-mb-3'
      /> */}
      <Container
        loading={loading}
        className={clsxm(
          'h-[600px] w-full min-w-[1200px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <RangeChart
          data={data.map((item) => ({
            from: item.from,
            to: item.to,
            total_products: item.total_products,
            total_orders: item.total_orders,
          }))}
        />
      </Container>
      <Container loading={loading} className={clsxm('w-full overflow-scroll')}>
        <Table
          className='max-h-[800px] min-h-max'
          columnDefs={SegmentationTableColumnDefs}
          rowData={data}
          // fetchData={() => {}}
        />
      </Container>
    </div>
  );
}

export default Segmentation;
