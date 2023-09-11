import { AxiosResponse } from 'axios';
import { ChartType } from 'chart.js';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VscDebugBreakpointData } from 'react-icons/vsc';
import Select from 'react-select';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import SingleAxisAreaChart from '@/components/shared/SingleAxisAreaChart';

interface Props {
  className?: string;
  sellerId: number;
  title: string;
  isActive?: boolean;
}

interface CompetitorsType {
  title: string;
  shop_id: number;
  link: string;
  common_categories_count: number;
  common_categories_ids: string[];
  common_categories_titles: string[];
  common_categories_titles_ru: string[];
}

interface CompetitorDataType {
  date_pretty: string;

  total_revenue: number;
  total_orders: number;
  total_products: number;
  average_purchase_price: number;
  total_reviews: number;
}

function ShopCompetitors({ className, sellerId, title, isActive }: Props) {
  const { t, i18n } = useTranslation('sellers');

  const [loading, setLoading] = React.useState<boolean>(false);
  const [competitors, setCompetitors] = React.useState<CompetitorsType[]>([]);
  const [competitor, setCompetitor] = React.useState<CompetitorsType | null>(
    null
  );
  const [competitorData, setCompetitorData] = React.useState<
    CompetitorDataType[]
  >([]);
  const [categoryId, setCategoryId] = React.useState<string>('1');
  const [shop, setShop] = React.useState<CompetitorsType | null>(null);
  const [shopData, setShopData] = React.useState<CompetitorDataType[]>([]);
  const [category, setCategory] = React.useState<string>(
    i18n.language === 'uz' ? 'Barcha' : 'Все'
  );
  const [type, setType] = React.useState<string>(t('revenue'));

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{ data: CompetitorsType[]; shop: CompetitorDataType[] }>
      >('/shop/competitors/' + sellerId + '?range=45')
      .then((res) => {
        const data_ = res.data.data.filter((item) => item.title !== title);

        setCompetitors(data_);
        setShop(res.data.data.find((item) => item.title === title) ?? null);
        setCompetitor(data_[0]);
        setShopData(res.data.shop);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting competitors');
        setLoading(false);
      });
  }, [sellerId, title]);
  React.useEffect(() => {
    if (shop && competitor && category) {
      const api = new API(null);
      setLoading(true);
      api
        .get<unknown, AxiosResponse<CompetitorDataType[]>>(
          `/shop/category/${competitor.shop_id}/${Number(categoryId.trim())}/`
        )
        .then((res) => {
          setCompetitorData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          logger(err, 'Error in getting competitors');
          setLoading(false);
        });
      api
        .get<unknown, AxiosResponse<CompetitorDataType[]>>(
          `/shop/category/${shop.shop_id}/${Number(categoryId.trim())}/`
        )
        .then((res) => {
          // setCompetitorData(res.data);
          setShopData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          logger(err, 'Error in getting competitors');
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competitor, categoryId, shop]);

  if (!isActive) return <></>;

  return (
    <div
      className={clsxm(
        'flex min-h-max w-full min-w-[1400px] flex-col items-start justify-start gap-8 pb-16',
        className
      )}
    >
      <Container
        loading={loading}
        className='flex w-full shrink-0 flex-col items-start justify-start gap-3 bg-white p-5'
      >
        <div className='flex w-full items-center justify-start gap-2'>
          <VscDebugBreakpointData className='text-primary text-2xl' />
          <p className='text-sm'>
            {t('info_1')} <span className='font-semibold'>{title}</span>{' '}
            {t('info_2')}
          </p>
        </div>
        <>
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
                        i18n.language === 'uz'
                          ? competitor.common_categories_titles
                          : competitor.common_categories_titles_ru
                      }
                      title={competitor.title}
                    />
                  );
              })}
        </>
      </Container>

      <div className='flex shrink-0 items-center justify-start gap-6'>
        <div className='flex items-center justify-start gap-3'>
          <p className='text-sm text-blue-500'>{t('select_competitor_here')}</p>
          {competitor && (
            <Select
              className='basic-single w-[300px] cursor-pointer rounded-md border border-blue-500'
              classNamePrefix='select'
              defaultValue={{
                value: competitor?.title,
                label: competitor?.title,
              }}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              onChange={(e) => {
                setCategoryId('1');
                setCategory(i18n.language === 'uz' ? 'Barcha' : 'Все');
                setCompetitor(
                  competitors.find((item) => item.title === e?.value) ?? null
                );
              }}
              styles={{
                dropdownIndicator: (provided) => ({
                  ...provided,
                  svg: {
                    fill: 'white',
                  },
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(119, 67, 219, 1)',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white', // This changes the text color of the selected value
                }),
                option: (provided) => ({
                  ...provided,
                  color: 'black', // This changes the text color of the options
                }),
              }}
              name='color'
              options={[
                ...competitors.map((item) => ({
                  value: item.title,
                  label: item.title,
                })),
              ]}
            />
          )}
        </div>
        <div className='flex shrink-0 items-center justify-start gap-3'>
          <p className='text-sm text-blue-500'>{t('select_category_here')}</p>
          <Select
            className='basic-single w-[300px] cursor-pointer rounded-md border border-blue-500'
            classNamePrefix='select'
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            value={{ value: category, label: category }}
            isRtl={false}
            isSearchable={false}
            onChange={(e) => {
              if (e?.value === 'Barcha' || e?.value === 'Все') {
                setCategory(e?.value ?? '');
              } else setCategory(e?.value ?? '');

              if (e?.value === (i18n.language === 'uz' ? 'Barcha' : 'Все'))
                setCategoryId('1');
              else {
                const titles =
                  i18n.language === 'uz'
                    ? competitor?.common_categories_titles
                    : competitor?.common_categories_titles_ru;
                const index = titles?.findIndex((item) => item === e?.value);
                if (index !== undefined) {
                  setCategoryId(
                    competitor?.common_categories_ids[index] ?? '1'
                  );
                }
              }
            }}
            styles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                svg: {
                  fill: 'white',
                },
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: 'rgba(119, 67, 219, 1)',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'white', // This changes the text color of the selected value
              }),
              option: (provided) => ({
                ...provided,
                color: 'black', // This changes the text color of the options
              }),
            }}
            name='color'
            options={[
              {
                value: i18n.language === 'uz' ? 'Barcha' : 'Все',
                label: i18n.language === 'uz' ? 'Barcha' : 'Все',
              },
              ...getCommonCategoryOptions(competitor!, i18n.language),
            ]}
          />
        </div>
        <div className='flex items-center justify-start gap-3'>
          <p className='text-sm text-blue-500'>{t('select_info_type_here')}</p>
          <Select
            className='basic-single w-[300px] cursor-pointer rounded-md border border-blue-500'
            classNamePrefix='select'
            defaultValue={{ value: t('revenue'), label: t('revenue') }}
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={false}
            onChange={(e) => {
              setType(e?.value ?? t('revenue'));
            }}
            styles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                svg: {
                  fill: 'white',
                },
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: 'rgba(119, 67, 219, 1)',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'white', // This changes the text color of the selected value
              }),
              option: (provided) => ({
                ...provided,
                color: 'black', // This changes the text color of the options
              }),
            }}
            name='color'
            options={[
              { value: t('revenue'), label: t('revenue') },
              { value: t('orders_amount'), label: t('orders_amount') },
              { value: t('products_amount'), label: t('products_amount') },
              {
                value: t('avarage_selling_price'),
                label: t('avarage_selling_price'),
              },
              { value: t('reviews_amount'), label: t('reviews_amount') },
            ]}
          />
        </div>
      </div>

      {competitorData.length > 0 && shopData.length > 0 && (
        <Container
          loading={loading}
          className='flex h-[500px] w-full shrink-0 flex-col items-start justify-start gap-3 bg-white p-5'
        >
          {isActive && (
            <SingleAxisAreaChart
              data={
                prepareAllData(
                  competitorData,
                  shopData,
                  type,
                  competitor!,
                  shop!,
                  t
                ) as any
              }
              title={
                type === t('avarage_selling_price')
                  ? type
                  : `${
                      i18n.language === 'uz' ? 'Jami' : 'Всего'
                    } ${type.toLowerCase()}`
              }
              className='h-full w-full'
              style={{
                width: '100%',
                maxWidth: '100%',
                minWidth: '100%',
                height: '450px',
                maxHeight: '450px',
              }}
              // labels={shopData.map((item) => new Date(item.date_pretty))}
            />
          )}
        </Container>
      )}
      {competitorData.length > 0 &&
        shopData.length > 0 &&
        type !== 'O`rtacha sotuv narxi' &&
        type != 'Средняя цена продажи' && (
          <Container
            loading={loading}
            className='flex h-[500px] w-full shrink-0 flex-col items-start justify-start gap-3 bg-white p-5'
          >
            {isActive && (
              <SingleAxisAreaChart
                data={
                  prepareDailyData(
                    competitorData,
                    shopData,
                    type,
                    competitor!,
                    shop!,
                    t
                  ) as any
                }
                title={
                  type === 'O`rtacha sotuv narxi' ||
                  type === 'Средняя цена продажи'
                    ? type
                    : type === t('products_amount')
                    ? i18n.language === 'uz'
                      ? "Kunlik mahsulotlar soni o'zgarishi"
                      : 'Изменение количества товаров в день'
                    : ` ${
                        i18n.language === 'uz' ? 'Kunlik' : 'Ежедневный'
                      } ${type.toLowerCase()}`
                }
                className='h-full w-full'
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  minWidth: '100%',
                  height: '450px',
                  maxHeight: '450px',
                }}
              />
            )}
          </Container>
        )}
    </div>
  );
}

