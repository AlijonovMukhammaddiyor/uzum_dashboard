/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellStyle } from 'ag-grid-community';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { HiMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { Carousel } from 'react-responsive-carousel';
import Popup from 'reactjs-popup';

import clsxm from '@/lib/clsxm';

import TinyColumnGraph from '@/components/shared/TinyColumnGraph';

import { useContextState } from '@/context/Context';

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
  const { dispatch } = useContextState();
  if (!value) return '';

  // replace / with dash
  const title = value?.split('((')[0];
  // const product_title = value
  //   ?.split('((')[0]
  //   .replace(/\//g, '-')
  //   .replace(/ /g, '-');
  const product_id = value?.split('((')[1]?.split('))')[0];
  return (
    <Link
      href={`/products/${product_id}`}
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });
      }}
    >
      <p className='text-blue-500 hover:underline'>{title}</p>
    </Link>
  );
};

const SubcategoryCellRenderer = ({ value }: { value: string }) => {
  const { dispatch } = useContextState();
  if (!value) return '';

  const title = value?.split('((')[0].trim();
  const category_id = value?.split('((')[1]?.split('))')[0];

  return (
    <Link
      href={`/category/${title}--${category_id}`}
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });
      }}
    >
      <p className='text-blue-500 hover:underline'>{title}</p>
    </Link>
  );
};

const CategoryNameCellRenderer = ({ value }: { value: string }) => {
  const { dispatch } = useContextState();

  if (!value) return '';

  const title = value?.split('((')[0].trim();
  const category_id = value?.split('((')[1]?.trim().split('))')[0];

  return (
    <Link
      href={`/category/${title}--${category_id}`}
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });
      }}
    >
      <p className='text-blue-500 hover:underline'>{title}</p>
    </Link>
  );
};

