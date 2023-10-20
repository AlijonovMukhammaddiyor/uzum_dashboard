import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import SearchContainer from '@/components/shared/SearchContainer';
import TreeMapEcharts from '@/components/shared/TreeMapEcharts';

import { UserType } from '@/types/user';

export interface HomeStatisticsContainerProps {
  className?: string;
  user: UserType;
}

type RawNode = {
  analytics: number;
  title: string;
  title_ru: string;
  children: RawNode[];
};

interface TreeType {
  orders: {
    data: RawNode;
    min_max: {
      min: number;
      max: number;
    };
  };
  products: {
    data: RawNode;
    min_max: {
      min: number;
      max: number;
    };
  };
  shops: {
    data: RawNode;
    min_max: {
      min: number;
      max: number;
    };
  };
  reviews: any;
  revenue: any;
}

function HomeStatisticsContainer({
  className,
  user,
}: HomeStatisticsContainerProps) {
  const [tree, setTree] = React.useState<TreeType | null>();
  const [monthlyTree, setMonthlyTree] = React.useState<TreeType | null>();
  const [weeklyTree, setWeeklyTree] = React.useState<TreeType | null>();

  const { t, i18n } = useTranslation('common');

  const [loading, setLoading] = React.useState<{
    orders?: boolean;
    products?: boolean;
    revenue?: boolean;
    reviews?: boolean;
    shops?: boolean;
    segments?: boolean;
    topShops?: boolean;
    topProducts?: boolean;
    monthlySegments?: boolean;
    weeklySegments?: boolean;
  }>({
    orders: true,
    products: true,
    revenue: true,
    reviews: true,
    shops: true,
    segments: true,
    topShops: true,
    topProducts: true,
    monthlySegments: true,
    weeklySegments: true,
  });
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);

  const [activeTab, setActiveTab] = useState(
    i18n.language === 'ru' ? 'Заказы' : 'Buyurtmalar'
  );
  const [activeDateRange, setActiveDateRange] = useState(
    i18n.language === 'ru' ? '7 дней' : '7 kun'
  );
  const [data, setData] = React.useState<TreeType | null>();
  const [depth, setDepth] = React.useState(1);

  const [zoomLevel, setZoomLevel] = React.useState(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.75); // 90% zoom for windows less than 600px wide
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

    setLoading({
      segments: true,
      monthlySegments: true,
      weeklySegments: true,
    });

    api
      .get<unknown, AxiosResponse<any>>('/category/segmentation/monthly/')
      .then((res) => {
        // logger(res.data, 'Segmentation');
        setMonthlyTree(res.data);
        setLoading((prev) => ({ ...prev, monthlySegments: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in monthlySegments');
        setLoading((prev) => ({ ...prev, monthlySegments: false }));
      });

    api
      .get<unknown, AxiosResponse<any>>('/category/segmentation/weekly/')
      .then((res) => {
        // logger(res.data, 'Segmentation');
        setWeeklyTree(res.data);
        setData(res.data);
        setLoading((prev) => ({ ...prev, weeklySegments: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in weeklySegments');
        setLoading((prev) => ({ ...prev, weeklySegments: false }));
      });

    api
      .get<unknown, AxiosResponse<any>>('/category/segmentation/')
      .then((res) => {
        // logger(res.data, 'Segmentation');
        setTree(res.data);

        setLoading((prev) => ({ ...prev, segments: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading((prev) => ({ ...prev, segments: false }));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <div
      className={clsxm('relative flex h-full w-full flex-col gap-4', className)}
      style={
        {
          // zoom: zoomLevel,
        }
      }
      id='homestat'
    >
      <SearchContainer
        open={isSearchOpen}
        closeModal={() => setIsSearchOpen(false)}
      />
      <div
        className='flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-slate-700 bg-white pl-3 pr-[3px] shadow-md'
        onClick={() => setIsSearchOpen(true)}
      >
        {/* <div className='gold-gradient threeD-effect -mt-1 flex h-9 items-center justify-center rounded-md px-3 text-[#333]'>
            {i18n.language === 'uz' ? 'Qidirish' : 'Поиск'}
          </div> */}
        <input
          type='text'
          placeholder={
            i18n.language === 'uz'
              ? 'Xohlagan narsani qidiring...'
              : 'ищите все, что хотите...'
          }
          className='min-w-[200px] rounded-sm border-none text-sm placeholder:text-slate-500 focus:outline-none focus:ring-0'
        />
        {/* <button className='bg-primary flex items-center justify-center rounded-md px-2 py-1 text-white'>
                {i18n.language === 'uz' ? 'Tez Qidirish' : 'Быстрый Поиск'}
              </button> */}
      </div>
      <div
        className='mb-4 flex items-center justify-between'
        style={{
          zoom: zoomLevel,
        }}
      >
        {/* Tabs on the top-left */}
        <div className='flex gap-0'>
          {[
            i18n.language === 'ru' ? 'Выручка' : 'Tushum',
            i18n.language === 'ru' ? 'Заказы' : 'Buyurtmalar',
            i18n.language === 'ru' ? 'Продукты' : 'Mahsulotlar',
            i18n.language === 'ru' ? 'Магазины' : "Do'konlar",
          ].map((tab) => (
            <button
              className={clsxm(
                'border border-gray-300 px-4 py-1 transition-colors',
                activeTab === tab ? 'bg-primary text-white' : 'bg-white'
              )}
              key={tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date range options on the top-right */}
        <div className='flex gap-0'>
          {[
            i18n.language === 'ru' ? '7 дней' : '7 kun',
            i18n.language === 'ru' ? '30 дней' : '30 kun',
            i18n.language === 'ru' ? 'Все' : 'Hammasi',
          ].map((dateRange) => (
            <button
              disabled={
                loading.segments ||
                loading.monthlySegments ||
                loading.weeklySegments
              }
              key={dateRange}
              className={clsxm(
                'border border-gray-300 px-4 py-1 transition-colors',
                activeDateRange === dateRange
                  ? 'bg-primary text-white'
                  : 'bg-white'
              )}
              onClick={() => {
                setActiveDateRange(dateRange);
                if (dateRange === '7 дней' || dateRange === '7 kun') {
                  setData(weeklyTree);
                } else if (dateRange === '30 дней' || dateRange === '30 kun') {
                  setData(monthlyTree);
                } else {
                  setData(tree);
                }
              }}
            >
              {dateRange}
            </button>
          ))}
        </div>
        <div className='right-0 top-0 mb-3 flex items-center gap-0'>
          <p className='mr-4 font-bold text-gray-500'>
            {i18n.language === 'uz' ? 'Chuqurlik darajasi:' : 'Глубина:'}
          </p>
          {[1, 2, 3, 4, 5, 6].map((dd) => (
            <button
              key={dd}
              className={clsxm(
                'cursor-pointer border border-gray-300 px-4 py-1 transition-colors',
                depth === dd ? 'bg-primary text-white' : 'bg-white'
              )}
              onClick={() => {
                setDepth(dd);
              }}
            >
              {dd}
            </button>
          ))}
        </div>
      </div>
      {(activeDateRange === '30 дней' ||
        activeDateRange === '30 kun' ||
        activeDateRange === '7 дней' ||
        activeDateRange === '7 kun') &&
        (activeTab === 'Mahsulotlar' ||
          activeTab === 'Продукты' ||
          activeTab === "Do'konlar" ||
          activeTab === 'Магазины') && (
          <div className='text-sm font-bold text-gray-500'>
            {activeTab === 'Mahsulotlar' || activeTab === 'Продукты'
              ? i18n.language === 'uz'
                ? "Quyida kategoriyalarga yangi qo'shilgan mahsulotlar soni keltirilgan"
                : 'Ниже показано количество новых товаров в каждой категории'
              : i18n.language === 'uz'
              ? "Quyida kategoriyalarga yangi qo'shilgan do'konlar soni keltirilgan"
              : 'Ниже показано количество новых магазинов в каждой категории'}
          </div>
        )}
      <div className='relative'>
        <TreeMapEcharts
          data={
            activeTab === 'Выручка' || activeTab === 'Tushum'
              ? data?.revenue?.data ?? {
                  title: 'No data',
                  value: 0,
                  children: [],
                  title_ru: 'Нет данных',
                }
              : activeTab === 'Заказы' || activeTab === 'Buyurtmalar'
              ? data?.orders?.data ?? {
                  title: 'No data',
                  value: 0,
                  children: [],
                  title_ru: 'Нет данных',
                }
              : activeTab === 'Продукты' || activeTab === 'Mahsulotlar'
              ? data?.products?.data ?? {
                  title: 'No data',
                  value: 0,
                  children: [],
                  title_ru: 'Нет данных',
                }
              : activeTab === 'Магазины' || activeTab === "Do'konlar"
              ? data?.shops?.data ?? {
                  title: 'No data',
                  value: 0,
                  children: [],
                  title_ru: 'Нет данных',
                }
              : data?.orders?.data ?? {
                  title: 'No data',
                  value: 0,
                  children: [],
                  title_ru: 'Нет данных',
                }
          }
          depth={depth}
          loading={loading.segments ?? true}
          isMoney={activeTab === 'Выручка' || activeTab === 'Tushum'}
        />
      </div>
    </div>
  );
}

export default HomeStatisticsContainer;

function getTitles(title: string) {
  if (title === 'Daromad miqdori' || title === 'Tushum miqdori') {
    return "Quyida barcha kategoriyalarning daromad miqdori va shu daromadga qarab ularning ulushi ko'rsatilgan.";
  }
  if (title === 'Buyurtmalar soni') {
    return "Quyida barcha kategoriyalarning buyurtmalar soni va shu buyurtmalar soniga qarab ularning ulushi  ko'rsatilgan.";
  }
  if (title === 'Mahsulotlar soni') {
    return "Quyida barcha kategoriyalarning mahsulotlar soni va shu mahsulotlar soniga qarab ularning ulushi ko'rsatilgan.";
  }
  if (title === "Do'konlar soni") {
    return "Quyida barcha kategoriyalarning do'konlar soni va shu do'konlar soniga qarab ularning ulushi ko'rsatilgan.";
  }
  if (title === 'Izohlar soni') {
    return "Quyida barcha kategoriyalarning izohlar soni va shu izohlar soniga qarab ularning ulushi ko'rsatilgan.";
  }
  if (title === 'Выручка') {
    return 'Ниже приведены суммы доходов всех категорий и их доля исходя из этого дохода';
  }
  if (title === 'Заказы') {
    return 'Ниже указано количество заказов всех категорий и их доля в зависимости от количества заказов.';
  }
  if (title === 'Продукты') {
    return 'Ниже указано количество товаров всех категорий и их доля в зависимости от количества этих товаров.';
  }
  if (title === 'Магазины') {
    return 'Ниже указано количество магазинов всех категорий и их доля исходя из количества этих магазинов.';
  }
  if (title === 'Отзывы') {
    return 'Ниже указано количество комментариев всех категорий и их доля в зависимости от количества комментариев.';
  }
}

function getSubtitle(title: string) {
  return 'Agar ma\'lum bir kategoriyani chuqurroq o\'rganishni istasangiz, "Kategoriyalar" bo\'limiga o\'ting va shu kategoriyani tanlang.\n Если вы хотите узнать больше об определенной категории, перейдите в "Категории" и выберите эту категорию.';
}