export default ShopCompetitors;

function getCommonCategoryOptions(competitor: CompetitorsType, lang: string) {
  return competitor?.common_categories_titles.map((item, index) => ({
    value: lang === 'uz' ? item : competitor.common_categories_titles_ru[index],
    label: lang === 'uz' ? item : competitor.common_categories_titles_ru[index],
  }));
}

function prepareAllData(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  type: string,
  competitor: CompetitorsType,
  shop: CompetitorsType,
  t: any
) {
  if (type === t('orders_amount')) {
    return _prepareAllOrders(data, shopData, competitor, shop);
  } else if (type === t('revenue')) {
    return _prepareAllRevenue(data, shopData, competitor, shop);
  } else if (type === t('products_amount')) {
    return _prepareAllProducts(data, shopData, competitor, shop);
  } else if (type === t('reviews_amount')) {
    return _prepareAllReviews(data, shopData, competitor, shop);
  }
  return _prepareAveragePrice(data, shopData, competitor, shop);
}

function prepareDailyData(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  type: string,
  competitor: CompetitorsType,
  shop: CompetitorsType,
  t: any
) {
  if (type === t('orders_amount')) {
    return _prepareDailyOrders(data, shopData, competitor, shop);
  } else if (type === t('revenue')) {
    return _prepareDailyRevenue(data, shopData, competitor, shop);
  } else if (type === t('products_amount')) {
    return _prepareDailyProducts(data, shopData, competitor, shop);
  } else if (type === t('reviews_amount')) {
    return _prepareDailyReviews(data, shopData, competitor, shop);
  }
}

