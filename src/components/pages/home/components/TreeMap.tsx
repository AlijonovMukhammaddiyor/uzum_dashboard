import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { LuShrink } from 'react-icons/lu';
import Popup from 'reactjs-popup';

const AgChartsReact = dynamic(
  () => import('ag-charts-react').then((mod) => mod.AgChartsReact),
  {
    ssr: false,
  }
);

interface Props {
  data: any;
  open: boolean;
  closeModal: () => void;
  title?: string;
  isRevenue?: boolean;
  main_title?: string;
  main_subtitle?: string;
  min: number;
  max: number;
  titleField?: string;
}

function TreeMap({
  data,
  open,
  closeModal,
  title,
  main_title,
  main_subtitle,
  min,
  max,
  titleField,
}: Props) {
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const { t, i18n } = useTranslation('common');
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const isSum =
    title === t('dataTable.revenue') ||
    title === t('dataTable.30day_revenue') ||
    title === t('dataTable.7day_revenue');

  const formatRevenue = (value: number) => {
    const ending = i18n.language === 'uz' ? " so'm" : ' сум';
    const value_ = value * 1000;
    if (value_ >= 1000000000) {
      return `${(value_ / 1000000000).toFixed(1)} ${
        i18n.language === 'uz' ? 'mlrd' : 'млрд'
      } ${ending}
      `;
    } else if (value_ >= 1000000) {
      return `${(value_ / 1000000).toFixed(1)} ${
        i18n.language === 'uz' ? 'mln' : 'млн'
      } ${ending}
      `;
    } else if (value_ >= 1000) {
      return `${(value_ / 1000).toFixed(1)} ${
        i18n.language === 'uz' ? 'ming' : 'тыс'
      } ${ending}
      `;
    } else {
      return `${value_} ${ending}`;
    }
  };

  const options = {
    data: filteredData,
    series: [
      {
        type: 'treemap',
        labelKey: titleField ?? 'title',
        sizeKey: 'analytics',
        colorKey: 'analytics',
        tooltip: {
          renderer: (params: any) => {
            return {
              content: `<b>${title}</b>: ${
                isSum
                  ? formatRevenue(params.datum['analytics'])
                  : Number(
                      params.datum['analytics'].toFixed(0)
                    ).toLocaleString() +
                    ` ${i18n.language === 'uz' ? 'ta' : 'шт'}`
              }`,
            };
          },
        },
        colorDomain: [min, max],
        colorRange: ['#FFD495', '#FE6244'],
        formatter: (params: any) => ({
          stroke: 'black',
          strokeWidth: 0.5, // reduce border thickness
        }),
      },
    ],
    title: {
      text: main_title ?? '',
    },
    subtitle: {
      text: main_subtitle ?? '',
    },
  };

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      contentStyle={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        // padding: '50px 0 0 0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20000,
      }}
    >
      <div className='modal relative  flex h-full flex-col items-start justify-start overflow-scroll'>
        <LuShrink
          className='absolute right-5 top-5 z-[100] h-6 w-6 cursor-pointer'
          onClick={closeModal}
        />

        <p className='absolute right-1/2 top-24'>
          {i18n.language === 'uz'
            ? 'Iltimos, kuting...'
            : 'Пожалуйста, подождите...'}
        </p>

        <div className='h-full min-h-[1200px] w-full min-w-[1200px] flex-1'>
          <AgChartsReact
            options={options as any}
            containerStyle={{
              height: '100%',
            }}
          />
        </div>
      </div>
    </Popup>
  );
}

export default TreeMap;
