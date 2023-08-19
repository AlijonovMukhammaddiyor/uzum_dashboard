/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellStyle } from 'ag-grid-community';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { HiMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { Carousel } from 'react-responsive-carousel';
import Popup from 'reactjs-popup';

import clsxm from '@/lib/clsxm';

import TinyColumnGraph from '@/components/shared/TinyColumnGraph';
import TinyLineGraph from '@/components/shared/TinyLineGraph';

import { useContextState } from '@/context/Context';

let isRussian = false;

if (typeof window !== 'undefined') {
  isRussian = window.location.href.includes('/ru');
}

export const categoryAnalyticsColumnDefs = [
  {
    headerName: 'Sana',
    field: 'date',
    sortable: true,
    filter: 'agDateColumnFilter',
    floatingFilter: true,
    minWidth: 150,
    maxWidth: 200,
  },
  {
    headerName: 'Buyurtmalar Soni',
    field: 'orders',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'Mahsulotlar soni',
    field: 'products',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'Do`konlar soni',
    field: 'sellers',
    floatingFilter: true,
    filter: 'agNumberColumnFilter',
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'O`rtacha narx',
    field: 'avgPrice',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'O`rtacha reyting',
    field: 'avgRating',
    // cellRendererFramework: TypesCellRenderer,
    flex: 1,
    floatingFilter: true,
    minWidth: 150,
  },
  {
    headerName: 'Sotilgan Mahsulot turlari soni',
    field: 'soldProductTypes',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
    headerTooltip: 'Shu sanada sotilgan mahsulot turlari soni',
  },
  {
    headerName: 'Sotgan Do`konlar soni',
    field: 'soldSellers',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
    headerTooltip: 'Shu sanada mahsulot sotgan do`konlar soni',
  },
  {
    headerName: 'Izohlar soni',
    field: 'reviews',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
  },
];

export const subCategoryAnalyticsColumnDefs = [
  {
    headerName: 'Sana',
    field: 'date',
    sortable: true,
    filter: 'agDateColumnFilter',
    floatingFilter: true,
    minWidth: 150,
    maxWidth: 200,
  },
  {
    headerName: 'Subkategoriya',
    field: 'subcategory',
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    minWidth: 200,
    maxWidth: 200,
  },
  {
    headerName: 'Buyurtmalar Soni',
    field: 'orders',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'Mahsulotlar soni',
    field: 'products',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'Do`konlar soni',
    field: 'sellers',
    floatingFilter: true,
    filter: 'agNumberColumnFilter',
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'O`rtacha narx',
    field: 'avgPrice',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'O`rtacha reyting',
    field: 'avgRating',
    // cellRendererFramework: TypesCellRenderer,
    flex: 1,
    floatingFilter: true,
    minWidth: 150,
  },
  {
    headerName: 'Sotilgan Mahsulot turlari soni',
    field: 'soldProductTypes',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
    headerTooltip: 'Shu sanada sotilgan mahsulot turlari soni',
  },
  {
    headerName: 'Sotgan Do`konlar soni',
    field: 'soldSellers',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
    headerTooltip: 'Shu sanada mahsulot sotgan do`konlar soni',
  },
  {
    headerName: 'Izohlar soni',
    field: 'reviews',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
  },
];

const ProductImageCellRenderer = ({ value }: { value: string }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!value) return null;
  const srcs: string[] = JSON.parse(value);
  const srcs_no_duplicates = new Set(srcs);
  const srcs_back = Array.from(srcs_no_duplicates).slice(0, 3);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='relative h-full max-w-[180px] overflow-auto'>
      {srcs_back.map((src, index) => {
        return (
          <div
            key={index}
            className='absolute left-0 top-0'
            style={{ zIndex: index, left: `${index * 30}px` }}
            onClick={openModal}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='h-[40px] w-[40px] object-contain'
              src={`/api/image?url=${encodeURIComponent(src)}`}
              alt=''
              // width={40}
              // height={40}
            />
          </div>
        );
      })}
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <Carousel
          showArrows={true}
          showThumbs={true}
          // renderThumbs={() =>
          //   Array.from(srcs_no_duplicates).map((thumbnail) => (
          //     <img
          //       src={thumbnail}
          //       alt={thumbnail}
          //       key={thumbnail}
          //       // width={100}
          //       // height={120}
          //       className='h-[100px] w-[100px] object-contain'
          //     />
          //   ))
          // }
        >
          {Array.from(srcs_no_duplicates).map((src, index) => (
            <div key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/image?url=${encodeURIComponent(src)}`}
                alt='mahsulot_rasmi'
                className='h-full max-h-[60vh] w-full object-contain'
                width={500}
                height={500}
              />
            </div>
          ))}
        </Carousel>
      </Popup>
    </div>
  );
};

const AvatarCellRenderer = ({ value }: { value: string }) => {
  if (!value) return '';
  return (
    <Image src={value} width={30} height={40} alt='' className='rounded-full' />
  );
};

const ProductNameCellRenderer = ({ value }: { value: string }) => {
  const { dispatch, state } = useContextState();
  const router = useRouter();
  if (!value) return '';

  // replace / with dash
  const title = value?.split('((')[0];
  // const product_title = value
  //   ?.split('((')[0]
  //   .replace(/\//g, '-')
  //   .replace(/ /g, '-');
  const product_id = value?.split('((')[1]?.split('))')[0];
  return (
    <div
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });
        if (state.user?.tariff !== 'free')
          router.push(`/products/${product_id}`);
        else {
          alert(
            "Bu xizmatdan foydalanish uchun iltimos boshqa tarifiga o'ting!"
          );
        }
      }}
    >
      <p className='text-blue-500 hover:underline'>{title}</p>
    </div>
  );
};

const BannerProductNameCellRenderer = ({ value }: { value: string }) => {
  const { dispatch, state } = useContextState();
  const router = useRouter();
  if (!value) return '';

  // replace / with dash
  const title = value?.split('((')[0];
  // const product_title = value
  //   ?.split('((')[0]
  //   .replace(/\//g, '-')
  //   .replace(/ /g, '-');
  const product_id = value?.split('((')[1]?.split('))')[0];
  return (
    <div
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });
        if (state.user?.tariff !== 'free')
          router.push(`/campaigns/${product_id}`);
        else {
          alert(
            "Bu xizmatdan foydalanish uchun iltimos boshqa tarifiga o'ting!"
          );
        }
      }}
    >
      <p className='text-blue-500 hover:underline'>{title}</p>
    </div>
  );
};

const SubcategoryCellRenderer = ({ value }: { value: string }) => {
  const { dispatch, state } = useContextState();
  const router = useRouter();
  if (!value) return '';

  const title = value?.split('((')[0].trim();
  const category_id = value?.split('((')[1]?.split('))')[0];

  return (
    <div
      // href={`/category/${title}--${category_id}`}
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });
        if (state.user?.tariff !== 'free')
          // if (typeof window !== 'undefined')
          //   // router.push(`/category/${title}--${category_id}`);
          //   window.location.href = `/category/${title}--${category_id}`;
          router.push(`/category/${title}--${category_id}`);
        // else router.push(`/category/${title}--${category_id}`);
        else {
          alert(
            "Bu xizmatdan foydalanish uchun iltimos boshqa tarifiga o'ting!"
          );
        }
      }}
    >
      <p className='text-blue-500 hover:underline'>{title}</p>
    </div>
  );
};

const CategoryNameCellRenderer = ({ value }: { value: string }) => {
  const { dispatch, state } = useContextState();
  const router = useRouter();

  if (!value) return '';

  const title = value?.split('((')[0].trim();
  const category_id = value?.split('((')[1]?.trim().split('))')[0];

  return (
    <div
      // href={`/category/${title}--${category_id}`}
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });

        if (state.user?.tariff !== 'free')
          router.push(`/category/${title}--${category_id}`);
        else {
          alert(
            "Bu xizmatdan foydalanish uchun iltimos boshqa tarifiga o'ting!"
          );
        }
      }}
    >
      <p className='text-blue-500 hover:underline'>{title}</p>
    </div>
  );
};
const CategoryAncestorsCellRenderer = ({ value }: { value: string }) => {
  if (!value) return '';

  const categories = value.split('/');

  let res = '';

  for (let i = 0; i < categories.length; i++) {
    res += categories[i].split(':')[0].trim() + ' > ';
  }

  if (res.length > 0) res = res.slice(0, -2);

  return (
    <div>
      <p className='text-slate-500'>{res}</p>
    </div>
  );
};

const SellerNameCellRenderer = ({ value }: { value: string }) => {
  const { dispatch, state } = useContextState();
  const router = useRouter();
  // get seller link from value = "title (link)""
  if (!value) return '';
  // try{
  const seller_link = value?.split('((')[1]?.trim().split('))')[0];
  const seller_title = value?.split('((')[0].trim();

  if (!seller_link || !seller_title)
    return <p className='text-black'>{seller_title}</p>;

  return (
    <div
      // href={`/sellers/${seller_link}`}
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });
        if (state.user?.tariff !== 'free')
          router.push(`/sellers/${seller_link}`);
        else {
          alert(
            "Bu xizmatdan foydalanish uchun iltimos boshqa tarifiga o'ting!"
          );
        }
      }}
    >
      <p className='text-blue-500 hover:underline'>{seller_title}</p>
    </div>
  );
};

const TrendPriceCellRenderer = ({ value }: { value: string }) => {
  if (value === null) return <p>-</p>;

  const value_number = Number(Number(value).toFixed(0));
  return (
    <div className=''>
      <p className=''>{value_number?.toLocaleString()} so'm</p>
    </div>
  );
};

const PriceRenderer = ({ value }: { value: number }) => {
  if (value === null || value === 0) return <p>-</p>;

  const value_number = Number(Number(value).toFixed(0));
  return (
    <div className=''>
      <p className=''>{value_number?.toLocaleString()} so'm</p>
    </div>
  );
};

const FullPriceCellRenderer = ({ value }: { value: string }) => {
  if (!value) return '';
  const skus: {
    sku_id: number;
    purchase_price: number;
    full_price: number;
    orders_amount: number;
    available_amount: number;
  }[] = JSON.parse(value);

  const count = skus.filter(
    (sku) => sku.full_price && sku.full_price > 0
  ).length;

  const average_full_price =
    skus.reduce((acc, curr) => acc + curr.full_price, 0) / count;

  if (!average_full_price)
    return (
      <div className='flex flex-col gap-1'>
        <p className=''>Chegirma yo'q</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-1'>
      <p className=''>
        {Math.floor(average_full_price)?.toLocaleString()} so'm
      </p>
    </div>
  );
};

const PurchasePriceCellRenderer = ({ value }: { value: string }) => {
  if (!value) return '';
  const skus: {
    sku_id: number;
    purchase_price: number;
    full_price: number;
    orders_amount: number;
    available_amount: number;
  }[] = JSON.parse(value);

  const count = skus.filter(
    (sku) => sku.purchase_price && sku.purchase_price > 0
  ).length;

  const average_purchase_price: number =
    skus.reduce((acc, curr) => acc + curr.purchase_price, 0) / count;

  return (
    <div className='flex flex-col gap-1'>
      <p className=''>
        {Math.floor(average_purchase_price)?.toLocaleString()} so'm
      </p>
    </div>
  );
};

const RevenueCellRenderer = ({ value }: { value: number }) => {
  if (!value) return '-';
  const value_ = value * 1000;
  // check if it is int billion
  if (value_ > 1000000000)
    return (
      <div className='flex flex-col gap-1'>
        <p className=''>
          {(Math.round(value_) / 1000000000).toFixed(1)} mlrd so'm
        </p>
      </div>
    );

  // check if it is int million
  if (value_ > 1000000)
    return (
      <div className='flex flex-col gap-1'>
        <p className=''>{(Math.round(value_) / 1000000).toFixed(1)} mln so'm</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-1'>
      <p className=''>{Math.floor(value_)?.toLocaleString()} so'm</p>
    </div>
  );
};

const RatingCellRenderer = ({ value }: { value: string }) => {
  if (!value) return '';
  const value_number = Number(value);
  return (
    <div className='flex items-center justify-center'>
      <p className='text-center'>
        {value_number !== 0
          ? value_number?.toFixed(1).toLocaleString()
          : "Reyting Yo'q"}
      </p>
    </div>
  );
};

const SkusCountCellRenderer = ({ value }: { value: string }) => {
  if (!value) return '';
  const skus: {
    sku_id: number;
    purchase_price: number;
    full_price: number;
    orders_amount: number;
    available_amount: number;
  }[] = JSON.parse(value);

  const count = skus.length;

  return (
    <div className='flex flex-col gap-1'>
      <p className=''>{count?.toLocaleString()} ta</p>
    </div>
  );
};

const BadgesCellRenderer = ({ value }: { value: string }) => {
  if (!value) return '';

  const badges: {
    badge_text: string;
    badge_bg_color: string;
    badge_text_color: string;
  }[] = JSON.parse(value);

  return (
    <div className='flex h-full w-full flex-wrap items-center justify-center gap-2'>
      {badges.map((badge, index) => {
        return (
          <span
            key={index}
            className='rounded-md px-2 py-1 text-sm font-medium'
            style={{
              backgroundColor: badge.badge_bg_color,
              color: badge.badge_text_color,
            }}
          >
            {badge.badge_text}
          </span>
        );
      })}
    </div>
  );
};

const LocaleNumberCellRenderer = ({ value }: { value: string }) => {
  if (value === null) return '';
  const value_number = Number(value);
  return (
    <div className='flex flex-col gap-1'>
      <p className=''>{value_number?.toLocaleString()}</p>
    </div>
  );
};
const PercentageCellRenderer = ({ value }: { value: string }) => {
  if (value === null) return '';
  const value_number = Number(value);
  return (
    <div className='flex flex-col gap-1'>
      <p className=''>{value_number?.toLocaleString()} %</p>
    </div>
  );
};

function DailyOrdersCellRenderer(props: { value: any }) {
  const { value } = props;

  const color = value?.change < 0 ? 'red' : 'green';
  const ChangeIcon = value?.change < 0 ? HiMinusSm : HiOutlinePlusSm;

  return (
    <div className='flex items-center justify-center'>
      <p className='text-center'>{value?.target?.toLocaleString()}</p>
      {value?.change !== 0 && (
        <div className='flex items-center justify-start'>
          <p
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          >
            (
          </p>
          <ChangeIcon
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          />
          <p
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          >
            {Math.abs(value?.change)?.toLocaleString()}
          </p>
          <p
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          >
            )
          </p>
        </div>
      )}
    </div>
  );
}
function DailyRatingCellRenderer(props: { value: any }) {
  const { value } = props;

  const color = value?.change < 0 ? 'red' : 'green';
  const ChangeIcon = value?.change < 0 ? HiMinusSm : HiOutlinePlusSm;

  return (
    <div className='flex items-center justify-center'>
      <p className='text-center'>{value?.target}</p>
      {value?.change !== 0 && (
        <div className='flex items-center justify-start'>
          <ChangeIcon
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          />
          <p
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          >
            {Math.abs(value?.change)?.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

function DailyPositionCellRenderer(props: { value: any }) {
  const { value } = props;

  const color = value?.change > 0 ? 'red' : 'green';
  const ChangeIcon = value?.change < 0 ? BsArrowUpShort : BsArrowDownShort;
  const ss = value?.change !== 0 && value?.before;

  return (
    <div className='flex items-center justify-center'>
      <p className='text-center'>{value?.target}</p>
      {ss && (
        <div className='flex items-center justify-start'>
          <ChangeIcon
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          />
          <p
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          >
            {Math.abs(value?.change)?.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

function PriceChangeCellRenderer(props: { value: any }) {
  const { value } = props;

  const color = value?.change < 0 ? 'red' : 'green';
  const ChangeIcon = value?.change < 0 ? HiMinusSm : HiOutlinePlusSm;
  const sss = value?.before && value?.change !== 0;
  return (
    <div className='flex items-center justify-start gap-1'>
      <p className='text-center'>
        {Math.round(value?.target)?.toLocaleString()} so'm
      </p>
      {sss && (
        <div className='flex items-center justify-start'>
          <p
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          >
            (
          </p>
          <ChangeIcon
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          />
          <p
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          >
            {Math.abs(Math.round(value?.change))?.toLocaleString()} so'm
          </p>
          <p
            className={clsxm(
              'text-sm',
              color === 'red' ? 'text-red-500' : 'text-green-500'
            )}
          >
            )
          </p>
        </div>
      )}
    </div>
  );
}

const ProductDateCellRenderer = (props: { value: any }) => {
  if (!props.value) return '';

  const date = new Date(props.value);
  // check if it is after may 20 2023. if not, return empty string
  if (date.getTime() < 1684627200000) return '';
  return (
    <div className='flex items-center justify-center'>
      <p className='text-center'>
        {date.toISOString().split('T')[0].split('-').reverse().join('/')}
      </p>
    </div>
  );
};

const BannerDateCellRenderer = (props: { value: any }) => {
  if (!props.value) return '';
  // if it is equal to today in format yyyy-mm-dd, return ''
  if (props.value === new Date().toISOString().split('T')[0]) return '';

  const date = new Date(props.value);
  // check if it is after may 20 2023. if not, return empty string
  if (date.getTime() < 1685491200000) return '';
  return (
    <div className='flex items-center justify-center'>
      <p className='text-center'>
        {date.toLocaleDateString('en-GB').split('/').reverse().join('/')}
      </p>
    </div>
  );
};

const OrdersAmountTinyChartCellRenderer = ({ value }: { value: any }) => {
  if (!value) return '';
  value.sort((a: any, b: any) => {
    const a_date = new Date(a.x);
    const b_date = new Date(b.x);
    return a_date.getTime() - b_date.getTime();
  });
  const smallest = value[0]?.x;
  const biggest = value[value.length - 1]?.x;

  // from smallest day to biggest day (given in YYYY-MM-DD format), check if is entry for every day, if not, add entry with 0 value
  const days = [];

  const smallest_date = new Date(smallest);
  const biggest_date = new Date(biggest);

  for (
    let i = smallest_date.getTime();
    i <= biggest_date.getTime();
    i += 24 * 60 * 60 * 1000
  ) {
    const date = new Date(i);
    const date_string = date.toISOString().split('T')[0];
    if (date_string !== '2023-07-23' && date_string !== '2023-07-24')
      days.push(date_string);
  }

  const data: number[] = [];

  // for each day, get entry from value, if not found, set 0
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const entry = value.find((e: any) => e.x === day);
    if (day !== '2023-07-23' && day !== '2023-07-24')
      data.push(entry ? entry.y : 0);
  }

  return (
    <div className=''>
      <TinyColumnGraph
        data={data}
        labels={days}
        bgColor='rgba(75, 192, 192, 1)'
        borderColor='rgba(75, 192, 192, 1)'
        width='300px'
      />
    </div>
  );
};

const ReviewsAmountTinyChartCellRenderer = ({ value }: { value: any }) => {
  if (!value) return '';

  value.sort((a: any, b: any) => {
    const a_date = new Date(a.x);
    const b_date = new Date(b.x);
    return a_date.getTime() - b_date.getTime();
  });
  return (
    <div className=''>
      <p>{value[value.length - 1]?.y}</p>
    </div>
  );
  // const smallest = value[0]?.x;
  // const biggest = value[value.length - 1]?.x;

  // // from smallest day to biggest day (given in YYYY-MM-DD format), check if is entry for every day, if not, add entry with 0 value
  // const days = [];

  // const smallest_date = new Date(smallest);
  // const biggest_date = new Date(biggest);

  // for (
  //   let i = smallest_date.getTime();
  //   i <= biggest_date.getTime();
  //   i += 24 * 60 * 60 * 1000
  // ) {
  //   const date = new Date(i);
  //   const date_string = date.toISOString().split('T')[0];
  //   days.push(date_string);
  // }

  // const data: number[] = [];

  // // for each day, get entry from value, if not found, set 0
  // for (let i = 0; i < days.length; i++) {
  //   const day = days[i];
  //   const entry = value.find((e: any) => e.x === day);
  //   data.push(entry ? entry.y : 0);
  // }

  // return (
  //   <div className=''>
  //     <TinyColumnGraph
  //       data={data}
  //       labels={days}
  //       bgColor='rgba(153, 102, 255, 1)'
  //       borderColor='rgba(153, 102, 255, 1)'
  //       width='300px'
  //     />
  //   </div>
  // );
};

const AvailableAmountTinyChartCellRenderer = ({ value }: { value: any }) => {
  if (!value) return '';
  value.sort((a: any, b: any) => {
    const a_date = new Date(a.x);
    const b_date = new Date(b.x);
    return a_date.getTime() - b_date.getTime();
  });
  const smallest = value[0]?.x;
  const biggest = value[value.length - 1]?.x;

  // from smallest day to biggest day (given in YYYY-MM-DD format), check if is entry for every day, if not, add entry with 0 value
  const days = [];

  const smallest_date = new Date(smallest);
  const biggest_date = new Date(biggest);

  for (
    let i = smallest_date.getTime();
    i <= biggest_date.getTime();
    i += 24 * 60 * 60 * 1000
  ) {
    const date = new Date(i);
    const date_string = date.toISOString().split('T')[0];
    days.push(date_string);
  }

  const data: number[] = [];

  // for each day, get entry from value, if not found, set 0
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const entry = value.find((e: any) => e.x === day);
    data.push(entry ? entry.y : 0);
  }
  return (
    <div className=''>
      <TinyColumnGraph
        data={data}
        labels={days}
        bgColor='rgba(82, 95, 225, 1)'
        borderColor='rgba(70, 130, 180, 1)'
        width='300px'
      />
    </div>
  );
};

const SellersCountTinyChartCellRenderer = ({ value }: { value: any }) => {
  if (!value) return '';
  value.sort((a: any, b: any) => {
    const a_date = new Date(a.x);
    const b_date = new Date(b.x);
    return a_date.getTime() - b_date.getTime();
  });
  const smallest = value[0]?.x;
  const biggest = value[value.length - 1]?.x;

  // from smallest day to biggest day (given in YYYY-MM-DD format), check if is entry for every day, if not, add entry with 0 value
  const days = [];

  const smallest_date = new Date(smallest);
  const biggest_date = new Date(biggest);

  for (
    let i = smallest_date.getTime();
    i <= biggest_date.getTime();
    i += 24 * 60 * 60 * 1000
  ) {
    const date = new Date(i);
    const date_string = date.toISOString().split('T')[0];
    days.push(date_string);
  }

  const data: number[] = [];

  // for each day, get entry from value, if not found, set 0
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const entry = value.find((e: any) => e.x === day);
    data.push(entry ? entry.y : 0);
  }
  return (
    <div className=''>
      <TinyColumnGraph
        data={data}
        labels={days}
        bgColor='rgb(248, 111, 3)'
        borderColor='rgb(248, 111, 3)'
        width='300px'
      />
    </div>
  );
};

const TopSellersRevenueChartCellRenderer = ({ value }: { value: any }) => {
  if (!value) return '';

  // reverse value
  const data: number[] = value.map((num: number) => num * 1000).reverse();

  return (
    <div className='m-0 flex h-full w-full max-w-full items-center justify-center p-0'>
      <TinyLineGraph
        data={data}
        bgColor='rgb(248, 111, 3)'
        borderColor='rgb(248, 111, 3)'
        width='250px'
        isRevenue={true}
      />
    </div>
  );
};

export const getTopShopsColDefs = (t: any) => {
  return [
    {
      headerName: t('shop_name'),
      field: 'title',
      cellRenderer: SellerNameCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      minWidth: 200,
    },
    {
      headerName: t('revenue'),
      field: 'total_revenue',
      cellRenderer: TopSellersRevenueChartCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      maxWidth: 250,
      minWidth: 200,
    },
    {
      headerName: t('orders'),
      field: 'total_orders',
      cellRenderer: LocaleNumberCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      // maxWidth: 200,
    },
    {
      headerName: t('reviews'),
      field: 'total_reviews',
      cellRenderer: LocaleNumberCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      // maxWidth: 200,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      cellRenderer: PriceRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      minWidth: 130,
    },
  ];
};

export const getTopProductsColDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('product_name'),
      field: lang === 'uz' ? 'title' : 'title_ru',
      cellRenderer: ProductNameCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      minWidth: 200,
    },
    {
      headerName: t('category'),
      field: lang === 'uz' ? 'category_title' : 'category_title_ru',
      cellRenderer: CategoryNameCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: t('shop_name'),
      field: 'shop_title',
      cellRenderer: SellerNameCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      minWidth: 100,
    },
    {
      headerName: t('revenue'),
      field: 'orders_money',
      cellRenderer: TopSellersRevenueChartCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      maxWidth: 250,
      minWidth: 200,
    },
    {
      headerName: t('orders'),
      field: 'orders_amount',
      cellRenderer: LocaleNumberCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      // maxWidth: 200,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      cellRenderer: PriceRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      minWidth: 130,
    },
    {
      headerName: t('reviews'),
      field: 'reviews_amount',
      cellRenderer: LocaleNumberCellRenderer,
      filter: false,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      // maxWidth: 200,
    },
  ];
};

export const getGrowingCategoriesColDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('category'),
      field: 'title',
      sortable: true,
      cellRenderer: CategoryNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('orders'),
      field: 'orders',
      cellRenderer: OrdersAmountTinyChartCellRenderer,
      sortable: true,
      minWidth: 350,
      filter: false,
      maxWidth: 600,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('products_count'),
      field: 'total_products',
      sortable: true,
      cellRenderer: AvailableAmountTinyChartCellRenderer,
      minWidth: 350,
      filter: false,
      maxWidth: 500,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('shops_count'),
      field: 'total_shops',
      sortable: true,
      cellRenderer: SellersCountTinyChartCellRenderer,
      minWidth: 350,
      filter: false,
      maxWidth: 500,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      sortable: true,
      cellRenderer: PriceRenderer,
      minWidth: 150,
      filter: false,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'reviews_amount',
      sortable: true,
      // cellRenderer: ReviewsAmountTinyChartCellRenderer,
      minWidth: 300,
      filter: false,
      maxWidth: 600,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('rating'),
      field: 'average_product_rating',
      cellRenderer: RatingCellRenderer,
      sortable: true,
      filter: false,
      minWidth: 150,
      maxWidth: 150,
      headerTooltip: 'Kategoriyadagi mahsulotlarning o`rtacha reytingi',
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
  ];
};

export const getNichesColDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('category'),
      field: lang === 'uz' ? 'category__title' : 'category__title_ru',
      sortable: true,
      cellRenderer: CategoryNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 200,
    },
    {
      headerName: '',
      field: lang === 'uz' ? 'category__ancestors' : 'category__ancestors_ru',
      sortable: true,
      cellRenderer: CategoryAncestorsCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      minWidth: 400,
    },
    {
      headerName: t('revenue'),
      field: 'total_orders_amount',
      sortable: true,
      filter: false,
      cellRenderer: RevenueCellRenderer,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('orders'),
      field: 'total_orders',
      sortable: true,
      filter: false,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('products_count'),
      field: 'total_products',
      sortable: true,

      filter: false,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('active_products_percentage'),
      field: 'percentage_of_products_with_sales',
      sortable: true,
      filter: false,
      cellRenderer: PercentageCellRenderer,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('shops_count'),
      field: 'total_shops',
      sortable: true,
      filter: false,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('active_shops_percentage'),
      field: 'percentage_of_shops_with_sales',
      sortable: true,
      filter: false,
      cellRenderer: PercentageCellRenderer,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      sortable: true,
      cellRenderer: PriceRenderer,
      minWidth: 150,
      filter: false,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'total_reviews',
      sortable: true,
      // cellRenderer: ReviewsAmountTinyChartCellRenderer,
      filter: false,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('rating'),
      field: 'average_product_rating',
      cellRenderer: RatingCellRenderer,
      sortable: true,
      filter: false,
      minWidth: 150,
      maxWidth: 150,
      headerTooltip: 'Kategoriyadagi mahsulotlarning o`rtacha reytingi',
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
  ];
};

