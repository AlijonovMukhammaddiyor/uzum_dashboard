import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { CategoryProductTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PaginatedTable from '@/components/shared/PaginatedTable';
import PieChart from '@/components/shared/PieChart';

export interface Props {
  activeTab?: string;
  categoryId: string;
  className?: string;
}

interface ProductType {
  badges: string;
  date_pretty: string;
  orders_amount: number;
  position_in_category: number;
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

function CategoryProductsTable({ categoryId, className }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [topProductsData, setTopProductsData] = React.useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [loadingTopProducts, setLoadingTopProducts] =
    React.useState<boolean>(false);
  const [totalOrders, setTotalOrders] = React.useState<number>(0);
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const [childrenCount, setChildrenCount] = React.useState<number>(0);

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 200);

    const api = new API(null);
    setLoadingTopProducts(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          products: {
            product_id: number;
            product_title: string;
            orders_amount: number;
          }[];
          total_orders: number;
          total_products: number;
          descendants: number;
        }>
      >('/category/products/top/' + categoryId)
      .then((res) => {
        // setTopProducts(res.data.products);
        const products = res.data.products;
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
        if (res.data.total_products > 10)
          data.push({
            type: 'Boshqa Mahsulotlar',
            value: res.data.total_orders - sum,
          });

        setTopProductsData(data);
        setTotalProducts(res.data.total_products);
        setChildrenCount(res.data.descendants);
        setTotalOrders(res.data.total_orders);

        // setTotalOrders(res.data.total_orders);
        setLoadingTopProducts(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting top products');
        setLoadingTopProducts(false);
      });
  }, [categoryId]);

  if (!mounted) return null;

  const loadData = (
    page: number,
    sortModel: {
      colId: string;
      sort: string;
    } | null
  ) => {
    const api = new API(null);
    setLoading(true);
    let url = `/category/products/` + categoryId + `?page=${page}`;
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
        'flex h-full w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll',
        className
      )}
    >
      <Container
        className={clsxm(
          'h-[500px] w-full min-w-[1200px] overflow-hidden rounded-md bg-white p-6'
        )}
        loading={loadingTopProducts}
      >
        <div className='flex items-center justify-start gap-3'>
          <h2 className='text-primary flex-1 text-left text-base'>
            Eng Ko'p sotilgan mahsulotlarning ulushlari
          </h2>
          <div className='flex items-center justify-between gap-4'>
            <p className='font-semibold'>Mahsulotlar Soni:</p>
            <p className='text-primary font-semibold'>
              {totalProducts.toLocaleString()}
            </p>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <p className='font-semibold'>Buyurtmalar Soni:</p>
            <p className='text-primary font-semibold'>
              {totalOrders.toLocaleString()}
            </p>
          </div>
          {childrenCount > 0 && (
            <div className='flex items-center justify-between gap-4'>
              <p className='font-semibold'>Ichki Kategoriyalar Soni:</p>
              <p className='text-primary font-semibold'>
                {childrenCount.toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <div className='flex h-[calc(100%-24px)] w-full flex-1 items-start justify-start'>
          <PieChart data={topProductsData} labelType='spider' />
        </div>
      </Container>
      <Container loading={loading} className={clsxm('w-full overflow-scroll')}>
        <PaginatedTable
          columnDefs={CategoryProductTableColumnDefs}
          className='h-[1016px] min-w-full'
          fetchData={loadData}
          setLoading={setLoading}
          categoryId={categoryId}
        />
      </Container>
    </div>
  );
}

export default CategoryProductsTable;
