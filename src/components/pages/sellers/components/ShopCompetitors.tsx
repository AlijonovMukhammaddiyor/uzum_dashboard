import { AxiosResponse } from 'axios';
import React from 'react';
import { VscDebugBreakpointData } from 'react-icons/vsc';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import LineChart from '@/components/shared/LineChart';
import SingleAxisAreaChart from '@/components/shared/SingleAxisAreaChart';

interface Props {
  className?: string;
  sellerId: number;
  title: string;
  isActive?: boolean;
}

interface CompetitorsType {
  title: string;
  link: string;
  common_categories_count: number;
  common_categories_titles: string[];
  analytics: {
    average_order_price: number;
    average_purchase_price: number;
    category_count: number;
    date_pretty: string;
    position: number;
    rating: number;
    total_orders: number;
    total_products: number;
    total_reviews: number;
  }[];
}

function ShopCompetitors({ className, sellerId, title, isActive }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [competitors, setCompetitors] = React.useState<CompetitorsType[]>([]);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<{ data: CompetitorsType[] }>>(
        '/shop/competitors/' + sellerId + '?range=45'
      )
      .then((res) => {
        // setTopProducts(res.data.products);
        // logger(res.data, 'Competitors');

        setCompetitors(res.data.data);

        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting competitors');
        setLoading(false);
      });
  }, [sellerId]);

  return (
    <div
      className={clsxm(
        'flex h-full w-full min-w-[1400px] flex-col items-start justify-start gap-8 overflow-scroll',
        className
      )}
    >
      <Container
        loading={loading}
        className='flex w-full flex-col items-start justify-start gap-3 p-5'
      >
        <div className='flex w-full items-center justify-start gap-2'>
          <VscDebugBreakpointData className='text-primary text-2xl' />
          <p className='text-sm'>
            Raqobatchilarning <span className='font-semibold'>{title}</span>{' '}
            bilan umumiy kategoriyalari
          </p>
        </div>

        {competitors.length > 0 &&
          competitors
            .sort(
              (a, b) => b.common_categories_count - a.common_categories_count
            )
            .map((competitor) => {
              if (competitor.title !== title)
                return (
                  <CommonCategories
                    key={competitor.title}
                    link={competitor.link}
                    common_categories_titles={
                      competitor.common_categories_titles
                    }
                    title={competitor.title}
                  />
                );
            })}
      </Container>
      {/* <Table columnDefs={shopCompetitorsTableColumnDefs} data={[]} /> */}
      <Container
        className='flex h-[600px] w-full flex-col gap-6 rounded-md bg-slate-100 p-5'
        loading={loading}
      >
        {/* {competitors.length > 0 && ( */}
        <p className='text-primary w-full text-center'>
          Top 10 raqobatchilar kunlik buyurtmalari
        </p>
        <p className='-mt-5 text-center text-xs text-gray-400'>
          * Ma'lum bir sotuvchiga tegishli chiziqni ko'rsatish yoki yashirish
          uchun, quyidagi tegishli nomning ustiga bosing.
        </p>
        <LineChart
          data={prepareOrdersDataset(competitors)}
          yAxisTitle='Buyurtmalar soni'
          xAxisTitle='Sana'
          style={{
            height: '500px',
            maxHeight: '500px',
          }}
        />
      </Container>
      <Container
        className='flex h-[600px] w-full flex-col gap-6 rounded-md bg-slate-100 p-5'
        loading={loading}
      >
        {/* {competitors.length > 0 && ( */}
        <p className='text-primary w-full text-center'>
          Top 10 raqobatchilar pozitsiyalari
        </p>
        <p className='-mt-5 text-center text-xs text-gray-400'>
          * Ma'lum bir sotuvchiga tegishli chiziqni ko'rsatish yoki yashirish
          uchun, quyidagi tegishli nomning ustiga bosing.
        </p>
        <LineChart
          data={preparePositionsDataset(competitors)}
          style={{
            height: '500px',
            maxHeight: '500px',
          }}
          isStep
          xAxisTitle='Sana'
          yAxisTitle='Pozitsiya'
        />
        {/* )} */}
      </Container>
      <Container
        className='flex h-[600px] w-full flex-col gap-6 rounded-md bg-slate-100 p-5'
        loading={loading}
      >
        {/* {competitors.length > 0 && ( */}
        <p className='text-primary w-full text-center'>
          Top 10 raqobatchilar mahsulotlar soni
        </p>
        <p className='-mt-5 text-center text-xs text-gray-400'>
          * Ma'lum bir sotuvchiga tegishli chiziqni ko'rsatish yoki yashirish
          uchun, quyidagi tegishli nomning ustiga bosing.
        </p>
        <LineChart
          data={prepareProductsCountDataset(competitors)}
          style={{
            height: '500px',
            maxHeight: '500px',
          }}
          xAxisTitle='Sana'
          yAxisTitle='Pozitsiya'
        />
        {/* )} */}
      </Container>
      <Container
        className='flex h-[550px] w-full flex-col rounded-md bg-slate-100 p-5'
        loading={loading}
      >
        {/* {competitors.length > 0 && ( */}
        <p className='text-primary w-full text-center'>
          Top 10 raqobatchilar mahsulotlaring o'rtacha mahsulot sotuv narxi
        </p>
        <p className='text-center text-xs text-gray-400'>
          * Do'konning o'rtacha mahsulot narxini hisoblash uchun har bir
          mahsulot sotuv narxlarini qo'shib mahsulotlar soniga bo'lingan.
        </p>
        {isActive && (
          <SingleAxisAreaChart
            labels={prepareLabels(competitors)}
            data={preparePriceDataset(competitors)}
            tension={0}
            style={{
              height: '470px',
              maxHeight: '470px',
            }}
            className='h-[470px] max-h-[470px] w-full'
          />
        )}
        {/* )} */}
      </Container>
    </div>
  );
}