export const getGrowingProductsColDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('id'),
      field: 'product_id',
      minWidth: 100,
      maxWidth: 100,
      filter: false,
      sortable: false,
      cellStyle: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    {
      headerName: t('image'),
      field: 'photos',
      sortable: false,
      cellRenderer: ProductImageCellRenderer,
      // pinned: 'left',
      minWidth: 150,
      filter: false,
      maxWidth: 150,
    },
    {
      headerName: t('product_name'),
      field: lang === 'uz' ? 'product__title' : 'product__title_ru',
      // pinned: 'left',
      sortable: false,
      cellRenderer: ProductNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('category'),
      field:
        lang === 'uz'
          ? 'product__category__title'
          : 'product__category__title_ru',
      cellRenderer: CategoryNameCellRenderer,
      filter: true,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 200,
    },
    {
      headerName: t('shop_name'),
      field: 'product__shop__title',
      cellRenderer: SellerNameCellRenderer,
      filter: true,
      sortable: false,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 200,
    },
    {
      headerName: t('orders'),
      field: 'orders_amount',
      cellRenderer: OrdersAmountTinyChartCellRenderer,
      sortable: false,
      minWidth: 400,
      filter: false,
      maxWidth: 600,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('available_amount'),
      field: 'available_amount',
      sortable: false,
      cellRenderer: AvailableAmountTinyChartCellRenderer,
      minWidth: 400,
      filter: false,
      maxWidth: 600,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('position_in_subcategory'),
      field: 'position_in_category',
      sortable: false,
      minWidth: 150,
      filter: false,
      maxWidth: 200,
      headerTooltip: t('tooltip.position_in_category'),
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      sortable: false,
      cellRenderer: PriceRenderer,
      minWidth: 150,
      filter: false,
      maxWidth: 200,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'reviews_amount',
      sortable: false,
      cellRenderer: ReviewsAmountTinyChartCellRenderer,
      minWidth: 150,
      filter: false,
      maxWidth: 200,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('rating'),
      field: 'rating',
      sortable: false,
      cellRenderer: RatingCellRenderer,
      filter: false,
      minWidth: 150,
      maxWidth: 150,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
  ];
};

