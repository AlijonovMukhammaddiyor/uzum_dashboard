import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import LineChart from '@/components/shared/LineChart';

interface AboutProductProps {
  product_id: string;
  className?: string;
  isActive?: boolean;
}

interface ProductAnalyticsType {
  adult: boolean;
  bonus_product: boolean;
  skus_count: number;

  recent_analytics: {
    date_pretty: string;
    position_in_category: number;
    available_amount: number;
    position_in_shop: number;
    position: number;
    orders_amount: number;
    rating: number;
    reviews_amount: number;
    orders_money: number;
    average_purchase_price: number;
  }[];
  skus: {
    vat_rate: number;
    charity_profit: number;
    vat_amount: number;
    vat_price: number;
    payment_per_month: number;
    sku: number;
    recent_analytics: {
      date_pretty: string;
      available_amount: number;
      created_at: string;
      purchase_price: number;
      full_price: number;
    }[];
  }[];
  description: string;
  product_id: number;
  title: string;
  created_at: string;
}

function ProductPosition({
  product_id,
  className,
  isActive,
}: AboutProductProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<ProductAnalyticsType | null>(
    null
  );
  const { t, i18n } = useTranslation('products');

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<ProductAnalyticsType>>(
        '/product/analytics/' + product_id + '/'
      )
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting competitors');
        setLoading(false);
      });
  }, [product_id]);

  return (
    <div
      className={clsxm(
        'flex h-full w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll pb-5',
        className
      )}
    >
      {product ? (
        <PositionCard
          i18n={i18n}
          latestPositionUzum={
            product.recent_analytics[product.recent_analytics.length - 1]
              .position
          }
          LatestPositionCategory={
            product.recent_analytics[product.recent_analytics.length - 1]
              .position_in_category
          }
          LatestPositionShop={
            product.recent_analytics[product.recent_analytics.length - 1]
              .position_in_shop
          }
        />
      ) : (
        <></>
      )}
      {product ? (
        product.recent_analytics.length > 1 ? (
          <Container
            className='flex w-full flex-col items-start justify-start gap-5 rounded-md bg-white p-4'
            loading={loading}
          >
            <>
              {product && product.recent_analytics && isActive && (
                <>
                  <div className='mt-8 flex w-full items-center justify-start'>
                    <p className='w-full text-center text-xl '>
                      {t('product_in_uzum')}
                    </p>
                    <p></p>
                  </div>
                  <LineChart
                    data={
                      product.recent_analytics.map((item) => ({
                        x: item.date_pretty,
                        y: item.position,
                        label: t('position'),
                      })) || []
                    }
                    isStep
                    yAxisTitle={t('position')}
                    xAxisTitle=''
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '300px',
                      minHeight: '300px',
                    }}
                  />
                </>
              )}
            </>

            <>
              {product && isActive && (
                <>
                  <div className='mt-8 flex w-full items-center justify-start'>
                    <p className='w-full text-center text-xl'>
                      {t('product_in_category')}
                    </p>
                    <p></p>
                  </div>

                  <LineChart
                    data={
                      product.recent_analytics.map((item) => ({
                        x: item.date_pretty,
                        y: item.position_in_category,
                        label: t('position'),
                      })) || []
                    }
                    isStep
                    yAxisTitle={t('position')}
                    xAxisTitle=''
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '300px',
                      minHeight: '300px',
                    }}
                  />
                </>
              )}
            </>

            <>
              {product && isActive && (
                <>
                  <div className='mt-8 flex w-full items-center justify-start'>
                    <p className='w-full text-center text-xl'>
                      {t('product_in_shop')}
                    </p>
                    <p></p>
                  </div>
                  <LineChart
                    data={
                      product.recent_analytics.map((item) => ({
                        x: item.date_pretty,
                        y: item.position_in_shop,
                        label: t('position'),
                      })) || []
                    }
                    isStep
                    yAxisTitle={t('position')}
                    xAxisTitle=''
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '300px',
                      minHeight: '300px',
                    }}
                  />
                </>
              )}
            </>
          </Container>
        ) : (
          <div className=''>
            <p>
              {i18n.language === 'uz'
                ? 'Yangi mahsulot: ushbu mahsulot atiga 1 kun oldin sotuvga chiqqan.'
                : 'Новый продукт: Этот продукт был выпущен всего 1 день назад.'}
            </p>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductPosition;

const PositionCard = ({
  latestPositionUzum,
  LatestPositionCategory,
  LatestPositionShop,
  i18n,
}: {
  latestPositionUzum: number;
  LatestPositionCategory: number;
  LatestPositionShop: number;
  i18n: any;
}) => {
  return (
    <div className='flex w-full items-center justify-start gap-4 '>
      <div className='flex w-full  items-center justify-between gap-2 rounded-md bg-white p-5 shadow-md'>
        <p className='text-lg font-semibold'>
          {i18n.language === 'uz'
            ? 'Uzumdagi pozitsiyasi:'
            : 'Позиция на Uzum:'}
        </p>
        <p className='text-primary text-lg font-semibold'>
          {latestPositionUzum ? latestPositionUzum : '-'}
        </p>
      </div>
      <div className='flex w-full  items-center justify-between gap-2 rounded-md bg-white p-5 shadow-md'>
        <p className='text-lg font-semibold'>
          {i18n.language === 'uz'
            ? 'Kategoriyadagi pozitsiyasi:'
            : 'Позиция в категории:'}
        </p>
        <p className='text-primary text-lg font-semibold'>
          {LatestPositionCategory ? LatestPositionCategory : '-'}
        </p>
      </div>
      <div className='flex w-full items-center  justify-between gap-2 rounded-md bg-white p-5 shadow-md'>
        <p className='text-lg font-semibold'>
          {i18n.language === 'uz'
            ? "Do'kondagi pozitsiyasi:"
            : 'Позиция в магазине:'}
        </p>
        <p className='text-primary text-lg font-semibold'>
          {LatestPositionShop ? LatestPositionShop : '-'}
        </p>
      </div>
    </div>
  );
};
