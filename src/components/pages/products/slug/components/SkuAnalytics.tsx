import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';

import clsxm from '@/lib/clsxm';

import { getSkuAnalyticssColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { RenderAlert } from '@/components/shared/AlertComponent';
import AreaChart from '@/components/shared/AreaChart';
import Button from '@/components/shared/buttons/Button';
import DoughnutEcharts from '@/components/shared/DoughnutEcharts';
import Table from '@/components/shared/Table';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface SkuAnalyticsProps {
  data: {
    sku: number;
    characteristics: string;
    recent_analytics: {
      available_amount: number;
      full_price: number;
      purchase_price: number;
      date_pretty: string;
      orders_amount: number;
    }[];
  }[];
  product_id: string;
  className?: string;
  isActive?: boolean;
  user: UserType;
  characteristics: string;
}

function SkuAnalytics({
  data,
  product_id,
  className,
  isActive,
  user,
  characteristics,
}: SkuAnalyticsProps) {
  const [days, setDays] = React.useState(3);
  const { i18n, t } = useTranslation('tableColumns');
  const [selectedSku, setSelectedSku] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<{ [key: string]: string }>(
    {}
  );
  const { state } = useContextState();

  React.useEffect(() => {
    const characteristics_ = JSON.parse(characteristics);

    if (!characteristics_?.length) return;
    if (!data?.length) return;

    const defaultSku = data[0].sku;
    setSelectedSku(defaultSku);
    // Initialize selectedTypes with the first value of each characteristic for the default SKU
    const defaultSkuDetails = data.find((sku) => sku.sku === defaultSku);
    const defaultTypes = defaultSkuDetails
      ? JSON.parse(defaultSkuDetails.characteristics ?? '[]').reduce(
          (
            acc: { [key: string]: string },
            char: { title: string; value: string }
          ) => ({ ...acc, [char.title]: char.value }),
          {}
        )
      : {};
    setSelectedTypes(defaultTypes);
  }, [characteristics, data]);

  const preparePieData = () => {
    // for each of the sku, calculate total orders in the last {days} days
    // and return a list of objects with proper characteristics and total orders

    const dataset = [];

    for (let i = 0; i < data.length; i++) {
      const sku = data[i];
      const charac = parseCharacteristics(sku.characteristics);
      let totalOrders = 0;
      const analytics = sku.recent_analytics
        .sort(
          (b, a) =>
            new Date(a.date_pretty).getTime() -
            new Date(b.date_pretty).getTime()
        )
        .slice(0, days);

      for (let j = 0; j < analytics.length; j++) {
        const order = analytics[j];
        totalOrders += order.orders_amount;
      }
      dataset.push({ name: charac, value: totalOrders });
    }

    return dataset;
  };

  const parseCharacteristics = (charact: string) => {
    // sku -> charact: "[{\"title\": \"Rang\", \"value\": \"Kulrang\"}, {\"title\": \"CPU\", \"value\": \"Intel Celeron N4020\"}, {\"title\": \"Xotira\", \"value\": \"4GB DDR4 256GB SSD\"}]"
    // characteristics: "[{\"id\": -1, \"title\": \"Rang\", \"values\": [{\"id\": -3, \"title\": \"Kulrang\", \"value\": \"#999a9c\"}, {\"id\": -125, \"title\": \"Ko\\u02bbk\", \"value\": \"#0549be\"}, {\"id\": -1, \"title\": \"Qora\", \"value\": \"#000000\"}]}, {\"id\": 738761, \"title\": \"Xotira\", \"values\": [{\"id\": 738762, \"title\": \"4GB DDR4 256GB SSD\", \"value\": \"4GB DDR4 256GB SSD\"}, {\"id\": 4849311, \"title\": \"8GB DDR4 256GB SSD\", \"value\": \"8GB DDR4 256GB SSD\"}]}, {\"id\": 738763, \"title\": \"CPU\", \"values\": [{\"id\": 738764, \"title\": \"Intel Celeron N4020\", \"value\": \"Intel Celeron N4020\"}]}]"

    // return short name for the sku with characteristics

    // get the sku object

    const sku_charac = JSON.parse(charact);
    const charac = JSON.parse(characteristics);

    let charac_string = '';

    for (let i = 0; i < charac.length; i++) {
      const sku_charac_item = sku_charac[i];
      charac_string += sku_charac_item.value + ' ❖ ';
    }

    return charac_string;
  };

  const handleTypeSelect = (title: string, value: string) => {
    // Update selectedTypes with the new value first
    const newSelectedTypes = { ...selectedTypes, [title]: value };
    setSelectedTypes(newSelectedTypes);

    // Then look for a matching SKU
    const matchingSku = data.find((sku) =>
      JSON.parse(sku.characteristics ?? '[]').every(
        (char: { title: string | number; value: string }) =>
          newSelectedTypes[char.title] === char.value
      )
    );

    if (matchingSku) {
      setSelectedSku(matchingSku.sku);
    } else {
      // If no matching SKU is found, reset the SKU
      setSelectedSku(0);
    }
  };

  return (
    <Container
      className={clsxm(
        'relative flex min-h-full w-full min-w-[1000px] flex-col items-start justify-start gap-5 p-5 pb-10',
        className
      )}
      loading={data.length === 0}
    >
      <div className='min-h-[800px] w-full'>
        <div className='flex w-full items-center justify-between border-2 border-b border-l-0 border-r-0 border-t-0 pb-3'>
          <p className='font-bold text-gray-500'>Динамика показателей</p>
          <div className='flex items-center justify-between gap-2'>
            <button
              className={clsxm(
                'rounded-md bg-gray-100 px-4 py-2 text-gray-500 transition duration-300',
                days === 3 ? 'bg-primary text-white' : 'hover:bg-gray-200'
              )}
              onClick={() => setDays(3)}
            >
              {i18n.language === 'uz' ? '3 кун' : '3 дня'}
            </button>
            <button
              className={clsxm(
                'rounded-md bg-gray-100 px-4 py-2 text-gray-500 transition duration-300 ',
                days === 7 ? 'bg-primary text-white' : 'hover:bg-gray-200'
              )}
              onClick={() => {
                if (
                  state.user?.tariff === 'free' ||
                  state.user?.tariff === 'trial'
                ) {
                  RenderAlert({
                    alertTitle:
                      i18n.language === 'uz'
                        ? "Ushbu xizmatdan foydalanish Boshlang'ich versiyadan mavjud. Tarifni o'zgartiring."
                        : 'Для использования этой функции доступна начальная версия. Измените тариф.',
                    alertSubtitle: '',
                    buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                    buttonLink: '/profile',
                  });
                  return;
                }
                setDays(7);
              }}
            >
              {i18n.language === 'uz' ? '7 кун' : '7 дней'}
            </button>
            <button
              className={clsxm(
                'rounded-md bg-gray-100 px-4 py-2 text-gray-500 transition duration-300 ',
                days === 30 ? 'bg-primary text-white' : 'hover:bg-gray-200'
              )}
              onClick={() => {
                if (
                  state.user?.tariff === 'free' ||
                  state.user?.tariff === 'trial'
                ) {
                  RenderAlert({
                    alertTitle:
                      i18n.language === 'uz'
                        ? "Ushbu xizmatdan foydalanish Boshlang'ich versiyadan mavjud. Tarifni o'zgartiring."
                        : 'Для использования этой функции доступна начальная версия. Измените тариф.',
                    alertSubtitle: '',
                    buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                    buttonLink: '/profile',
                  });
                  return;
                }
                setDays(30);
              }}
            >
              {i18n.language === 'uz' ? '30 кун' : '30 дней'}
            </button>
            <button
              className={clsxm(
                'rounded-md bg-gray-100 px-4 py-2 text-gray-500 transition duration-300 ',
                days === 60 ? 'bg-primary text-white' : 'hover:bg-gray-200'
              )}
              onClick={() => {
                if (
                  state.user?.tariff === 'free' ||
                  state.user?.tariff === 'trial' ||
                  state.user?.tariff === 'base'
                ) {
                  RenderAlert({
                    alertTitle:
                      i18n.language === 'uz'
                        ? "Ushbu xizmatdan foydalanish <Sotuvchi> versiyadan mavjud. Tarifni o'zgartiring."
                        : 'Для использования этой функции доступна <Продавец> версия. Измените тариф.',
                    alertSubtitle: '',
                    buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                    buttonLink: '/profile',
                  });
                  return;
                }
                setDays(60);
              }}
            >
              {i18n.language === 'uz' ? '60 кун' : '60 дней'}
            </button>
            <button
              className={clsxm(
                'rounded-md bg-gray-100 px-4 py-2 text-gray-500 transition duration-300 ',
                days === 90 ? 'bg-primary text-white' : 'hover:bg-gray-200'
              )}
              onClick={() => {
                if (
                  state.user?.tariff === 'free' ||
                  state.user?.tariff === 'trial' ||
                  state.user?.tariff === 'base'
                ) {
                  RenderAlert({
                    alertTitle:
                      i18n.language === 'uz'
                        ? "Ushbu xizmatdan foydalanish <Sotuvchi> versiyadan mavjud. Tarifni o'zgartiring."
                        : 'Для использования этой функции доступна <Продавец> версия. Измените тариф.',
                    alertSubtitle: '',
                    buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                    buttonLink: '/profile',
                  });
                  return;
                }
                setDays(90);
              }}
            >
              {i18n.language === 'uz' ? '90 кун' : '90 дней'}
            </button>
            <button
              className={clsxm(
                'rounded-md bg-gray-100 px-4 py-2 text-gray-500 transition duration-300 ',
                days === 120 ? 'bg-primary text-white' : 'hover:bg-gray-200'
              )}
              onClick={() => {
                if (
                  state.user?.tariff === 'free' ||
                  state.user?.tariff === 'trial' ||
                  state.user?.tariff === 'base'
                ) {
                  RenderAlert({
                    alertTitle:
                      i18n.language === 'uz'
                        ? "Ushbu xizmatdan foydalanish <Biznes> versiyadan mavjud. Tarifni o'zgartiring."
                        : 'Для использования этой функции доступна <Бизнес> версия. Измените тариф.',
                    alertSubtitle: '',
                    buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                    buttonLink: '/profile',
                  });
                  return;
                }
                setDays(120);
              }}
            >
              {i18n.language === 'uz' ? '120 кун' : '120 дней'}
            </button>
          </div>
        </div>

        <div className='flex h-[500px] w-full items-start justify-between divide-x-2 border-t'>
          <div className='mt-6 h-full w-1/2'>
            <p className='font-bold text-slate-800'>
              {i18n.language === 'uz' ? 'Buyurtmalar' : 'Продажи'}
            </p>
            <DoughnutEcharts
              data={preparePieData()}
              loading={false}
              style={{}}
            />
          </div>
          <div className='mt-6 h-full w-1/2 pl-3'>
            <p className='font-bold text-slate-800'>
              {i18n.language === 'uz' ? 'Buyurtmalar' : 'Продажи'}
            </p>
            <DoughnutEcharts
              data={preparePieData()}
              loading={false}
              style={{}}
            />
          </div>
        </div>
        <div className='flex w-full flex-wrap justify-between gap-0 pt-10'>
          {JSON.parse(characteristics).map((char: any, idx: number) => (
            <div
              key={char.id}
              className={clsxm(
                'my-2 flex-1 border border-slate-300 bg-white p-4'
                // Object.keys(selectedTypes).includes(char.title) && 'bg-blue-100'
              )}
              style={{
                minWidth: '200px',
              }}
            >
              <h4 className='mb-2 text-lg font-semibold'>{char.title}</h4>
              <ul>
                {char.values.map((value: any) => (
                  <li key={value.id}>
                    <button
                      onClick={() => handleTypeSelect(char.title, value.title)}
                      className={clsxm(
                        'flex w-full items-center px-3 py-2 text-left transition-colors',
                        selectedTypes[char.title]?.trim() ===
                          value?.title?.trim()
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-blue-100 hover:text-blue-500'
                      )}
                    >
                      {char.title === 'Rang' && (
                        <span
                          className='mr-2 inline-block'
                          style={{
                            width: '24px',
                            height: '16px',
                            backgroundColor: value.value,
                          }}
                        ></span>
                      )}
                      {value.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full pb-6'>
        {isActive && data.length > 0 ? (
          <AreaChart
            data={prepareSkusDataset(data, selectedSku, days) || []}
            labels={getLabels(data, selectedSku, days) || []}
            style={{ maxHeight: '460px' }}
            className='h-[460px] max-h-[460px] w-full'
            tension={0}
          />
        ) : (
          <></>
        )}
      </div>
      <div className='flex w-full items-center justify-end'>
        <Button
          className='flex transform items-center justify-center space-x-2 rounded-md bg-green-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-green-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'
          onClick={() => {
            if (
              state.user?.tariff === 'free' ||
              state.user?.tariff === 'trial'
            ) {
              RenderAlert({
                alertTitle:
                  i18n.language === 'uz'
                    ? "Excel faylga yuklab olish uchun boshqa tarifga o'ting"
                    : 'Для загрузки в Excel перейдите на другой тариф',
                alertSubtitle: '',
                buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                buttonLink: '/profile',
              });
              return;
            }
            // exportToExcel();
          }}
          // isLoading={loading}
          spinnerColor='rgb(126 34 206)'
        >
          {/* {loading ? (
          <Spinner size='24px' />
        ) : ( */}
          <>
            <FaFileExcel className='h-5 w-5' />
            <p>{i18n.language === 'uz' ? 'Yuklab olish' : 'Скачать'}</p>
          </>
          {/* )} */}
        </Button>
      </div>

      <Table
        isBalham={true}
        rowHeight={70}
        headerHeight={40}
        rowData={preapreTableData(data, selectedSku, days)}
        columnDefs={getSkuAnalyticssColDefs(t, i18n.language)}
        className='h-[1000px]'
        withCheckbox
      />
    </Container>
  );
}

function getLabels(
  data:
    | {
        sku: number;
        characteristics: string;
        recent_analytics: {
          available_amount: number;
          full_price: number;
          purchase_price: number;
          date_pretty: string;
          orders_amount: number;
        }[];
      }[]
    | null,
  selectedSku: number,
  days: number
) {
  if (!data) return [];

  const sku = data?.find((sku) => sku.sku === selectedSku);

  if (!sku) return [];
  const analytics = sku.recent_analytics;

  const analytics_ = analytics.sort(
    (a, b) =>
      new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
  );

  const labels = analytics_.map((item) => item.date_pretty);

  // slice from the start, end should stay

  return labels.slice(Math.max(0, labels.length - days), labels.length);
}

function prepareSkusDataset(
  data: {
    sku: number;
    characteristics: string;
    recent_analytics: {
      available_amount: number;
      full_price: number;
      purchase_price: number;
      date_pretty: string;
      orders_amount: number;
    }[];
  }[],
  selectedSku: number,
  days: number,
  lang = 'uz'
) {
  const dataset: any[] = [];
  const price = [];
  const available = [];
  const orders = [];
  const realPrice = [];

  const sku = data.find((sku) => sku.sku === selectedSku);

  if (sku) {
    const analytics_ = sku.recent_analytics;

    const analytics = analytics_
      .sort(
        (a, b) =>
          new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
      )
      .slice(Math.max(0, analytics_.length - days), analytics_.length);

    for (let j = 0; j < analytics.length; j++) {
      const item = analytics[j];
      available.push({
        x: item.date_pretty,
        y: item.available_amount,
        label: sku.sku.toString(),
      });
      orders.push({
        x: item.date_pretty,
        y: item.orders_amount,
        label: sku.sku.toString(),
      });
      price.push({
        x: item.date_pretty,
        y: item.purchase_price,
        label: sku.sku.toString(),
      });

      realPrice.push({
        x: item.date_pretty,
        y: item.full_price,
        label: sku.sku.toString(),
      });
    }
  }

  dataset.push({
    data: available,
    fill: true,
    borderColor: 'rgba(0, 128, 0, 1)',
    backgroundColor: 'rgba(0, 128, 0, 0.2)',
    label: lang == 'uz' ? 'Mavjud miqdor' : 'Остатки',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(0, 128, 0, 1)',
  });

  dataset.push({
    data: orders,
    fill: true,
    hidden: false,
    borderColor: 'rgba(100, 149, 237, 1)',
    backgroundColor: 'rgba(100, 149, 237, 0.2)',
    label: lang === 'uz' ? 'Buyurtmalar' : 'Продажи',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(100, 149, 237, 1)',
  });

  dataset.push({
    data: price,
    fill: true,
    hidden: false,
    borderColor: 'rgba(255, 165, 0, 1)',
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    label: lang === 'uz' ? 'Sotuv narxi' : 'Цена закупки',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 165, 0, 1)',
  });

  dataset.push({
    data: realPrice,
    fill: true,
    hidden: false,
    borderColor: 'rgba(255, 0, 0, 1)',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    label: lang === 'uz' ? 'Chegirmasiz narx' : 'Цена продажи',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 0, 0, 1)',
  });

  return dataset;
}

function preapreTableData(
  data: {
    sku: number;
    characteristics: string;
    recent_analytics: {
      available_amount: number;
      full_price: number;
      purchase_price: number;
      date_pretty: string;
      orders_amount: number;
    }[];
  }[],
  selectedSku: number,
  days: number
) {
  const sku = data.find((sku) => sku.sku === selectedSku);
  if (!sku) return [];

  const analytics = sku.recent_analytics;

  const analyt = analytics
    .sort(
      (b, a) =>
        new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
    )
    .slice(0, days);

  return analyt;
}

export default SkuAnalytics;