export const getNewProductsColDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('id'),
      field: 'product__product_id',
      minWidth: 100,
      maxWidth: 100,
      filter: false,
      // pinned: 'left',
      sortable: false,
    },
    {
      headerName: t('image'),
      field: 'product__photos',
      sortable: false,
      cellRenderer: ProductImageCellRenderer,
      // pinned: 'left',
      minWidth: 150,
      filter: false,
      maxWidth: 150,
    },
    {
      headerName: t('product_name'),
      field: lang !== 'uz' ? 'product__title_ru' : 'product__title',
      // pinned: 'left',
      sortable: false,
      cellRenderer: ProductNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('category'),
      field:
        lang === 'uz'
          ? 'product__category__title'
          : 'product__category__title_ru',
      sortable: true,
      cellRenderer: CategoryNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 200,
    },
    {
      headerName: t('shop_name'),
      field: 'product__shop__title',
      sortable: true,
      cellRenderer: SellerNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 200,
    },
    {
      headerName: t('position_in_subcategory'),
      field: 'position_in_category',
      sortable: true,
      minWidth: 150,
      maxWidth: 200,
      filter: false,
      headerTooltip: t('tooltip.position_in_category'),
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('date_added'),
      field: 'product__created_at',
      sortable: true,
      cellRenderer: ProductDateCellRenderer,
      minWidth: 150,
      maxWidth: 200,
      filter: false,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('orders'),
      field: 'orders_amount',
      // cellRenderer: OrdersAmountTinyChartCellRenderer,
      sortable: true,
      minWidth: 150,
      filter: false,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('available_amount'),
      field: 'available_amount',
      sortable: true,
      filter: false,
      // cellRenderer: AvailableAmountTinyChartCellRenderer,
      minWidth: 150,
      maxWidth: 300,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      sortable: true,
      cellRenderer: PriceRenderer,
      minWidth: 150,
      filter: false,
      maxWidth: 200,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'reviews_amount',
      sortable: true,
      filter: false,
      minWidth: 150,
      maxWidth: 200,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('rating'),
      field: 'rating',
      sortable: true,
      filter: false,
      minWidth: 150,
      maxWidth: 150,
      cellStyle: {
        textAlign: 'center',
        // backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
  ];
};

