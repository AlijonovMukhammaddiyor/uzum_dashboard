import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { LiaAngleDoubleUpSolid } from 'react-icons/lia';
import Select from 'react-select';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getSimilarProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import GroupedColumnChart from '@/components/shared/ColumnChart';
import LineChart from '@/components/shared/LineChart';
import SingleAxisAreaChart from '@/components/shared/SingleAxisAreaChart';
import Table from '@/components/shared/Table';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface AboutProductProps {
  product_id: string;
  className?: string;
  isActive?: boolean;
  user: UserType;
}

interface ProductType {
  date_pretty: string;
  average_purchase_price: number;
  position_in_category: number;
  position: number;
  orders_amount: number;
  product__category__title: string;
  product__category__title_ru: string;
  product__category__categoryId: number;
  product__created_at: string;
  product__product_id: number;
  product__shop__link: string;
  product__shop__title: number;
  product__title: string;
  product__title_ru: string;
  rating: number;
  reviews_amount: number;
  orders_money: number;
  available_amount: number;
  product__photos: string;
}

function AboutProduct({
  product_id,
  className,
  isActive,
  user,
}: AboutProductProps) {
  const { t: t2, i18n } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { state } = useContextState();
  const [products, setProducts] = React.useState<
    {
      product_id: number;
      analytics: ProductType[];
    }[]
  >([]);
  const [selectedRows, setSelectedRows] = React.useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const { t } = useTranslation('products');
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          data: {
            product_id: number;
            analytics: ProductType[];
          }[];
          category: string;
        }>
      >('/product/similar/' + product_id)
      .then((res) => {
        // setTopProducts(res.data.products);
        const data = res.data;
        setProducts(data.data);

        // get first 3 product_ids
        setSelectedRows(
          data.data.slice(0, 3).map((product) => ({
            value: product.product_id.toString(),
            label: product.analytics[0]?.product__title,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'Error in similar products');
        setLoading(false);
      });
  }, [product_id]);

  const options = React.useMemo(() => {
    return products.map((product) => ({
      value: product.product_id.toString(),
      label: product.analytics[0].product__title,
    }));
  }, [products]);

  const shouldRender = React.useMemo(() => {
    const target = products.find(
      (product) => product.product_id === Number(product_id)
    );
    if (!target) return false;

    return target?.analytics?.length > 1 ? true : false;
  }, [products, product_id]);

  const isProPlus = user.tariff === 'seller' || user.tariff === 'business';

  return (
    <div
      className={clsxm(
        'flex min-h-full w-full min-w-[1000px] flex-col items-start justify-start gap-5 overflow-scroll pb-16',
        className
      )}
    >
      {shouldRender && (
        <div className={clsxm('relative h-full w-full', !isProPlus && '')}>
          {!isProPlus && (
            <div className='absolute top-20 z-[20] flex w-full items-center justify-center'>
              <span className='w-full text-center'>
                {i18n.language === 'uz'
                  ? 'Ushbu tarifda mavjud emas'
                  : 'Этот тариф недоступен'}
              </span>
            </div>
          )}

          {!isProPlus && (
            <p className='absolute top-10 z-50 w-full text-center font-semibold'>
              {i18n.language === 'uz'
                ? 'Ushbu mahsulotni quyida berilgan jadvaldagi raqobatchi mahsulotlar bilan barcha jihatdan solishtiring (3 tagacha)'
                : 'Сравните этот товар по всем параметрам с конкурирующими товарами в таблице ниже (до 3)'}
            </p>
          )}
          {!isProPlus && (
            <div className='absolute inset-0 z-10 bg-white bg-opacity-30 backdrop-blur-md backdrop-filter'></div>
          )}
          <Container
            loading={loading}
            className={clsxm(
              'z-0 flex min-h-[400px] w-full flex-col items-start justify-start gap-5 overflow-hidden rounded-md bg-white p-3',
              open ? 'h-[2000px]' : 'h-[700px] overflow-hidden'
            )}
          >
            <p className='z-50 w-full text-center font-semibold'>
              {t('compare_with_3')}
            </p>

            <div className='mb-2 flex w-full justify-end'>
              <Select
                value={selectedRows}
                onChange={(selectedRows) => {
                  setSelectedRows(selectedRows as any);
                }}
                isMulti
                options={options}
                className='w-full max-w-full'
                isOptionDisabled={() => selectedRows.length >= 3}
                name='products'
              />
            </div>
            <>
              {isActive && products && products.length && (
                <GroupedColumnChart
                  data={prepareDailyChartData(
                    products,
                    selectedRows,
                    product_id
                  )}
                  style={{
                    width: '100%',
                    height: '400px',
                    maxHeight: '400px',
                    marginBottom: '40px',
                    minHeight: '400px',
                  }}
                  title={t('daily_sales')}
                  // yAxisTitle='Kunlik sotuvlar'
                  // xAxisTitle='Sana'
                />
              )}
              {!open && (
                <div
                  className='mb-16 flex w-full items-center justify-center bg-blue-100 py-2 transition-colors hover:bg-blue-200'
                  onClick={() => setOpen(true)}
                >
                  <button className='flex flex-col items-center justify-center gap-0 text-sm font-semibold text-blue-500'>
                    <p>{t('see_all')}</p>
                    <HiOutlineChevronDoubleDown className='text-base' />
                  </button>
                </div>
              )}

              {isActive && (
                <SingleAxisAreaChart
                  data={
                    prepareAllChartData(products, selectedRows, product_id) ??
                    []
                  }
                  style={{
                    width: '100%',
                    height: '400px',
                    maxHeight: '400px',
                    marginBottom: '40px',
                  }}
                  title={t('total_sales')}
                  className='h-[400px] max-h-[400px] w-full'
                />
              )}

              {isActive && (
                <SingleAxisAreaChart
                  data={
                    preparePricesChartData(
                      products,
                      selectedRows,
                      product_id
                    ) ?? []
                  }
                  style={{
                    width: '100%',
                    height: '400px',
                    maxHeight: '400px',
                    marginBottom: '40px',
                  }}
                  title={t('prices')}
                  className='h-[400px] max-h-[400px] w-full'
                />
              )}

              {isActive && (
                <LineChart
                  data={preparePositionChartData(
                    products,
                    selectedRows,
                    product_id
                  )}
                  style={{
                    width: '100%',
                    height: '400px',
                    maxHeight: '400px',
                  }}
                  isStep
                  yAxisTitle={t('position_in_category')}
                  xAxisTitle={t('date')}
                />
              )}

              {open && (
                <div className='flex w-full items-center justify-center bg-blue-100 py-2 transition-colors hover:bg-blue-200'>
                  <button
                    className='flex flex-col items-center justify-center gap-0 text-sm font-semibold text-blue-500'
                    onClick={() => setOpen(false)}
                  >
                    <LiaAngleDoubleUpSolid className='text-base' />
                    <p>{t('see_less')}</p>
                  </button>
                </div>
              )}
            </>
          </Container>
        </div>
      )}
      <Container
        loading={loading}
        className='h-full min-h-[800px] w-full border-none bg-transparent p-0'
      >
        <>
          {products.length > 0 && (
            <Table
              rowData={prepareTableData(products, product_id)}
              columnDefs={getSimilarProductsColDefs(t2, i18n.language) as any}
              className='h-[1200px]'
              withCheckbox
            />
          )}
        </>
      </Container>
    </div>
  );
}

