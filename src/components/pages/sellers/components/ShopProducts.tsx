import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import {
  getCategoryProductTableForProductsColumnDefs,
  getShopStoppedProductTableColumnDefs,
} from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import DoughnutEcharts from '@/components/shared/DoughnutEcharts';
import InfiniteTable from '@/components/shared/InfiniteTable';
import Table from '@/components/shared/Table';
import Tabs from '@/components/shared/Tabs';

export interface Props {
  activeTab?: string;
  sellerId: number;
  className?: string;
}

interface ProductType {
  badges: string;
  date_pretty: string;
  orders_amount: number;
  orders_money: number;
  position_in_category: number;
  position_in_shop: number;
  position: number;
  product_available_amount: number;
  product_characteristics: string;
  product_id: number;
  product_title: string;
  product_title_ru: string;
  rating: number;
  reviews_amount: number;
  shop_link: string;
  shop_title: string;
  sku_analytics: string;
  categiry_title: string;
  monthly_orders: number;
  monthly_revenue: number;
}

function ShopProducts({ sellerId, className }: Props) {
  const { t, i18n } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeProducts, setActiveProducts] = React.useState<string>(
    t('sellers_current_products')
  );
  const [ordersData, setOrdersData] = React.useState<
    {
      name: string;
      value: number;
    }[]
  >([]);
  const [revenueData, setRevenueData] = React.useState<
    {
      name: string;
      value: number;
    }[]
  >([]);
  const [notAllowedTab, setNotAllowedTab] = React.useState<string>('');
  const [stoppedProductsData, setStoppedProductsData] = React.useState<
    ProductType[]
  >([]);
  const [stoopedProductsLoading, setStoppedProductsLoading] =
    React.useState<boolean>(false);

  const [loadingTopProducts, setLoadingTopProducts] =
    React.useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.8); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingTopProducts(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          orders_products: ProductType[];
          reviews_products: ProductType[];
          revenue_products: ProductType[];
          total_orders: number;
          total_reviews: number;
          total_revenue: number;
        }>
      >('/shop/products/tops/' + sellerId)
      .then((res) => {
        // setTopProducts(res.data.products);

        const products = res.data.orders_products;
        let sum = 0;
        const data = products
          .filter((product) => product.monthly_orders > 0)
          .map((product) => {
            sum += product.monthly_orders;
            return {
              name:
                i18n.language === 'uz'
                  ? product.product_title.split('((')[0]
                  : product.product_title_ru.split('((')[0],
              value: product.monthly_orders,
            };
          });
        if (res.data.total_orders - sum > 0)
          data.push({
            name: i18n.language === 'uz' ? 'Boshqa Mahsulotlar' : 'Другие',
            value: res.data.total_orders - sum,
          });

        setOrdersData(data);

        const revenue = res.data.revenue_products;
        sum = 0;
        const data2 = revenue
          .filter((product) => product.monthly_revenue > 0)
          .map((product) => {
            sum += product.monthly_revenue;
            return {
              name:
                i18n.language === 'uz'
                  ? product.product_title.split('((')[0]
                  : product.product_title_ru.split('((')[0],
              value: product.monthly_revenue,
            };
          });
        if (res.data.total_revenue - sum > 0)
          data2.push({
            name: i18n.language === 'uz' ? 'Boshqa Mahsulotlar' : 'Другие',
            value: res.data.total_revenue - sum,
          });

        setRevenueData(data2);

        setLoadingTopProducts(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting top products');
        setLoadingTopProducts(false);
      });

    setStoppedProductsLoading(true);
    api
      .get<unknown, AxiosResponse<ProductType[]>>(
        '/shop/products/stopped/' + sellerId + '/'
      )
      .then((res) => {
        setStoppedProductsLoading(false);
        setStoppedProductsData(res.data);
      })
      .catch((err) => {
        setStoppedProductsLoading(false);
        logger(err, 'Error in getting stopped products');
      });
  }, [i18n.language, sellerId]);
  React.useEffect(() => {
    setActiveProducts(t('sellers_current_products'));
  }, [t, i18n.language]);

  const loadData = (
    start: number,
    end: number,
    sortModel: {
      colId: string;
      sort: string;
    } | null,
    filterModel: {
      [key: string]: {
        filterType: string;
        type: string;
        filter: string;
      };
    } | null
  ) => {
    const api = new API(null);
    setLoading(true);
    let url =
      `/shop/products/` + sellerId + `?offset=${start}&limit=${end - start}`;
    if (sortModel) {
      url += `&column=${sortModel.colId}&order=${sortModel.sort}`;
    }

    if (filterModel) {
      const columns = Object.keys(filterModel);
      const filters = Object.values(filterModel);

      url += `&searches=${columns.join(',')}&filters=${filters
        .map((filter) => filter.filter)
        .join('---')}`;
    }

    return api.get<
      unknown,
      AxiosResponse<{
        results: ProductType[];
        count: number;
        next?: string;
        previous?: string;
      }>
    >(url);
  };

  return (
    <div
      className={clsxm('h-full w-full min-w-[1200px] gap-5 pb-12', className)}
    >
      <div className='flex w-full items-start justify-start gap-5'>
        <Container
          loading={loadingTopProducts}
          className={clsxm(
            'min-h-[500px] w-1/2 rounded-md border-none bg-white p-6 shadow-none'
          )}
        >
          <p className='w-full text-center font-bold text-slate-600'>
            {t('most_profitable_products')}
            {i18n.language === 'uz' ? '(30 kunlik)' : '(за 30 дней)'}
          </p>
          <DoughnutEcharts
            data={revenueData}
            style={{
              width: '100%',
              height: zoomLevel === 0.8 ? '400px' : '500px',
              maxHeight: zoomLevel === 0.8 ? '400px' : '500px',
            }}
          />
        </Container>
        <Container
          loading={loadingTopProducts}
          className={clsxm(
            'min-h-[500px]  w-1/2 rounded-md border-none bg-white p-6 shadow-none'
          )}
        >
          <p className='w-full text-center font-bold text-slate-600'>
            {t('most_sold_products')}
            {i18n.language === 'uz' ? '(30 kunlik)' : '(за 30 дней)'}
          </p>
          <DoughnutEcharts
            data={ordersData}
            style={{
              width: '100%',
              height: zoomLevel === 0.8 ? '400px' : '500px',
              maxHeight: zoomLevel === 0.8 ? '400px' : '500px',
            }}
          />
        </Container>
      </div>

      <Container
        loading={loading}
        className={clsxm('w-full overflow-scroll border-none px-0')}
      >
        <p className='mt-6 text-center font-semibold'>
          {i18n.language === 'uz'
            ? "Do'konning sotuvdagi va sotuvi to'xtagan mahsulotlari"
            : 'Проданные и остановленные товары магазина'}
        </p>
        <Tabs
          tabs={[t('sellers_current_products'), t('sellers_stopped_products')]}
          activeTab={activeProducts}
          setActiveTab={setActiveProducts}
          className='my-4'
          setNotAllowedTab={setNotAllowedTab}
        />

        <InfiniteTable
          rowHeight={70}
          headerHeight={60}
          columnDefs={
            getCategoryProductTableForProductsColumnDefs(
              t2,
              i18n.language
            ) as any
          }
          className={clsxm(
            'h-[1536px] min-w-full',
            activeProducts === t('sellers_current_products') ? '' : 'hidden'
          )}
          fetchData={loadData}
          setLoading={setLoading}
          id={sellerId}
        />
        <Table
          rowHeight={80}
          headerHeight={60}
          columnDefs={getShopStoppedProductTableColumnDefs(t2, i18n.language)}
          className={clsxm(
            'h-[1016px] min-w-full',
            activeProducts === t('sellers_stopped_products') ? '' : 'hidden'
          )}
          rowData={stoppedProductsData}
        />
      </Container>
    </div>
  );
}

export default ShopProducts;