export const getBannerProductsColDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('image'),
      field: 'product__photos',
      sortable: false,
      cellRenderer: ProductImageCellRenderer,
      pinned: 'left',
      minWidth: 150,
      filter: false,
      maxWidth: 200,
    },
    {
      headerName: t('product_name'),
      field: lang === 'uz' ? 'product__title' : 'product__title_ru',
      // pinned: 'left',
      sortable: false,
      cellRenderer: BannerProductNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('category'),
      field:
        lang === 'uz'
          ? 'product__category__title'
          : 'product__category__title_ru',
      sortable: true,
      cellRenderer: CategoryNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 200,
    },
    {
      headerName: t('shop_name'),
      field: 'product__shop__title',
      sortable: true,
      cellRenderer: SellerNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 150,
    },
    {
      headerName: t('banner_created'),
      field: 'first_date',
      cellRenderer: BannerDateCellRenderer,
      filter: false,
      maxWidth: 200,
      sortable: false,
    },
    {
      headerName: t('banner_ended'),
      field: 'last_date',
      cellRenderer: BannerDateCellRenderer,
      filter: false,
      maxWidth: 200,
      sortable: false,
    },
    {
      headerName: t('position_in_subcategory'),
      field: 'position_in_category',
      sortable: true,
      filter: false,
      maxWidth: 200,
      headerTooltip: t('tooltip.position_in_category'),
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },

    {
      headerName: t('orders'),
      field: 'orders_amount',
      sortable: true,
      maxWidth: 200,
      filter: false,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('revenue'),
      field: 'orders_money',
      sortable: true,
      maxWidth: 300,
      cellRenderer: RevenueCellRenderer,
      filter: false,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'reviews_amount',
      sortable: true,
      filter: false,
      maxWidth: 200,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      sortable: true,
      cellRenderer: PriceRenderer,
      filter: false,
      maxWidth: 200,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
  ];
};