const SellerNameCellRenderer = ({ value }: { value: string }) => {
  const { dispatch } = useContextState();
  // get seller link from value = "title (link)""
  if (!value) return '';
  // try{
  const seller_link = value?.split('((')[1]?.trim().split('))')[0];
  const seller_title = value?.split('((')[0].trim();

  if (!seller_link || !seller_title)
    return <p className='text-black'>{seller_title}</p>;

  return (
    <Link
      href={`/sellers/${seller_link}`}
      onClick={() => {
        dispatch({
          type: 'PATH',
          payload: {
            path: null,
          },
        });
      }}
    >
      <p className='text-blue-500 hover:underline'>{seller_title}</p>
    </Link>
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
  if (date.getTime() < 1684540800000) return '';

  return (
    <div className='flex items-center justify-center'>
      <p className='text-center'>
        {date.toISOString().split('T')[0].split('-').reverse().join('/')}
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
        bgColor='rgba(70, 130, 180, 1)'
        borderColor='rgba(70, 130, 180, 1)'
        width='300px'
      />
    </div>
  );
};

export const GrowingCategoriesColDefs = [
  {
    headerName: 'Kategoriya',
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
    headerName: 'Kunlik buyurtmalar soni',
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
    headerName: 'Mahsulotlar soni',
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
    headerName: 'Sotuvchilar soni',
    field: 'total_shops',
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
  // {
  //   headerName: 'Kunlik Faol sotuvchilar soni',
  //   field: 'total_shop_with_sales',
  //   sortable: true,
  //   cellRenderer: WithSalesTinyChartCellRenderer,
  //   minWidth: 350,
  //   maxWidth: 500,
  //   cellStyle: {
  //     textAlign: 'center',
  //     // backgroundColor: 'rgba(43, 215, 229, 0.1)',
  //   } as CellStyle,
  // },
  // {
  //   headerName: 'Kunlik Faol mahsulotlar soni',
  //   field: 'total_products_with_sales',
  //   sortable: true,
  //   cellRenderer: WithSalesTinyChartCellRenderer,
  //   minWidth: 350,
  //   maxWidth: 500,
  //   cellStyle: {
  //     textAlign: 'center',
  //     // backgroundColor: 'rgba(43, 215, 229, 0.1)',
  //   } as CellStyle,
  // },
  {
    headerName: "O'rtacha Sotish narxi",
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
    headerName: 'Jami izohlar soni',
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
    headerName: 'Reyting',
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

export const GrowingProductsColDefs = [
  {
    headerName: 'ID',
    field: 'product_id',
    minWidth: 100,
    maxWidth: 100,
    // pinned: 'left',
    filter: false,
    sortable: false,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
    cellStyle: {
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  {
    headerName: 'Rasm',
    field: 'photos',
    sortable: false,
    cellRenderer: ProductImageCellRenderer,
    // pinned: 'left',
    minWidth: 150,
    filter: false,
    maxWidth: 150,
  },
  {
    headerName: 'Nomi',
    field: 'product__title',
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
    field: 'product__category__title',
    sortable: true,
    cellRenderer: CategoryNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 200,
  },
  {
    headerName: 'Sotuvchi',
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
    headerName: 'Kunlik buyurtmalar',
    field: 'orders',
    cellRenderer: OrdersAmountTinyChartCellRenderer,
    sortable: true,
    minWidth: 400,
    filter: false,
    maxWidth: 600,
    cellStyle: {
      textAlign: 'center',
      // backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Mavjud miqdori',
    field: 'available_amount',
    sortable: true,
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
    headerName: 'Kategoriyadagi pozitsiyasi',
    field: 'position_in_category',
    sortable: true,
    minWidth: 150,
    filter: false,
    maxWidth: 200,
    headerTooltip: "Mahsulotning o'z kategoriyasidagi pozitsiyasi.",
  },
  // {
  //   headerName: "Qo'shilgan sana",
  //   field: 'created_at',
  //   sortable: true,
  //   cellRenderer: ProductDateCellRenderer,
  //   minWidth: 150,
  //   filter: false,
  //   maxWidth: 200,
  //   cellStyle: {
  //     textAlign: 'center',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: 'rgba(43, 215, 229, 0.1)',
  //   } as CellStyle,
  // },

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
      // backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Jami izohlar soni',
    field: 'reviews',
    sortable: true,
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
    headerName: 'Reyting',
    field: 'rating',
    sortable: true,
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

export const NewProductsColDefs = [
  {
    headerName: 'ID',
    field: 'product__product_id',
    minWidth: 100,
    maxWidth: 100,
    filter: false,
    // pinned: 'left',
    sortable: false,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
  },
  {
    headerName: 'Rasm',
    field: 'product__photos',
    sortable: false,
    cellRenderer: ProductImageCellRenderer,
    // pinned: 'left',
    minWidth: 150,
    filter: false,
    maxWidth: 150,
  },
  {
    headerName: 'Nomi',
    field: 'product__title',
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
    field: 'product__category__title',
    sortable: true,
    cellRenderer: CategoryNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 200,
  },
  {
    headerName: 'Sotuvchi',
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
    headerName: 'Kategoriyadagi pozitsiyasi',
    field: 'position_in_category',
    sortable: true,
    minWidth: 150,
    maxWidth: 200,
    filter: false,
    headerTooltip: "Mahsulotning o'z kategoriyasidagi pozitsiyasi.",
    cellStyle: {
      textAlign: 'center',
      // backgroundColor: 'rgba(43, 215, 229, 0.1)',
    } as CellStyle,
  },
  {
    headerName: "Qo'shilgan sana",
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
    headerName: 'Buyurtmalar',
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
    headerName: 'Mavjud miqdori',
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
    headerName: "O'rtacha Sotish narxi",
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
    headerName: 'Izohlar soni',
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
    headerName: 'Reyting',
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
    headerName: "Qo'shilgan sana",
    field: 'created_at',
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

export const CategoryProductTableColumnDefs = [
  {
    headerName: 'ID',
    field: 'product_id',
    flex: 1,
    sortable: false,
    minWidth: 100,
    filter: false,
    maxWidth: 120,
    pinned: 'left',
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
  },
  {
    headerName: 'Rasm',
    field: 'photos',
    cellRenderer: ProductImageCellRenderer,
    sortable: false,
    minWidth: 150,
    filter: false,
    pinned: 'left',
    maxWidth: 200,
  },
  {
    headerName: 'Nomi',
    field: 'product_title',
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
    minWidth: 400,
  },
  {
    headerName: 'Ichki kategoriyasi',
    field: 'category_title',
    cellRenderer: SubcategoryCellRenderer,
    filter: true,
    sortable: false,
    floatingFilter: true,
    filterParams: {
      alwaysShowBothConditions: true,
    },
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
    headerTooltip: 'Ushbu mahsulotning asosiy ichki kategoriyasi.',
  },
  {
    headerName: 'Pozitsiya',
    field: 'position_in_category',
    // floatingFilter: true,
    // filter: 'agNumberColumnFilter',
    flex: 1,
    filter: false,
    minWidth: 150,
    headerTooltip: 'Ichki kategoriyadagi pozitsiyasi.',
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Sotuvchi',
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
    tooltipField: 'Sotuvchi nomi',
  },
  {
    headerName: 'Sotuv miqdori',
    field: 'orders_amount',
    sortable: true,
    filter: false,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulotning shu kungacha sotilgan miqdori.',
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: `Turlari soni`,
    field: 'sku_analytics',
    cellRenderer: SkusCountCellRenderer,
    flex: 1,
    filter: false,
    sortable: false,
    minWidth: 150,
    headerTooltip:
      'Ushbu mahsulot turlarining soni. Misol uchun, rangi, hajmi, modeli, va hokazo.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: `O'rtacha Sotuv Narxi`,
    field: 'sku_analytics',
    cellRenderer: PurchasePriceCellRenderer,
    flex: 1,
    filter: false,
    sortable: false,
    minWidth: 200,
    headerTooltip: "Ushbu mahsulot turlarining o'rtacha sotuv narxi.",
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Haqiqiy Narxi',
    field: 'sku_analytics',
    filter: false,
    cellRenderer: FullPriceCellRenderer,
    flex: 1,
    sortable: false,
    minWidth: 150,
    headerTooltip: `Ushbu mahsulot turlarining o'rtacha haqiqiy narxi.`,
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Aksiya',
    filter: false,
    field: 'badges',
    cellRenderer: BadgesCellRenderer,
    flex: 1,
    minWidth: 200,
    sortable: false,
    headerTooltip: 'Ushbu mahsulot uchun mavjud aksiyalar.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Mavjud miqdori',
    field: 'product_available_amount',
    sortable: true,
    filter: false,
    flex: 1,
    minWidth: 150,
    headerTooltip: "Mahsulotning hozirda mavjud bo'lgan miqdori.",
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Izohlar soni',
    field: 'reviews_amount',
    filter: false,
    // filter: 'agNumberColumnFilter',
    // floatingFilter: true,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulot izohlarining umumiy soni.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Reyting',
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

export const ShopProductTableColumnDefs = [
  {
    headerName: 'Mahsulot ID',
    field: 'product_id',
    filter: false,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
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
    field: 'product_title',
    cellRenderer: ProductNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: 'Kategoriya',
    field: 'category_title',
    cellRenderer: SubcategoryCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
    headerTooltip: 'Ushbu mahsulotning asosiy ichki kategoriyasi.',
  },
  {
    headerName: 'Pozitsiya',
    field: 'position_in_category',
    flex: 1,
    filter: false,
    minWidth: 150,
    headerTooltip: 'Ichki kategoriyadagi pozitsiyasi.',
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Sotuv miqdori',
    field: 'orders_amount',
    sortable: true,
    filter: false,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulotning shu kungacha sotilgan miqdori.',
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: `Turlari soni`,
    field: 'sku_analytics',
    cellRenderer: SkusCountCellRenderer,
    flex: 1,
    filter: false,
    sortable: false,
    minWidth: 150,
    headerTooltip:
      'Ushbu mahsulot turlarining soni. Misol uchun, rangi, hajmi, modeli, va hokazo.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: `O'rtacha Sotuv Narxi`,
    field: 'sku_analytics',
    cellRenderer: PurchasePriceCellRenderer,
    flex: 1,
    sortable: false,
    filter: false,
    minWidth: 200,
    headerTooltip: "Ushbu mahsulot turlarining o'rtacha sotuv narxi.",
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Haqiqiy Narxi',
    field: 'sku_analytics',
    cellRenderer: FullPriceCellRenderer,
    flex: 1,
    filter: false,
    sortable: false,
    minWidth: 150,
    headerTooltip: `Ushbu mahsulot turlarining o'rtacha haqiqiy narxi.`,
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Aksiya',
    field: 'badges',
    cellRenderer: BadgesCellRenderer,
    flex: 1,
    filter: false,
    minWidth: 200,
    headerTooltip: 'Ushbu mahsulot uchun mavjud aksiyalar.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Mavjud miqdori',
    field: 'product_available_amount',
    sortable: true,
    filter: false,
    flex: 1,
    minWidth: 150,
    headerTooltip: "Mahsulotning hozirda mavjud bo'lgan miqdori.",
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Izohlar soni',
    field: 'reviews_amount',
    filter: false,
    // filter: 'agNumberColumnFilter',
    // floatingFilter: true,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulot izohlarining umumiy soni.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Reyting',
    field: 'rating',
    cellRenderer: RatingCellRenderer,
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulot reytingi.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
];

export const ShopDailySaleColumnDefs = [
  {
    headerName: 'Mahsulot ID',
    field: 'product__product_id',
    flex: 1,
    sortable: false,
    filter: false,
    minWidth: 150,
    maxWidth: 150,
  },
  {
    headerName: 'Rasm',
    field: 'product__photos',
    cellRenderer: ProductImageCellRenderer,
    sortable: false,
    filter: false,
    minWidth: 150,
    maxWidth: 200,
  },
  {
    headerName: 'Nomi',
    field: 'product__title',
    cellRenderer: ProductNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: 'Kategoriya',
    field: 'product__category__title',
    cellRenderer: SubcategoryCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 150,
    maxWidth: 300,
  },
  {
    headerName: 'Sotuv miqdori',
    field: 'orders',
    cellRenderer: DailyOrdersCellRenderer,
    sortable: true,
    flex: 1,
    filter: false,
    minWidth: 150,
    headerTooltip: 'Mahsulotning shu kuni sotilgan miqdori.',
  },
  {
    headerName: "O'rtacha sotuv narxi",
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
    headerName: 'Izohlar soni',
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
    headerName: 'Mavjud soni',
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
    headerName: 'Reyting',
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
    headerName: 'Pozitsiya',
    field: 'position',
    cellRenderer: DailyPositionCellRenderer,
    sortable: false,
    flex: 1,
    filter: false,
    minWidth: 150,
    headerTooltip: 'Mahsulotning uzumdagi pozitsiyasi.',
  },
  {
    headerName: 'Kategoriyadagi Pozitsiya',
    field: 'position_in_category',
    cellRenderer: DailyPositionCellRenderer,
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulotning kategoriyadagi pozitsiyasi.',
  },
  {
    headerName: "Do'kondagi Pozitsiya",
    field: 'position_in_shop',
    cellRenderer: DailyPositionCellRenderer,
    sortable: false,
    flex: 1,
    filter: false,
    minWidth: 150,
    headerTooltip: "Mahsulotning do'kondagi pozitsiyasi.",
  },
];

export const ShopStoppedProductTableColumnDefs = [
  {
    headerName: 'Mahsulot ID',
    field: 'product_id',
    flex: 1,
    minWidth: 150,
    filter: false,
    headerTooltip: 'Ushbu mahsulotning ID raqami.',
  },
  {
    headerName: 'Rasm',
    field: 'photos',
    cellRenderer: ProductImageCellRenderer,
    sortable: false,
    filter: false,
    minWidth: 150,
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
    headerName: 'Kategoriya',
    field: 'category_title',
    cellRenderer: SubcategoryCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
    headerTooltip: 'Ushbu mahsulotning asosiy ichki kategoriyasi.',
  },
  {
    headerName: 'Oxirgi Sotuv sanasi',
    field: 'date_pretty',
    flex: 1,
    filter: false,
    minWidth: 200,
    headerTooltip: 'Ushbu mahsulot oxirgi marta sotilgan sanasi.',
    cellStyle: {
      textAlign: 'center',
      backgroundColor: '#f5f5f580',
    } as CellStyle,
  },
  {
    headerName: 'Pozitsiya',
    field: 'position_in_category',
    floatingFilter: true,
    filter: 'agNumberColumnFilter',
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Kategoriyadagi pozitsiyasi.',
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Sotuv miqdori',
    field: 'orders_amount',
    sortable: true,
    flex: 1,
    minWidth: 150,
    filter: false,
    headerTooltip: 'Mahsulotning shu kungacha sotilgan miqdori.',
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: `O'rtacha Sotuv Narxi`,
    field: 'avg_purchase_price',
    cellRenderer: TrendPriceCellRenderer,
    flex: 1,
    filter: false,
    sortable: false,
    minWidth: 200,
    headerTooltip: "Ushbu mahsulot turlarining o'rtacha sotuv narxi.",
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Haqiqiy Narxi',
    field: 'avg_full_price',
    cellRenderer: TrendPriceCellRenderer,
    flex: 1,
    sortable: false,
    filter: false,
    minWidth: 150,
    headerTooltip: `Ushbu mahsulot turlarining o'rtacha haqiqiy narxi.`,
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Mavjud miqdori',
    field: 'available_amount',
    sortable: true,
    flex: 1,
    filter: false,
    minWidth: 150,
    headerTooltip: "Mahsulotning hozirda mavjud bo'lgan miqdori.",
    cellStyle: {
      textAlign: 'center',
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Izohlar soni',
    field: 'reviews_amount',
    // filter: 'agNumberColumnFilter',
    // floatingFilter: true,
    flex: 1,
    minWidth: 150,
    filter: false,
    headerTooltip: 'Mahsulot izohlarining umumiy soni.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Reyting',
    field: 'rating',
    cellRenderer: RatingCellRenderer,
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulot reytingi.',
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
];

export const CategoryTrendstableColumnDefs = [
  {
    headerName: 'Sana',
    field: 'date_pretty',
    sortable: false,
    filter: false,
    minWidth: 100,
    pinned: 'left',
    maxWidth: 200,
    cellStyle: {
      backgroundColor: 'rgba(46, 139, 87, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Mahsulotlar soni',
    field: 'total_products',
    flex: 1,
    minWidth: 100,
    filter: false,
    sortable: false,
  },
  {
    headerName: 'Sotuvchilar soni',
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
    headerName: 'Buyurtmalar soni',
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
    headerName: 'Izohlar soni',
    field: 'total_reviews',
    flex: 1,
    filter: false,
    minWidth: 100,
    sortable: false,
  },
  {
    headerName: 'Faol Mahsulotlar soni',
    field: 'total_products_with_sales',
    flex: 1,
    minWidth: 100,
    filter: false,
    sortable: false,
    headerTooltip: "Kecha sotuvlari bo'lgan mahsulotlar soni.",
  },
  {
    headerName: 'Faol Sotuvchilar soni',
    field: 'total_shops_with_sales',
    flex: 1,
    minWidth: 100,
    filter: false,
    sortable: false,
    headerTooltip: "Kecha sotuvlari bo'lgan sotuvchilar soni.",
  },
  {
    headerName: "O'rtacha reytingi",
    field: 'average_product_rating',
    flex: 1,
    filter: false,
    minWidth: 100,
    sortable: false,
    cellRenderer: RatingCellRenderer,
  },
  {
    headerName: "O'rtacha narx",
    field: 'average_purchase_price',
    cellRenderer: TrendPriceCellRenderer,
    flex: 1,
    filter: false,
    minWidth: 100,
    sortable: false,
  },
];

export const SegmentationTableColumnDefs = [
  {
    headerName: 'Dan',
    field: 'from',
    cellRenderer: TrendPriceCellRenderer,
    sortable: true,
    minWidth: 100,
    filter: false,
    pinned: 'left',
    maxWidth: 200,
    cellStyle: {
      backgroundColor: 'rgba(46, 139, 87, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Gacha',
    field: 'to',
    filter: false,
    cellRenderer: TrendPriceCellRenderer,
    sortable: false,
    minWidth: 100,
    pinned: 'left',
    maxWidth: 200,
    cellStyle: {
      backgroundColor: 'rgba(46, 139, 87, 0.1)',
    } as CellStyle,
  },

  {
    headerName: 'Mahsulotlar soni',
    field: 'total_products',
    flex: 1,
    filter: false,
    minWidth: 100,
    sortable: true,
  },
  {
    headerName: 'Sotuvchilar soni',
    field: 'total_shops',
    flex: 1,
    minWidth: 100,
    filter: false,
    sortable: true,
    cellStyle: {} as CellStyle,
  },
  {
    headerName: 'Buyurtmalar soni',
    field: 'total_orders',
    flex: 1,
    minWidth: 100,
    filter: false,
    sortable: true,
    cellStyle: {} as CellStyle,
  },
  {
    headerName: 'Izohlar soni',
    field: 'total_reviews',
    flex: 1,
    filter: false,
    minWidth: 100,
    sortable: true,
  },
];

export const CategoryShopsTableColumnDefs = [
  {
    headerName: 'Sotuvchi nomi',
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
    headerName: 'Kategoriyadagi pozitsiyasi',
    field: 'position',
    sortable: false,
    minWidth: 200,
    filter: false,
    maxWidth: 500,
    headerTooltip:
      'Sotuvchi ushbu kategoriyada qaysi pozitsiyada joylashganligi.',
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
    headerClass: 'bg-purple-100',
  },
  {
    headerName: 'Mahsulotlar soni',
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
    headerName: 'Buyurtmalar soni',
    field: 'total_orders',
    flex: 1,
    filter: false,
    minWidth: 100,
    sortable: true,
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
    headerClass: 'bg-purple-100',
  },
  {
    headerName: 'Izohlar soni',
    field: 'total_reviews',
    flex: 1,
    minWidth: 100,
    filter: false,
    sortable: true,
  },
  {
    headerName: "O'rtacha reytingi",
    field: 'average_product_rating',
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: false,
    cellRenderer: RatingCellRenderer,
  },
  {
    headerName: "O'rtacha Sotuv narx",
    field: 'avg_purchase_price',
    cellRenderer: TrendPriceCellRenderer,
    flex: 1,
    minWidth: 200,
    sortable: true,
    filter: false,
  },
];

export const SubcategoriesTableColumnDefs = [
  {
    headerName: 'Sana',
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
    headerName: 'Kategoriya',
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
    headerName: 'Mahsulotlar soni',
    field: 'total_products',
    flex: 1,
    minWidth: 100,
    filter: false,
  },
  {
    headerName: 'Sotuvchilar soni',
    field: 'total_shops',
    flex: 1,
    filter: false,
    minWidth: 100,
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Buyurtmalar soni',
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
    headerName: 'Izohlar soni',
    field: 'total_reviews',
    flex: 1,
    filter: false,
    minWidth: 100,
  },
  {
    headerName: 'Faol Mahsulotlar soni',
    field: 'total_products_with_sales',
    flex: 1,
    minWidth: 100,
    filter: false,
    headerTooltip: "Kecha sotuvlari bo'lgan mahsulotlar soni.",
  },
  {
    headerName: 'Faol Sotuvchilar soni',
    field: 'total_shops_with_sales',
    flex: 1,
    filter: false,
    minWidth: 100,
    headerTooltip: "Kecha sotuvlari bo'lgan sotuvchilar soni.",
  },
  {
    headerName: "O'rtacha reytingi",
    field: 'average_product_rating',
    flex: 1,
    filter: false,
    minWidth: 100,
    cellRenderer: RatingCellRenderer,
  },
  {
    headerName: "O'rtacha narx",
    field: 'average_purchase_price',
    cellRenderer: TrendPriceCellRenderer,
    flex: 1,
    minWidth: 100,
    filter: false,
  },
];

export const ShopOverallColumnDefs = [
  {
    headerName: 'Sana',
    field: 'date_pretty',
    sortable: false,
    minWidth: 150,
    filter: false,
    cellStyle: {
      backgroundColor: '#efefef80',
    } as CellStyle,
  },
  {
    headerName: 'Buyurtmalar soni',

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
    headerName: 'Mahsulotlar soni',
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
    headerName: 'Kategoriyalar soni',
    field: 'category_count',
    sortable: false,
    filter: false,
    cellRenderer: LocaleNumberCellRenderer,
    minWidth: 150,
    headerTooltip: 'Sotuvchining nechta kategoriyada mahsulotlari borligi.',
    cellStyle: {} as CellStyle,
  },
  {
    headerName: 'Izohlar soni',
    field: 'total_reviews',
    sortable: false,
    filter: false,
    cellRenderer: LocaleNumberCellRenderer,
    minWidth: 150,
    cellStyle: {} as CellStyle,
  },
  {
    headerName: 'Reytingi',
    field: 'rating',
    sortable: false,
    filter: false,
    minWidth: 150,
    headerTooltip: "Sotuvchi mahsulotlarining o'rtacha reytingi.",
    cellStyle: {} as CellStyle,
    cellRenderer: RatingCellRenderer,
  },
  {
    headerName: "O'rtacha narx",
    field: 'average_purchase_price',
    cellRenderer: TrendPriceCellRenderer,
    sortable: false,
    filter: false,
    minWidth: 150,
    headerTooltip: "Sotuvchi mahsulotlarining o'rtacha sotish narxi.",
    cellStyle: {} as CellStyle,
  },
];

export const ShopsTableColumnDefs = [
  {
    headerName: 'Pozitsiyasi',
    field: 'position',
    sortable: true,
    filter: false,
    minWidth: 100,
    maxWidth: 200,
    cellStyle: {
      textAlign: 'center',
    } as CellStyle,
  },
  {
    headerName: 'Sotuvchi nomi',
    field: 'shop_title',
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    sortable: false,
    cellRenderer: SellerNameCellRenderer,
    flex: 1,
    minWidth: 320,
    maxWidth: 400,
  },

  {
    headerName: 'Buyurtmalar soni',
    field: 'total_orders',
    sortable: true,
    filter: false,
    cellRenderer: LocaleNumberCellRenderer,

    flex: 1,
    minWidth: 200,
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
      textAlign: 'center',
    } as CellStyle,
    headerClass: 'bg-purple-100',
  },
  {
    headerName: 'Mahsulotlar soni',
    field: 'total_products',
    cellRenderer: LocaleNumberCellRenderer,
    sortable: true,
    filter: false,
    flex: 1,
    minWidth: 200,
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
      textAlign: 'center',
    } as CellStyle,
    headerClass: 'bg-purple-100',
  },
  {
    headerName: 'Kategoriyalar soni',
    field: 'num_categories',
    cellRenderer: LocaleNumberCellRenderer,
    sortable: true,
    filter: false,
    flex: 1,
    minWidth: 200,
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
      textAlign: 'center',
    } as CellStyle,
    headerClass: 'bg-purple-100',
    headerTooltip: 'Sotuvchining nechta kategoriyada mahsulotlari borligi.',
  },
  {
    headerName: 'Reytingi',
    field: 'rating',
    filter: false,
    cellRenderer: RatingCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: 'Izohlar soni',
    field: 'total_reviews',
    cellRenderer: LocaleNumberCellRenderer,
    filter: false,
    sortable: true,
    flex: 1,
    minWidth: 150,
  },
];

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
