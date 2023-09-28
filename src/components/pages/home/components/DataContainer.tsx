import { useTranslation } from 'next-i18next';
import React from 'react';

import MixedChart from '@/components/pages/home/components/SmallAxisCharts';
import TreeMap from '@/components/pages/home/components/TreeMap';

import { UserType } from '@/types/user';

interface Props {
  title: string;
  all_title?: string;
  daily_title?: string;
  all: number;
  daily: number;
  all_last: number;
  daily_last: number;
  isCount?: boolean;
  last_date?: string;
  data_all: {
    x: string;
    y: number;
  }[];
  data_daily: {
    x: string;
    y: number;
  }[];
  all_color?: string;
  daily_color?: string;
  isFullScreen?: string | null;
  setFullScreen?: React.Dispatch<React.SetStateAction<string | null>>;
  data: any;
  user: UserType;
}

function DataContainer({
  title,
  all,
  daily,
  all_last,
  daily_last,
  last_date,
  data_all,
  data_daily,
  all_color,
  daily_color,
  isCount = true,
  data,
  isFullScreen,
  setFullScreen,
  user,
}: Props) {
  const { t, i18n } = useTranslation('common');
  return (
    <div className='py- h-[400px] min-h-[500px] w-full min-w-[750px] border-none px-6'>
      {isFullScreen && (
        <TreeMap
          titleField={i18n.language === 'uz' ? 'title' : 'title_ru'}
          data={getData(data, title, i18n.language)}
          min={getMinMax(data, title)?.min}
          max={getMinMax(data, title)?.max}
          open={isFullScreen === title}
          closeModal={() => {
            setFullScreen && setFullScreen(null);
          }}
          title={title}
          main_title={getTitles(title)}
          main_subtitle={getSubtitle(title)}
        />
      )}
      <div className='mb-4 flex items-center justify-between'>
        <h3
          className='font-primary text-base'
          style={{
            color: daily_color,
          }}
        >
          {title}
        </h3>
      </div>
      <div className='flex h-[400px] w-full flex-col items-start justify-start gap-5'>
        <div className='h-[400px] w-full flex-1'>
          <MixedChart
            data={[
              {
                type: 'line',
                data: data_daily,
                borderColor: daily_color,
                label: t('dataTable.daily'),
              },
              {
                type: 'bar',
                data: data_all,
                backgroundColor: all_color,
                label: t('dataTable.total'),
                borderRadius: 3,
                borderSkipped: 'bottom',
              },
            ]}
            labels={data_daily.map((d) => d.x)}
          />
        </div>
      </div>
    </div>
  );
}

function getData(
  data: {
    revenue: {
      data: any;
    };
    orders: {
      data: any;
    };
    products: {
      data: any;
    };
    shops: {
      data: any;
    };
    reviews: {
      data: any;
    };
  },
  title: string,
  lang: string
) {
  if (!data.orders) return [];

  if (
    title === 'Daromad miqdori' ||
    title === 'Выручка' ||
    title === 'Tushum miqdori'
  ) {
    return data.revenue.data;
  }
  if (title === 'Buyurtmalar soni' || title === 'Продаж') {
    return data.orders.data;
  }
  if (title === 'Mahsulotlar soni' || title === 'Продукты') {
    return data.products.data;
  }
  if (title === "Do'konlar soni" || title === 'Магазины') {
    return data.shops.data;
  }
  if (title === 'Izohlar soni' || title === 'Отзывы') {
    return data.reviews.data;
  }
}

function getMinMax(data: any, title: string) {
  if (!data.orders) return [];

  if (
    title === 'Daromad miqdori' ||
    title === 'Выручка' ||
    title === 'Tushum miqdori'
  ) {
    return data.revenue.min_max;
  }
  if (title === 'Buyurtmalar soni' || title === 'Продаж') {
    return data.orders.min_max;
  }
  if (title === 'Mahsulotlar soni' || title === 'Продукты') {
    return data.products.min_max;
  }
  if (title === "Do'konlar soni" || title === 'Магазины') {
    return data.shops.min_max;
  }
  if (title === 'Izohlar soni' || title === 'Отзывы') {
    return data.reviews.min_max;
  }
}

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

function calculateChange(current: number, last: number) {
  if (last === 0) return 0;

  return (Math.abs((current - last) / last) * 100).toFixed(2);
}

export default DataContainer;