export const SimilarProductsColDefs = [
  {
    headerName: 'ID',
    field: 'product_id',
    minWidth: 100,
    filter: false,
    maxWidth: 100,
    pinned: 'left',
    sortable: false,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
  },
  {
    headerName: 'Rasm',
    field: 'photos',
    sortable: false,
    cellRenderer: ProductImageCellRenderer,
    pinned: 'left',
    minWidth: 150,
    filter: false,
    maxWidth: 200,
  },
  {
    headerName: 'Nomi',
    field: 'title',
    // pinned: 'left',
    sortable: false,
    cellRenderer: ProductNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: 'Kategoriya',
    field: 'category',
    sortable: true,
    cellRenderer: CategoryNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: 'Sotuvchi',
    field: 'shop',
    sortable: true,
    cellRenderer: SellerNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: 'Kategoriyadagi pozitsiyasi',
    field: 'position_in_category',
    sortable: true,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    headerTooltip: "Mahsulotning o'z kategoriyasidagi pozitsiyasi.",
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },

  {
    headerName: 'Buyurtmalar soni',
    field: 'orders_amount',
    sortable: true,
    minWidth: 150,
    maxWidth: 200,
    filter: false,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Jami Daromad',
    field: 'orders_money',
    sortable: true,
    minWidth: 200,
    maxWidth: 300,
    cellRenderer: RevenueCellRenderer,
    filter: false,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Izohlar soni',
    field: 'reviews_amount',
    sortable: true,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Mavjud miqdori',
    field: 'available_amount',
    sortable: true,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: "O'rtacha Sotish narxi",
    field: 'average_purchase_price',
    sortable: true,
    cellRenderer: PriceRenderer,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Oxirgi aktiv sana',
    field: 'date_pretty',
    minWidth: 200,
    filter: false,
    maxWidth: 200,
    sortable: false,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
  },
];
export const getSimilarProductsColDefs = (t: any, lang: string) => [
  {
    headerName: t('id'),
    field: 'product_id',
    minWidth: 100,
    filter: false,
    maxWidth: 100,
    pinned: 'left',
    sortable: false,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
  },
  {
    headerName: t('image'),
    field: 'photos',
    sortable: false,
    cellRenderer: ProductImageCellRenderer,
    pinned: 'left',
    minWidth: 150,
    filter: false,
    maxWidth: 200,
  },
  {
    headerName: t('product_name'),
    field: lang === 'uz' ? 'title' : 'title_ru',
    // pinned: 'left',
    sortable: false,
    cellRenderer: ProductNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: t('category'),
    field: lang === 'uz' ? 'category' : 'category_ru',
    sortable: true,
    cellRenderer: CategoryNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: t('shop_name'),
    field: 'shop',
    sortable: true,
    cellRenderer: SellerNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: t('position_in_subcategory'),
    field: 'position_in_category',
    sortable: true,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    headerTooltip: "Mahsulotning o'z kategoriyasidagi pozitsiyasi.",
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },

  {
    headerName: t('orders'),
    field: 'orders_amount',
    sortable: true,
    minWidth: 150,
    maxWidth: 200,
    filter: false,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: t('revenue'),
    field: 'orders_money',
    sortable: true,
    minWidth: 200,
    maxWidth: 300,
    cellRenderer: RevenueCellRenderer,
    filter: false,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: t('reviews'),
    field: 'reviews_amount',
    sortable: true,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: t('available_amount'),
    field: 'available_amount',
    sortable: true,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: t('average_price'),
    field: 'average_purchase_price',
    sortable: true,
    cellRenderer: PriceRenderer,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: t('last_active_date'),
    field: 'date_pretty',
    minWidth: 200,
    filter: false,
    maxWidth: 200,
    sortable: false,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
  },
];

export const getCategoryProductsColDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('id'),
      field: 'product_id',
      minWidth: 150,
      filter: false,
      maxWidth: 200,
      sortable: false,
    },
    {
      headerName: t('image'),
      field: 'photos',
      cellRenderer: ProductImageCellRenderer,
      sortable: false,
      minWidth: 150,
      filter: false,
      maxWidth: 200,
    },
    {
      headerName: t('product_name'),
      field: lang === 'uz' ? 'title' : 'title_ru',
      cellRenderer: ProductNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('revenue'),
      field: 'latest_product_analytics_money',
      sortable: true,
      cellRenderer: RevenueCellRenderer,
      minWidth: 150,
      maxWidth: 200,
      filter: false,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('last_active_date'),
      field: 'latest_product_analytics_date',
      sortable: false,
      minWidth: 150,
      filter: false,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(43, 215, 229, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('orders'),
      field: 'latest_product_analytics_orders_amount',
      sortable: false,
      minWidth: 150,
      filter: false,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'latest_product_analytics_reviews_amount',
      sortable: false,
      filter: false,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('available_amount'),
      field: 'latest_product_analytics_available_amount',
      sortable: false,
      filter: false,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
  ];
};