function prepareDailyChartData(
  products: {
    product_id: number;
    analytics: ProductType[];
  }[],
  selectedRows: { value: string; label: string }[],
  product_id: string
) {
  const labels = new Set<string>();
  const selectedProductIDs = selectedRows.map((row) => Number(row.value));
  selectedProductIDs.push(Number(product_id));
  const dataset: {
    label: string;
    data: {
      x: Date;
      y: number;
    }[];
    backgroundColor: string;
  }[] = [];

  const colors = [
    'rgba(33, 150, 243, 0.5)', // Blue
    'rgba(76, 175, 80, 0.5)', // Green
    'rgba(255, 152, 0, 0.5)', // Orange
    'rgba(244, 67, 54, 0.5)', // Red
  ];

  let color_counter = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!selectedProductIDs.includes(product.product_id)) continue;

    const analytics = product.analytics;
    let prev = analytics[0].orders_amount;
    const chartData = [];
    for (let j = 0; j < analytics.length; j++) {
      const item = analytics[j];
      chartData.push({
        x: new Date(item.date_pretty),
        y: item.orders_amount - prev,
      });
      labels.add(item.date_pretty);
      prev = item.orders_amount;
    }
    dataset.push({
      label: analytics[0].product__title.split('((')[0],
      data: chartData,
      backgroundColor: colors[color_counter],
    });
    color_counter++;
  }

  console.log(dataset);

  return {
    // labels: Array.from(labels).sort((a, b) => {
    //   const dateA = new Date(a);
    //   const dateB = new Date(b);
    //   return dateA.getTime() - dateB.getTime();
    // }),
    datasets: dataset,
  };
}

function getLabels(
  products: {
    product_id: number;
    analytics: ProductType[];
  }[],
  selectedRows: { value: string; label: string }[],
  product_id: string
) {
  const labels = new Set<string>();
  const selectedProductIDs = selectedRows.map((row) => Number(row.value));
  selectedProductIDs.push(Number(product_id));

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!selectedProductIDs.includes(product.product_id)) continue;

    const analytics = product.analytics;
    for (let j = 0; j < analytics.length; j++) {
      const item = analytics[j];
      labels.add(item.date_pretty);
    }
  }

  return Array.from(labels).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });
}

