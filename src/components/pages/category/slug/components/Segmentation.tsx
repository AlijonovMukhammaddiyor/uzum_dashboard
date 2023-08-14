import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getSegmentationTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import RangeChart from '@/components/pages/category/slug/components/RangeChart';
import Button from '@/components/shared/buttons/Button';
import InputField from '@/components/shared/InputField';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  categoryId: string;
  isActive: boolean;
}

interface SegmentationType {
  average_rating: number;
  avg_purchase_price: number;
  from: number;
  to: number;
  total_products: number;
  total_revenue: number;
  total_orders: number;
  total_shops: number;
}

function Segmentation({ className, categoryId, isActive }: Props) {
  const { t, i18n } = useTranslation('categories');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [segmentationCount, setSegmentationCount] = React.useState<number>(15);
  const [data, setData] = React.useState<SegmentationType[]>([]);
  const [newFetch, setNewFetch] = React.useState<boolean>(false);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    const count = segmentationCount === 0 ? 15 : segmentationCount;
    api
      .get<
        unknown,
        AxiosResponse<{
          data: SegmentationType[];
        }>
      >(
        `/category/analytics/segmentation/` +
          categoryId +
          '?range=40' +
          '&segments_count=' +
          count
      )
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
  }, [newFetch, categoryId]);

  if (!isActive) {
    return <></>;
  }

  return (
    <div
      className={clsxm(
        'flex min-w-[1200px] flex-col gap-6 overflow-x-scroll',
        className
      )}
    >
      <Container
        loading={loading}
        className={clsxm(
          'relative h-[500px] w-full min-w-[1200px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <div className='mb-2 flex items-center justify-between'>
          <div className=''>
            <h4 className='m-0 font-bold'>
              {t('procucts_segmentation_by_price_in_category')}
            </h4>
            <p className='m-0 text-sm text-slate-500'>
              {t('data_info_price_range')}
            </p>
          </div>
          <div className='flex items-center justify-end'>
            <InputField
              placeholder='Segmentatsiya soni'
              containerStyle='gap-2 flex justify-start items-center flex-row h-10'
              label={t('segmentations_amount')}
              type='number'
              min={1}
              max={100}
              value={segmentationCount}
              disabled={loading}
              inputStyle='w-[100px] h-full mb-1 rounded-l-md px-4 py-2 bg-gray-300'
              onChange={(e) => {
                if (e.target.valueAsNumber > 100) {
                  setSegmentationCount(100);
                  return;
                }
                if (e.target.valueAsNumber < 1) {
                  setSegmentationCount(1);
                  return;
                }
                setSegmentationCount(+e.target.valueAsNumber);
              }}
            />
            <Button
              className='bg-primary h-10 rounded-r-md px-2 py-2 text-white'
              title='Yangilash'
              onClick={() => {
                setNewFetch(!newFetch);
              }}
            >
              <>{t('update')}</>
            </Button>
          </div>
        </div>

        {/* {isActive && ( */}
        <RangeChart
          data={data}
          style={{
            width: '100%',
            height: 'calc(100% - 60px)',
            maxHeight: 'calc(100% - 60px)',
          }}
        />
        {/* )} */}
      </Container>
      <Container
        loading={loading}
        className={clsxm('w-full overflow-scroll border-none')}
      >
        <Table
          className='max-h-[800px] min-h-max'
          columnDefs={getSegmentationTableColumnDefs(t2, i18n.language) as any}
          rowData={data}
          // fetchData={() => {}}
        />
      </Container>
    </div>
  );
}

export default Segmentation;