export const CategoryProductsColDefs = [
  {
    headerName: 'Mahsulot ID',
    field: 'product_id',
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
    sortable: false,
  },
  {
    headerName: 'Rasm',
    field: 'photos',
    cellRenderer: ProductImageCellRenderer,
    sortable: false,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
  },
  {
    headerName: 'Nomi',
    field: 'title',
    cellRenderer: ProductNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: 'Daromad',
    field: 'latest_product_analytics_money',
    sortable: true,
    cellRenderer: RevenueCellRenderer,
    minWidth: 150,
    maxWidth: 200,
    filter: false,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: "So'ngi Aktiv sana",
    field: 'latest_product_analytics_date',
    sortable: false,
    minWidth: 150,
    filter: false,
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'buyurtmalar soni',
    field: 'latest_product_analytics_orders_amount',
    sortable: false,
    minWidth: 150,
    filter: false,
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Izohlar soni',
    field: 'latest_product_analytics_reviews_amount',
    sortable: false,
    filter: false,
    minWidth: 150,
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Mavjud miqdori',
    field: 'latest_product_analytics_available_amount',
    sortable: false,
    filter: false,
    minWidth: 150,
    headerTooltip: "So'ngi aktiv sanadagi mahsulotning mavjud miqdori.",
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
];

export const getCategoryProductTableColumnDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('id'),
      field: 'product_id',
      flex: 1,
      sortable: false,
      minWidth: 100,
      filter: false,
      maxWidth: 120,
      pinned: 'left',
    },
    {
      headerName: t('image'),
      field: 'photos',
      cellRenderer: ProductImageCellRenderer,
      sortable: false,
      minWidth: 150,
      filter: false,
      pinned: 'left',
      maxWidth: 200,
    },
    {
      headerName: t('product_name'),
      field: lang === 'uz' ? 'product_title' : 'product_title_ru',
      cellRenderer: ProductNameCellRenderer,
      filter: true,
      pinned: 'left',
      floatingFilter: true,
      filterParams: {
        alwaysShowBothConditions: true,
      },
      sortable: false,
      flex: 1,
      maxWidth: 500,
      minWidth: 200,
    },
    {
      headerName: t('category'),
      field: lang === 'uz' ? 'category_title' : 'category_title_ru',
      cellRenderer: SubcategoryCellRenderer,
      filter: true,
      sortable: false,
      floatingFilter: true,
      filterParams: {
        alwaysShowBothConditions: true,
      },
      flex: 1,
      maxWidth: 500,
      minWidth: 200,
      headerTooltip: 'Ushbu mahsulotning asosiy ichki kategoriyasi.',
    },
    {
      headerName: t('position_in_subcategory'),
      field: 'position_in_category',
      flex: 1,
      filter: false,
      minWidth: 150,
      headerTooltip: t('tooltip.position_in_category'),
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('shop_name'),
      field: 'shop_title',
      filter: true,
      sortable: false,
      floatingFilter: true,
      cellRenderer: SellerNameCellRenderer,
      filterParams: {
        alwaysShowBothConditions: true,
      },
      flex: 1,
      minWidth: 200,
    },
    {
      headerName: t('orders'),
      field: 'orders_amount',
      sortable: true,
      filter: false,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('revenue'),
      field: 'orders_money',
      cellRenderer: RevenueCellRenderer,
      sortable: true,
      filter: false,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('sku'),
      field: 'sku_analytics',
      cellRenderer: SkusCountCellRenderer,
      flex: 1,
      filter: false,
      sortable: false,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('average_price'),
      field: 'sku_analytics',
      cellRenderer: PurchasePriceCellRenderer,
      flex: 1,
      filter: false,
      sortable: false,
      minWidth: 200,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('full_price'),
      field: 'sku_analytics',
      filter: false,
      cellRenderer: FullPriceCellRenderer,
      flex: 1,
      sortable: false,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('promotion'),
      filter: false,
      field: 'badges',
      cellRenderer: BadgesCellRenderer,
      flex: 1,
      minWidth: 200,
      sortable: false,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('available_amount'),
      field: 'product_available_amount',
      sortable: true,
      filter: false,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'reviews_amount',
      filter: false,
      // filter: 'agNumberColumnFilter',
      // floatingFilter: true,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('rating'),
      field: 'rating',
      cellRenderer: RatingCellRenderer,
      sortable: false,
      flex: 1,
      filter: false,
      minWidth: 150,
      headerTooltip: 'Mahsulot reytingi.',
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
  ];
};

export const getShopProductTableColumnDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('id'),
      field: 'product_id',
      filter: false,
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: t('image'),
      field: 'photos',
      cellRenderer: ProductImageCellRenderer,
      sortable: false,
      minWidth: 150,
      filter: false,
      maxWidth: 200,
    },
    {
      headerName: t('product_name'),
      field: lang === 'uz' ? 'product_title' : 'product_title_ru',
      cellRenderer: ProductNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('category'),
      field: lang === 'uz' ? 'category_title' : 'category_title_ru',
      cellRenderer: SubcategoryCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('position_in_subcategory'),
      field: 'position_in_category',
      flex: 1,
      filter: false,
      minWidth: 150,
      headerTooltip: t('tooltip.position_in_category'),
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('orders'),
      field: 'orders_amount',
      sortable: true,
      filter: false,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('revenue'),
      field: 'orders_money',
      sortable: true,
      filter: false,
      cellRenderer: RevenueCellRenderer,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('sku'),
      field: 'sku_analytics',
      cellRenderer: SkusCountCellRenderer,
      flex: 1,
      filter: false,
      sortable: false,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('average_price'),
      field: 'sku_analytics',
      cellRenderer: PurchasePriceCellRenderer,
      flex: 1,
      sortable: false,
      filter: false,
      minWidth: 200,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('full_price'),
      field: 'sku_analytics',
      cellRenderer: FullPriceCellRenderer,
      flex: 1,
      filter: false,
      sortable: false,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('promotion'),
      field: 'badges',
      cellRenderer: BadgesCellRenderer,
      flex: 1,
      filter: false,
      minWidth: 200,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('available_amount'),
      field: 'product_available_amount',
      sortable: true,
      filter: false,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'reviews_amount',
      filter: false,
      // filter: 'agNumberColumnFilter',
      // floatingFilter: true,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('rating'),
      field: 'rating',
      cellRenderer: RatingCellRenderer,
      sortable: false,
      filter: false,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
  ];
};

export const getShopDailySaleColumnDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('id'),
      field: 'product__product_id',
      flex: 1,
      sortable: false,
      filter: false,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      headerName: t('image'),
      field: 'product__photos',
      cellRenderer: ProductImageCellRenderer,
      sortable: false,
      filter: false,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: t('product_name'),
      field: lang === 'uz' ? 'product__title' : 'product__title_ru',
      cellRenderer: ProductNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('category'),
      field:
        lang === 'uz'
          ? 'product__category__title'
          : 'product__category__title_ru',
      cellRenderer: SubcategoryCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: t('orders'),
      field: 'orders',
      cellRenderer: DailyOrdersCellRenderer,
      sortable: true,
      flex: 1,
      filter: false,
      minWidth: 150,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      filter: false,
      cellRenderer: PriceChangeCellRenderer,
      sortable: false,
      flex: 1,
      minWidth: 200,
      maxWidth: 400,
      headerTooltip:
        "Mahsulotning o'rtacha sotuv narxi. Bu narx ushbu mahsulotning barcha turlari narxlarini qo'shib turlari soniga bo'lib hisoblangan. Misol uchun, bir mahsulotning rangiga ko'ra 3 ta turlari mavjud bo'lsa, va ularning narxlari 1500, 2000, 3000 bo'lsa, ushbu mahsulotning o'rtacha sotuv narxi 2166 bo'ladi.",
    },
    {
      headerName: t('reviews'),
      field: 'reviews',
      filter: false,
      // filter: 'agNumberColumnFilter',
      // floatingFilter: true,
      flex: 1,
      minWidth: 150,
      headerTooltip: 'Mahsulot izohlarining umumiy soni.',
      cellRenderer: DailyOrdersCellRenderer,
    },
    {
      headerName: t('available_amount'),
      field: 'available_amount',
      // filter: 'agNumberColumnFilter',
      // floatingFilter: true,
      flex: 1,
      filter: false,
      minWidth: 150,
      headerTooltip: 'Mahsulot izohlarining umumiy soni.',
      cellRenderer: DailyOrdersCellRenderer,
    },
    {
      headerName: t('rating'),
      field: 'rating',
      // filter: 'agNumberColumnFilter',
      // floatingFilter: true,
      flex: 1,
      filter: false,
      minWidth: 150,
      headerTooltip: 'Mahsulot izohlarining umumiy soni.',
      cellRenderer: DailyRatingCellRenderer,
    },
    {
      headerName: t('position'),
      field: 'position',
      cellRenderer: DailyPositionCellRenderer,
      sortable: false,
      flex: 1,
      filter: false,
      minWidth: 150,
    },
    {
      headerName: t('position_in_subcategory'),
      field: 'position_in_category',
      cellRenderer: DailyPositionCellRenderer,
      sortable: false,
      filter: false,
      flex: 1,
      minWidth: 150,
      headerTooltip: t('tooltip.position_in_category'),
    },
    {
      headerName: t('position_in_shop'),
      field: 'position_in_shop',
      cellRenderer: DailyPositionCellRenderer,
      sortable: false,
      flex: 1,
      filter: false,
      minWidth: 150,
    },
  ];
};

export const getShopStoppedProductTableColumnDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('id'),
      field: 'product_id',
      flex: 1,
      minWidth: 150,
      filter: false,
    },
    {
      headerName: t('image'),
      field: 'photos',
      cellRenderer: ProductImageCellRenderer,
      sortable: false,
      filter: false,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: t('product_name'),
      field: lang === 'uz' ? 'title' : 'title_ru',
      cellRenderer: ProductNameCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('category'),
      field: lang === 'uz' ? 'category_title' : 'category_title_ru',
      cellRenderer: SubcategoryCellRenderer,
      filter: true,
      floatingFilter: true,
      flex: 1,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      headerName: t('last_active_date'),
      field: 'date_pretty',
      flex: 1,
      filter: false,
      minWidth: 200,
      headerTooltip: t('tooltip.last_active_date'),
      cellStyle: {
        textAlign: 'center',
        backgroundColor: '#f5f5f580',
      } as CellStyle,
    },
    {
      headerName: t('position_in_subcategory'),
      field: 'position_in_category',
      floatingFilter: true,
      filter: 'agNumberColumnFilter',
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('revenue'),
      field: 'orders_money',
      sortable: true,
      flex: 1,
      minWidth: 150,
      filter: false,
      cellRenderer: RevenueCellRenderer,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('orders'),
      field: 'orders_amount',
      sortable: true,
      flex: 1,
      minWidth: 150,
      filter: false,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('average_price'),
      field: 'avg_purchase_price',
      cellRenderer: TrendPriceCellRenderer,
      flex: 1,
      filter: false,
      sortable: false,
      minWidth: 200,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('full_price'),
      field: 'avg_full_price',
      cellRenderer: TrendPriceCellRenderer,
      flex: 1,
      sortable: false,
      filter: false,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('available_amount'),
      field: 'available_amount',
      sortable: true,
      flex: 1,
      filter: false,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'reviews_amount',
      // filter: 'agNumberColumnFilter',
      // floatingFilter: true,
      flex: 1,
      minWidth: 150,
      filter: false,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('rating'),
      field: 'rating',
      cellRenderer: RatingCellRenderer,
      sortable: false,
      filter: false,
      flex: 1,
      minWidth: 150,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
  ];
};

export const getCategoryTrendstableColumnDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('date'),
      field: 'date_pretty',
      sortable: false,
      filter: false,
      minWidth: 120,
      maxWidth: 120,
      cellStyle: {
        backgroundColor: 'rgba(239, 231, 235)',
      } as CellStyle,
    },
    {
      headerName: t('products_count'),
      field: 'total_products',
      flex: 1,
      minWidth: 100,
      filter: false,
      sortable: false,
    },
    {
      headerName: t('shops_count'),
      field: 'total_shops',
      flex: 1,
      minWidth: 100,
      sortable: false,
      filter: false,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('orders'),
      field: 'total_orders',
      flex: 1,
      filter: false,
      minWidth: 100,
      sortable: false,
      headerTooltip: 'Ushbu sanagacha kategoriyada berilgan buyurtmalar soni.',
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('revenue'),
      field: 'total_orders_amount',
      cellRenderer: RevenueCellRenderer,
      flex: 1,
      filter: false,
      minWidth: 150,
      sortable: false,
      headerTooltip: 'Ushbu sanagacha kategoriyadagi jami daromad.',
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'total_reviews',
      flex: 1,
      filter: false,
      minWidth: 100,
      sortable: false,
    },
    {
      headerName: t('active_products_amount'),
      field: 'total_products_with_sales',
      flex: 1,
      minWidth: 100,
      filter: false,
      sortable: false,
      headerTooltip: t('tooltip.active_products_amount'),
    },
    {
      headerName: t('active_shops_count'),
      field: 'total_shops_with_sales',
      flex: 1,
      minWidth: 100,
      filter: false,
      sortable: false,
      headerTooltip: t('tooltip.active_shops_count'),
    },
    {
      headerName: t('average_rating'),
      field: 'average_product_rating',
      flex: 1,
      filter: false,
      minWidth: 100,
      sortable: false,
      cellRenderer: RatingCellRenderer,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      cellRenderer: TrendPriceCellRenderer,
      flex: 1,
      filter: false,
      minWidth: 100,
      sortable: false,
    },
  ];
};

// export const CategoryTrendstableColumnDefs =
export const getSegmentationTableColumnDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('from'),
      field: 'from',
      cellRenderer: TrendPriceCellRenderer,
      sortable: true,
      minWidth: 100,
      filter: false,
      pinned: 'left',
      maxWidth: 200,
      cellStyle: {
        // backgroundColor: 'rgba(46, 139, 87, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('to'),
      field: 'to',
      filter: false,
      cellRenderer: TrendPriceCellRenderer,
      sortable: false,
      minWidth: 100,
      pinned: 'left',
      maxWidth: 200,
      cellStyle: {
        // backgroundColor: 'rgba(46, 139, 87, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('revenue'),
      field: 'total_revenue',
      cellRenderer: RevenueCellRenderer,
      flex: 1,
      filter: false,
      minWidth: 150,
      sortable: true,
    },
    {
      headerName: t('products_count'),
      field: 'total_products',
      flex: 1,
      filter: false,
      minWidth: 100,
      sortable: true,
    },
    {
      headerName: t('shops_count'),
      field: 'total_shops',
      flex: 1,
      minWidth: 100,
      filter: false,
      sortable: true,
      cellStyle: {} as CellStyle,
    },
    {
      headerName: t('orders'),
      field: 'total_orders',
      flex: 1,
      cellRenderer: LocaleNumberCellRenderer,
      minWidth: 100,
      filter: false,
      sortable: true,
      cellStyle: {} as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'total_reviews',
      flex: 1,
      cellRenderer: LocaleNumberCellRenderer,
      filter: false,
      minWidth: 100,
      sortable: true,
    },
  ];
};