export default ShopCompetitors;

function CommonCategories({
  common_categories_titles,
  title,
  link,
}: {
  common_categories_titles: string[];
  title: string;
  link: string;
}) {
  return (
    <div className='flex h-10 w-full gap-2'>
      <a
        href={`/sellers/${link}`}
        className='font-primary w-[200px] text-sm font-semibold text-blue-400 hover:underline'
      >
        {title} ({common_categories_titles.length})
      </a>
      <div className='no-scrollbar flex h-full w-[calc(100%-200px)] items-center justify-start gap-2 overflow-scroll'>
        {common_categories_titles.map((title) => (
          <span
            key={title}
            className='min-w-max rounded-md bg-slate-400 px-3 py-2 text-xs text-black'
          >
            {title}
          </span>
        ))}
      </div>
    </div>
  );
}

function prepareProductsCountDataset(data: CompetitorsType[]) {
  if (data.length === 0) return [];

  const dataset = [];

  for (const competitor of data) {
    const analytics = sortAnalytics(competitor.analytics);

    for (const item of analytics) {
      dataset.push({
        x: item.date_pretty,
        y: item.total_products,
        label: competitor.title,
      });
    }
  }
  dataset.sort((a, b) => {
    const a_date = new Date(a.x);
    const b_date = new Date(b.x);
    return a_date.getTime() - b_date.getTime();
  });
  return dataset;
}

function prepareOrdersDataset(data: CompetitorsType[]) {
  if (data.length === 0) return [];
  const dataset = [];

  for (const competitor of data) {
    const analytics = sortAnalytics(competitor.analytics);

    let prev_orders = analytics[0].total_orders;

    for (let j = 1; j < analytics.length; j++) {
      dataset.push({
        x: analytics[j - 1].date_pretty,
        y: analytics[j].total_orders - prev_orders,
        label: competitor.title,
      });

      prev_orders = analytics[j].total_orders;
    }
  }
  dataset.sort((a, b) => {
    const a_date = new Date(a.x);
    const b_date = new Date(b.x);
    return a_date.getTime() - b_date.getTime();
  });

  return dataset;
}

function sortAnalytics(
  data: {
    average_order_price: number;
    average_purchase_price: number;
    category_count: number;
    date_pretty: string;
    position: number;
    rating: number;
    total_orders: number;
    total_products: number;
    total_reviews: number;
  }[]
) {
  // date_pretty is in the form of "2021-08-01". Sort from oldest to newest
  return data.sort((a, b) => {
    const a_date = new Date(a.date_pretty);
    const b_date = new Date(b.date_pretty);
    return a_date.getTime() - b_date.getTime();
  });
}