function prepareAllChartData(
  products: {
    product_id: number;
    analytics: ProductType[];
  }[],
  selectedRows: { value: string; label: string }[],
  product_id: string
) {
  const selectedProductIDs = selectedRows.map((row) => Number(row.value));
  selectedProductIDs.push(Number(product_id));
  const dataset = [];
  const colors = [
    {
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
    {
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
    },
  ];

  let color_counter = 0;

  if (!products.length) return null;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const data = [];
    if (!selectedProductIDs.includes(product.product_id)) continue;

    const analytics = product.analytics.sort((a, b) => {
      return (
        new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
      );
    });
    for (let j = 0; j < analytics.length; j++) {
      const item = analytics[j];
      data.push({
        x: new Date(item.date_pretty),
        y: item.orders_amount,
      });
    }
    dataset.push({
      label: analytics[0].product__title,
      data: data,
      backgroundColor: colors[color_counter].backgroundColor,
      fill: true,
      borderColor: colors[color_counter].borderColor,
      pointRadius: 3,
      pointBackgroundColor: colors[color_counter].borderColor,
    });
    color_counter++;
  }

  return dataset;
}

function preparePricesChartData(
  products: {
    product_id: number;
    analytics: ProductType[];
  }[],
  selectedRows: { value: string; label: string }[],
  product_id: string
) {
  const selectedProductIDs = selectedRows.map((row) => Number(row.value));
  selectedProductIDs.push(Number(product_id));
  const dataset = [];
  const colors = [
    {
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
    {
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
    },
  ];

  let color_counter = 0;

  if (!products.length) return null;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const data = [];
    if (!selectedProductIDs.includes(product.product_id)) continue;

    const analytics = product.analytics.sort((a, b) => {
      return (
        new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
      );
    });
    for (let j = 0; j < analytics.length; j++) {
      const item = analytics[j];
      data.push({
        x: new Date(item.date_pretty),
        y: item.average_purchase_price,
      });
    }
    dataset.push({
      label: analytics[0].product__title,
      data: data,
      backgroundColor: colors[color_counter].backgroundColor,
      fill: true,
      borderColor: colors[color_counter].borderColor,
      pointRadius: 3,
      pointBackgroundColor: colors[color_counter].borderColor,
    });
    color_counter++;
  }

  return dataset;
}

function preparePositionChartData(
  products: {
    product_id: number;
    analytics: ProductType[];
  }[],
  selectedRows: { value: string; label: string }[],
  product_id: string
) {
  const selectedProductIDs = selectedRows.map((row) => Number(row.value));
  selectedProductIDs.push(Number(product_id));
  const dataset: {
    x: string;
    y: number;
    label: string;
  }[] = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!selectedProductIDs.includes(product.product_id)) continue;

    const analytics = product.analytics.sort((a, b) => {
      return (
        new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
      );
    });
    for (let j = 0; j < analytics.length; j++) {
      const item = analytics[j];
      dataset.push({
        x: item.date_pretty,
        y: item.position_in_category,
        label: item.product__title,
      });
    }
  }

  dataset.sort((a, b) => {
    return new Date(a.x).getTime() - new Date(b.x).getTime();
  });

  return dataset;
}

function prepareTableData(
  products: {
    product_id: number;
    analytics: ProductType[];
  }[],
  product_id: string
) {
  // get latest analytics for each product
  const data = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].product_id === Number(product_id)) continue;
    const product = products[i];
    const analytics = product.analytics;
    const latest = analytics[analytics.length - 1];
    data.push({
      product_id: product.product_id,
      title: latest.product__title + ' ((' + latest.product__product_id + '))',
      title_ru:
        latest.product__title_ru + ' ((' + latest.product__product_id + '))',
      category:
        latest.product__category__title +
        ' ((' +
        latest.product__category__categoryId +
        '))',
      category_ru:
        latest.product__category__title_ru +
        ' ((' +
        latest.product__category__categoryId +
        '))',
      position: latest.position,
      position_in_category: latest.position_in_category,
      orders_amount: latest.orders_amount,
      orders_money: latest.orders_money,
      reviews_amount: latest.reviews_amount,
      rating: latest.rating,
      average_purchase_price: latest.average_purchase_price,
      available_amount: latest.available_amount,
      shop:
        latest.product__shop__title + ' (' + latest.product__shop__link + ')',
      photos: latest.product__photos,
      created_at: latest.product__created_at
        ? latest.product__created_at.slice(0, 10)
        : '',
      date_pretty: latest.date_pretty,
    });
  }

  // // sort the data so that products with category equal to currentCategory are at the top
  // data.sort((a, b) => {
  //   if (a.category.split('(')[0].trim() === currentCategory) {
  //     return -1;
  //   } else if (b.category === currentCategory) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });

  return data;
}

export default AboutProduct;