function _prepareAllOrders(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  const allOrdersCompetitor = data.map((item) => ({
    y: item.total_orders,
    x: new Date(item.date_pretty),
  }));
  const allOrdersShop = shopData.map((item) => ({
    y: item.total_orders,
    x: new Date(item.date_pretty),
  }));

  return [
    {
      data: allOrdersCompetitor.sort(
        (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
      ),
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#FF5733',
      backgroundColor: 'rgba(229, 88, 7, 0.2)',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: allOrdersShop.sort(
        (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
      ),
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#F3AA60',
      backgroundColor: 'rgba(255, 164, 27, 0.2)',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

function _prepareDailyOrders(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  let prev = data[0].total_orders;
  const dailyOrdersCompetitor = data.slice(1).map((item) => {
    const res = {
      y: item.total_orders - prev,
      x: new Date(item.date_pretty),
    };
    prev = item.total_orders;
    return res;
  });

  prev = shopData[0].total_orders;
  const dailyOrdersShop = shopData.slice(1).map((item) => {
    const res = {
      y: item.total_orders - prev,
      x: new Date(item.date_pretty),
    };
    prev = item.total_orders;
    return res;
  });

  return [
    {
      data: dailyOrdersCompetitor,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      borderRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: dailyOrdersShop,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      borderRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

function _prepareAllRevenue(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  const allOrdersCompetitor = data.map((item) => ({
    y: Math.round((item.total_revenue * 1000) / 1000) * 1000,
    x: new Date(item.date_pretty),
  }));
  const allOrdersShop = shopData.map((item) => ({
    y: Math.round((item.total_revenue * 1000) / 1000) * 1000,
    x: new Date(item.date_pretty),
  }));

  return [
    {
      data: allOrdersCompetitor.sort(
        (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
      ),
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: allOrdersShop.sort(
        (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
      ),
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

function _prepareDailyRevenue(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  let prev = data[0]?.total_revenue;
  const dailyOrdersCompetitor = data.slice(1).map((item) => {
    const res = {
      y: Math.round((item?.total_revenue - prev) * 1000),
      x: new Date(item.date_pretty),
    };
    prev = item?.total_revenue;
    return res;
  });

  prev = shopData[0]?.total_revenue;
  const dailyOrdersShop = shopData.slice(1).map((item) => {
    const res = {
      y: Math.round((item?.total_revenue - prev) * 1000),
      x: new Date(item.date_pretty),
    };
    prev = item?.total_revenue;
    return res;
  });

  return [
    {
      data: dailyOrdersCompetitor,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: dailyOrdersShop,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

function _prepareAllProducts(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  const allOrdersCompetitor = data.map((item) => ({
    y: item.total_products,
    x: new Date(item.date_pretty),
  }));
  const allOrdersShop = shopData.map((item) => ({
    y: item.total_products,
    x: new Date(item.date_pretty),
  }));

  return [
    {
      data: allOrdersCompetitor,
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: allOrdersShop,
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

function _prepareDailyProducts(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  let prev = data[0].total_products;
  const dailyOrdersCompetitor = data.slice(1).map((item) => {
    const res = {
      y: item.total_products - prev,
      x: new Date(item.date_pretty),
    };
    prev = item.total_products;
    return res;
  });

  prev = shopData[0].total_products;
  const dailyOrdersShop = shopData.slice(1).map((item) => {
    const res = {
      y: item.total_products - prev,
      x: new Date(item.date_pretty),
    };
    prev = item.total_products;
    return res;
  });

  return [
    {
      data: dailyOrdersCompetitor,
      type: 'bar' as ChartType,
      fill: false,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: dailyOrdersShop,
      type: 'bar' as ChartType,
      fill: false,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

function _prepareAveragePrice(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  const allOrdersCompetitor = data.map((item) => ({
    y: Math.round(item.average_purchase_price),
    x: new Date(item.date_pretty),
  }));
  const allOrdersShop = shopData.map((item) => ({
    y: Math.round(item.average_purchase_price),
    x: new Date(item.date_pretty),
  }));

  return [
    {
      data: allOrdersCompetitor.sort(
        (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
      ),
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: allOrdersShop.sort(
        (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
      ),
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

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

function _prepareAllReviews(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  const allOrdersCompetitor = data.map((item) => ({
    y: item.total_reviews,
    x: new Date(item.date_pretty),
  }));
  const allOrdersShop = shopData.map((item) => ({
    y: item.total_reviews,
    x: new Date(item.date_pretty),
  }));

  console.log(allOrdersCompetitor, allOrdersShop);

  return [
    {
      data: allOrdersCompetitor.sort(
        (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
      ),
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: allOrdersShop.sort(
        (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
      ),
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

function _prepareDailyReviews(
  data: CompetitorDataType[],
  shopData: CompetitorDataType[],
  competitor: CompetitorsType,
  shop: CompetitorsType
) {
  let prev = data[0].total_reviews;
  const dailyOrdersCompetitor = data.slice(1).map((item) => {
    const res = {
      y: item.total_reviews - prev,
      x: new Date(item.date_pretty),
    };
    prev = item.total_reviews;
    return res;
  });

  prev = shopData[0].total_reviews;
  const dailyOrdersShop = shopData.slice(1).map((item) => {
    const res = {
      y: item.total_reviews - prev,
      x: new Date(item.date_pretty),
    };
    prev = item.total_reviews;
    return res;
  });

  return [
    {
      data: dailyOrdersCompetitor,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: competitor.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
    {
      data: dailyOrdersShop,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label: shop.title,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}