function prepareLabels(data: CompetitorsType[]): string[] {
  // get the analytcs array with largest length
  if (data.length === 0) return [];
  const max = Math.max(...data.map((item) => item.analytics.length));

  // get the analytics array with largest length
  const maxAnalytics = data.find((item) => item.analytics.length === max);
  const sortedMaxAnalytics = sortAnalytics(maxAnalytics?.analytics ?? []);

  // get the labels from the analytics array date_pretty
  return sortedMaxAnalytics.slice(1).map((item) => item.date_pretty);
}

function preparePositionsDataset(data: CompetitorsType[]) {
  if (data.length === 0) return [];
  const datasets = [];

  for (const competitor of data) {
    const analytics = sortAnalytics(competitor.analytics).slice(0);
    // datasets.push({
    //   label: competitor.title,
    //   data: analytics.slice(1).map((item) => {
    //     return {
    //       x: item.date_pretty,
    //       y: item.position,
    //     };
    //   }),
    //   fill: false,
    //   hidden: i % 2 === 0 ? false : true,
    //   backgroundColor: colors[i].background,
    //   borderColor: colors[i].border,
    // });
    // i++;
    for (let i = 0; i < analytics.length; i++) {
      datasets.push({
        x: analytics[i].date_pretty,
        y: analytics[i].position,
        label: competitor.title,
      });
    }
  }
  datasets.sort((a, b) => {
    const a_date = new Date(a.x);
    const b_date = new Date(b.x);
    return a_date.getTime() - b_date.getTime();
  });
  return datasets;
}

function preparePriceDataset(data: CompetitorsType[]) {
  if (data.length === 0) return [];
  const datasets = [];
  const colors = [
    { background: 'rgba(102, 187, 106, 0.2)', border: '#d62728' }, // light green
    { background: 'rgba(255, 241, 118, 0.2)', border: '#9467bd' }, // light yellow
    { background: 'rgba(129, 212, 250, 0.2)', border: '#8c564b' }, // light blue
    { background: 'rgba(159, 168, 218, 0.2)', border: '#e377c2' }, // light indigo
    { background: 'rgba(206, 147, 216, 0.2)', border: '#7f7f7f' }, // light purple
    { background: 'rgba(239, 154, 154, 0.2)', border: '#bcbd22' }, // light red
    { background: 'rgba(179, 157, 219, 0.2)', border: '#17becf' }, // light deep purple
    { background: 'rgba(240, 98, 146, 0.2)', border: '#aec7e8' }, // light pink
    { background: 'rgba(121, 134, 203, 0.2)', border: '#2ca02c' }, // light blue grey
    { background: 'rgba(128, 203, 196, 0.2)', border: '#1f77b4' }, // light cyan
    { background: 'rgba(165, 114, 167, 0.2)', border: '#ff7f0e' }, // light teal
  ];
  // color: [
  //     '#d62728',
  //     '#9467bd',
  //     '#8c564b',
  //     '#e377c2',
  //     '#7f7f7f',
  //     '#bcbd22',
  //     '#17becf',
  //     '#aec7e8',
  //     '#2ca02c',
  //     '#1f77b4',
  //     '#ff7f0e',
  //   ],
  let i = 0;

  for (const competitor of data) {
    const analytics = sortAnalytics(competitor.analytics);
    datasets.push({
      label: competitor.title,
      data: analytics.slice(1).map((item) => {
        return {
          y: Number(item.average_purchase_price.toFixed(0)),
          x: item.date_pretty,
        };
      }),
      fill: false,
      hidden: i % 2 === 0 ? false : true,

      backgroundColor: colors[i].background,
      borderColor: colors[i].border,
    });
    i++;
  }
  datasets.sort((a, b) => {
    const a_date = new Date(a.data[0].x);
    const b_date = new Date(b.data[0].x);
    return a_date.getTime() - b_date.getTime();
  });
  return datasets;
}