export const getCategoryShopsTableColumnDefs = (t: any) => {
  return [
    {
      headerName: t('shop_name'),
      field: 'title',
      cellRenderer: SellerNameCellRenderer,
      sortable: false,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      minWidth: 300,
      // pinned: 'left',
      maxWidth: 400,
      cellStyle: {
        // backgroundColor: 'rgba(46, 139, 87, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('position'),
      field: 'position',
      sortable: false,
      minWidth: 200,
      filter: false,
      maxWidth: 500,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
      headerClass: 'bg-purple-100',
    },
    {
      headerName: t('products_count'),
      field: 'total_products',
      flex: 1,
      minWidth: 100,
      filter: false,
      sortable: true,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
      headerClass: 'bg-purple-100',
    },

    {
      headerName: t('orders'),
      field: 'total_orders',
      flex: 1,
      filter: false,
      minWidth: 100,
      sortable: true,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
      headerClass: 'bg-purple-100',
      headerTooltip: 'Ushbu kategoriyadagi buyurtmalar soni.',
    },
    {
      headerName: t('reviews'),
      field: 'total_reviews',
      flex: 1,
      minWidth: 100,
      filter: false,
      sortable: true,
    },
    {
      headerName: t('revenue'),
      field: 'total_revenue',
      cellRenderer: RevenueCellRenderer,
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: false,
      headerTooltip: t('tooltip.revenue_in_category'),
    },
    {
      headerName: t('average_rating'),
      field: 'average_product_rating',
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: false,
      cellRenderer: RatingCellRenderer,
    },
    {
      headerName: t('average_price'),
      field: 'avg_purchase_price',
      cellRenderer: TrendPriceCellRenderer,
      flex: 1,
      minWidth: 200,
      sortable: true,
      filter: false,
      headerTooltip: t('tooltip.average_price_in_category'),
    },
  ];
};

export const getSubcategoriesTableColumnDefs = (t: any, lang: string) => {
  return [
    {
      headerName: t('date'),
      field: 'date_pretty',
      sortable: false,
      minWidth: 150,
      maxWidth: 200,
      filter: false,
      pinned: 'left',
      cellStyle: {
        backgroundColor: 'rgba(46, 139, 87, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('category'),
      field: 'category_title',
      cellRenderer: SubcategoryCellRenderer,
      sortable: false,
      minWidth: 200,
      maxWidth: 500,
      cellStyle: {
        // backgroundColor: '#efefef80',
      } as CellStyle,
    },
    {
      headerName: t('products_count'),
      field: 'total_products',
      flex: 1,
      minWidth: 100,
      filter: false,
    },
    {
      headerName: t('shops_count'),
      field: 'total_shops',
      flex: 1,
      filter: false,
      minWidth: 100,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('orders'),
      field: 'total_orders',
      flex: 1,
      filter: false,
      minWidth: 100,
      headerTooltip: 'Ushbu sanagacha kategoriyada berilgan buyurtmalar soni.',
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('revenue'),
      field: 'total_orders_amount',
      cellRenderer: RevenueCellRenderer,
      flex: 1,
      filter: false,
      minWidth: 100,
      headerTooltip: 'Ushbu sanagacha kategoriyadagi jami daromad.',
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'total_reviews',
      flex: 1,
      filter: false,
      minWidth: 100,
    },
    {
      headerName: t('active_products_amount'),
      field: 'total_products_with_sales',
      flex: 1,
      minWidth: 100,
      filter: false,
      headerTooltip: t('tooltip.active_products_amount'),
    },
    {
      headerName: t('active_shops_count'),
      field: 'total_shops_with_sales',
      flex: 1,
      filter: false,
      minWidth: 100,
      headerTooltip: t('tooltip.active_shops_count'),
    },
    {
      headerName: t('average_rating'),
      field: 'average_product_rating',
      flex: 1,
      filter: false,
      minWidth: 100,
      cellRenderer: RatingCellRenderer,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      cellRenderer: TrendPriceCellRenderer,
      flex: 1,
      minWidth: 100,
      filter: false,
    },
  ];
};

export const getShopOverallColumnDefs = (t: any) => {
  return [
    {
      headerName: t('date'),
      field: 'date_pretty',
      sortable: false,
      minWidth: 150,
      filter: false,
      cellStyle: {
        // backgroundColor: '',
      } as CellStyle,
    },
    {
      headerName: t('orders'),

      field: 'total_orders',
      sortable: false,
      cellRenderer: LocaleNumberCellRenderer,
      minWidth: 150,
      filter: false,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
      headerClass: 'bg-purple-100',
    },
    {
      headerName: t('revenue'),
      field: 'total_revenue',
      sortable: true,
      filter: false,
      cellRenderer: RevenueCellRenderer,
      flex: 1,
      minWidth: 200,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
        textAlign: 'center',
      } as CellStyle,
      headerClass: 'bg-purple-100',
    },
    {
      headerName: t('products_count'),
      field: 'total_products',
      sortable: false,
      filter: false,
      cellRenderer: LocaleNumberCellRenderer,
      minWidth: 150,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
      } as CellStyle,
      headerClass: 'bg-purple-100',
    },
    {
      headerName: t('categories_count'),
      field: 'category_count',
      sortable: false,
      filter: false,
      cellRenderer: LocaleNumberCellRenderer,
      minWidth: 150,
      headerTooltip: t('tooltip.categories_count'),
      cellStyle: {} as CellStyle,
    },
    {
      headerName: t('reviews'),
      field: 'total_reviews',
      sortable: false,
      filter: false,
      cellRenderer: LocaleNumberCellRenderer,
      minWidth: 150,
      cellStyle: {} as CellStyle,
    },
    {
      headerName: t('rating'),
      field: 'rating',
      sortable: false,
      filter: false,
      minWidth: 150,
      headerTooltip: t('tooltip.rating'),
      cellStyle: {} as CellStyle,
      cellRenderer: RatingCellRenderer,
    },
    {
      headerName: t('average_price'),
      field: 'average_purchase_price',
      cellRenderer: TrendPriceCellRenderer,
      sortable: false,
      filter: false,
      minWidth: 150,
      headerTooltip: t('tooltip.average_price'),
      cellStyle: {} as CellStyle,
    },
  ];
};

export const getShopTableColumnDefs = (t: any) => {
  return [
    {
      headerName: t('position'),
      field: 'position',
      sortable: true,
      filter: false,
      maxWidth: 200,
      cellStyle: {
        textAlign: 'center',
      } as CellStyle,
    },
    {
      headerName: t('shop_name'),
      field: 'shop_title',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: false,
      cellRenderer: SellerNameCellRenderer,
      flex: 1,
      minWidth: 220,
      maxWidth: 400,
    },

    {
      headerName: t('orders'),
      field: 'total_orders',
      sortable: true,
      filter: false,
      cellRenderer: LocaleNumberCellRenderer,

      flex: 1,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
        textAlign: 'center',
      } as CellStyle,
      headerClass: 'bg-purple-100',
    },

    {
      headerName: t('revenue'),
      field: 'total_revenue',
      sortable: true,
      filter: false,
      cellRenderer: RevenueCellRenderer,

      flex: 1,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
        textAlign: 'center',
      } as CellStyle,
      headerClass: 'bg-purple-100',
    },
    {
      headerName: t('products_count'),
      field: 'total_products',
      cellRenderer: LocaleNumberCellRenderer,
      sortable: true,
      filter: false,
      flex: 1,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
        textAlign: 'center',
      } as CellStyle,
      headerClass: 'bg-purple-100',
    },
    {
      headerName: t('categories_count'),
      field: 'num_categories',
      cellRenderer: LocaleNumberCellRenderer,
      sortable: true,
      filter: false,
      flex: 1,
      cellStyle: {
        backgroundColor: 'rgba(119, 67, 219, 0.1)',
        textAlign: 'center',
      } as CellStyle,
      headerClass: 'bg-purple-100',
      headerTooltip: t('tooltip.categories_count'),
    },
    {
      headerName: t('rating'),
      field: 'rating',
      filter: false,
      cellRenderer: RatingCellRenderer,
      flex: 1,
    },
    {
      headerName: t('reviews'),
      field: 'total_reviews',
      cellRenderer: LocaleNumberCellRenderer,
      filter: false,
      sortable: true,
      flex: 1,
    },
  ];
};

export const shopProductsTableColumnDefs = [
  {
    headerName: 'Photo',
    field: 'photo',
    cellRendererFramework: ProductImageCellRenderer,
    sortable: false,
    filter: false,
    minWidth: 50,
    maxWidth: 100,
  },
  {
    headerName: 'Name',
    field: 'name',
    cellRendererFramework: ProductNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Category',
    field: 'category',
    filter: true,
    cellRendererFramework: CategoryNameCellRenderer,
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Position',
    field: 'position',
    flex: 1,
    minWidth: 150,
    filter: false,
    headerTooltip: 'Position of the product in the category',
    cellStyle: function (_: unknown) {
      return { backgroundColor: 'yellow' }; // make the cell's background yellow
    },
  },
  {
    headerName: 'Characteristics',
    field: 'characteristics',
    // cellRendererFramework: TypesCellRenderer,
    flex: 1,
    minWidth: 200,
    filter: false,
  },
  {
    headerName: 'Available Amount',
    field: 'availableAmount',
    filter: false,
    flex: 1,
    minWidth: 150,
    tooltipField: 'availableAmount',
  },
  {
    headerName: 'Current Price',
    field: 'currentPrice',
    filter: false,
    flex: 1,
  },
  {
    headerName: 'Min Price',
    field: 'minPrice',
    filter: false,
    flex: 1,
  },
  {
    headerName: 'Max Price',
    field: 'maxPrice',
    filter: false,
    flex: 1,
  },
];

export const shopCompetitorsTableColumnDefs = [
  {
    headerName: 'Avatar',
    field: 'avatar',
    cellRendererFramework: AvatarCellRenderer,
    sortable: false,
    minWidth: 50,
    filter: false,
    maxWidth: 100,
  },
  {
    headerName: 'Name',

    field: 'name',
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Description',
    field: 'description',
    filter: false,
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Products Count',
    field: 'productsCount',
    filter: false,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Rating',
    field: 'rating',
    filter: false,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Reviews',
    field: 'reviews',
    filter: false,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Orders',
    field: 'orders',
    filter: false,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Average Price',
    field: 'averagePrice',
    filter: false,
    flex: 1,
    minWidth: 200,
  },
];
