import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import {
  ShopProductTableColumnDefs,
  ShopStoppedProductTableColumnDefs,
} from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PaginatedTable from '@/components/shared/PaginatedTable';
import PieChart from '@/components/shared/PieChart';
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
  position_in_category: number;
  position_in_shop: number;
  position: number;
  product_available_amount: number;
  product_characteristics: string;
  product_id: number;
  product_title: string;
  rating: number;
  reviews_amount: number;
  shop_link: string;
  shop_title: string;
  sku_analytics: string;
  categiry_title: string;
}

function ShopProducts({ sellerId, className }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeProducts, setActiveProducts] = React.useState<string>(
    'Sotuvchining hozirdagi mahsulotlari'
  );
  const [productsData, setProductsData] = React.useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [reviewsData, setReviewsData] = React.useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [stoppedProductsData, setStoppedProductsData] = React.useState<
    ProductType[]
  >([]);
  const [stoopedProductsLoading, setStoppedProductsLoading] =
    React.useState<boolean>(false);

  const [loadingTopProducts, setLoadingTopProducts] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingTopProducts(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          orders_products: ProductType[];
          reviews_products: ProductType[];
          total_orders: number;
          total_reviews: number;
        }>
      >('/shop/products/tops/' + sellerId)
      .then((res) => {
        // setTopProducts(res.data.products);

        const products = res.data.orders_products;
        let sum = 0;
        const data = products
          .filter((product) => product.orders_amount > 0)
          .map((product) => {
            sum += product.orders_amount;
            return {
              type: product.product_title + ' (' + product.product_id + ')',
              value: product.orders_amount,
            };
          });
        if (res.data.total_orders - sum > 0)
          data.push({
            type: 'Boshqa Mahsulotlar',
            value: res.data.total_orders - sum,
          });

        setProductsData(data);

        const reviews = res.data.reviews_products;
        let sumReviews = 0;
        const dataReviews = reviews.map((product) => {
          sumReviews += product.reviews_amount;
          return {
            type: product.product_title + ' (' + product.product_id + ')',
            value: product.reviews_amount,
          };
        });
        if (res.data.total_reviews - sumReviews > 0)
          dataReviews.push({
            type: 'Boshqa Mahsulotlar',
            value: res.data.total_reviews - sumReviews,
          });

        setReviewsData(dataReviews);
        // setTotalOrders(res.data.total_orders);
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
  }, [sellerId]);

  const loadData = (
    page: number,
    sortModel: {
      colId: string;
      sort: string;
    } | null
  ) => {
    const api = new API(null);
    setLoading(true);
    let url = `/shop/products/` + sellerId + `?page=${page}`;
    if (sortModel) {
      url += `&column=${sortModel.colId}&order=${sortModel.sort}`;
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
      className={clsxm(
        'flex w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll',
        className
      )}
    >
      <div className='flex w-full items-start justify-start gap-5 overflow-x-scroll'>
        <Container
          loading={loadingTopProducts}
          className={clsxm(
            'h-[600px] min-w-[1100px] overflow-scroll rounded-md bg-slate-100 p-6'
          )}
        >
          <PieChart
            data={productsData}
            title="Eng ko'p sotilgan mahsulotlar (20 tagacha)"
            labelType='outer'
            style={{
              width: '100%',
              height: '550px',
              maxHeight: '550px',
            }}
          />
        </Container>
        <Container
          loading={loadingTopProducts}
          className={clsxm(
            'h-[600px] min-w-[1100px] overflow-scroll rounded-md bg-slate-100 p-6'
          )}
        >
          <PieChart
            data={reviewsData}
            title="Eng ko'p izoh yoizlgan mahsulotlar (20 tagacha)"
            labelType='outer'
            style={{
              width: '100%',
              height: '550px',
              maxHeight: '550px',
            }}
          />
        </Container>
      </div>

      <Container loading={loading} className={clsxm('w-full overflow-scroll')}>
        <Tabs
          tabs={[
            'Sotuvchining hozirdagi mahsulotlari',
            'Sotuvchining sotuvdan chiqqan mahsulotlari',
          ]}
          activeTab={activeProducts}
          setActiveTab={setActiveProducts}
          className='my-4'
        />

        <PaginatedTable
          columnDefs={ShopProductTableColumnDefs}
          className={clsxm(
            'h-[1016px] min-w-full',
            activeProducts === 'Sotuvchining hozirdagi mahsulotlari'
              ? ''
              : 'hidden'
          )}
          fetchData={loadData}
          setLoading={setLoading}
          id={sellerId}
        />
        <Table
          columnDefs={ShopStoppedProductTableColumnDefs}
          className={clsxm(
            'h-[1016px] min-w-full',
            activeProducts === 'Sotuvchining sotuvdan chiqqan mahsulotlari'
              ? ''
              : 'hidden'
          )}
          rowData={stoppedProductsData}
        />
      </Container>
    </div>
  );
}

export default ShopProducts;
