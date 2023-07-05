import { CellStyle } from 'ag-grid-community';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Popup from 'reactjs-popup';

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
            style={{ zIndex: index, left: `${index * 20}px` }}
            onClick={openModal}
          >
            <Image src={src} width={30} height={40} alt='' />
          </div>
        );
      })}
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <Carousel>
          {Array.from(srcs_no_duplicates).map((src, index) => (
            <div key={index}>
              <Image
                src={src}
                alt='sdsd'
                width={100}
                height={150}
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '300px',
                  height: '500px',
                }}
              />
            </div>
          ))}
        </Carousel>
      </Popup>
    </div>
  );
};

const AvatarCellRenderer = ({ value }: { value: string }) => {
  return (
    <Image src={value} width={30} height={30} alt='' className='rounded-full' />
  );
};

const ProductNameCellRenderer = ({ value }: { value: string }) => {
  return (
    <Link href={`/product/${value}`}>
      <p className='text-blue-500 hover:underline'>{value}</p>
    </Link>
  );
};

const SubcategoryCellRenderer = ({ value }: { value: string }) => {
  return (
    <Link href={`/product/${value}`}>
      <p className='text-blue-500 hover:underline'>{value}</p>
    </Link>
  );
};

const CategoryNameCellRenderer = ({ value }: { value: string }) => {
  return (
    <Link href={`/category/${value}`}>
      <p className='text-blue-500 hover:underline'>{value}</p>
    </Link>
  );
};

const SellerNameCellRenderer = ({ value }: { value: string }) => {
  return (
    <Link href={`/seller/${value}`}>
      <p className='text-blue-500 hover:underline'>{value}</p>
    </Link>
  );
};

const PurchasePriceCellRenderer = ({ value }: { value: string }) => {
  if (!value) return null;
  const skus: {
    sku_id: number;
    purchase_price: number;
    full_price: number;
    orders_amount: number;
    available_amount: number;
  }[] = JSON.parse(value);

  const average_purchase_price =
    skus.reduce((acc, curr) => acc + curr.purchase_price, 0) / skus.length;

  // return <p className=''>{value?.toLocaleString()} so'm</p>;
  return (
    <div className='flex flex-col gap-1'>
      <p className=''>
        {Math.floor(average_purchase_price)?.toLocaleString()} so'm
      </p>
    </div>
  );
};

const TrendPriceCellRenderer = ({ value }: { value: string }) => {
  if (!value) return null;
  const value_number = Number(Number(value).toFixed(0));
  return (
    <div className=''>
      <p className=''>{value_number?.toLocaleString()} so'm</p>
    </div>
  );
};

const FullPriceCellRenderer = ({ value }: { value: string }) => {
  if (!value) return null;
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

const RatingCellRenderer = ({ value }: { value: string }) => {
  if (!value)
    return (
      <div>
        <p className='text-center'>Reyting Yo'q</p>
      </div>
    );
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
  if (!value) return null;
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
  if (!value) return null;

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

export const CategoryProductTableColumnDefs = [
  {
    headerName: 'Mahsulot ID',
    field: 'product_id',
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
    headerName: 'Ichki kategoriyasi',
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
    floatingFilter: true,
    filter: 'agNumberColumnFilter',
    flex: 1,
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
    floatingFilter: true,
    cellRenderer: SellerNameCellRenderer,
    flex: 1,
    minWidth: 200,
    tooltipField: 'Sotuvchi nomi',
  },
  {
    headerName: 'Sotuv miqdori',
    field: 'orders_amount',
    sortable: true,
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
    minWidth: 100,
    maxWidth: 200,
    cellStyle: {
      backgroundColor: '#efefef80',
    } as CellStyle,
  },
  {
    headerName: 'Mahsulotlar soni',
    field: 'total_products',
    flex: 1,
    minWidth: 100,
    sortable: false,
  },
  {
    headerName: 'Sotuvchilar soni',
    field: 'total_shops',
    flex: 1,
    minWidth: 100,
    sortable: false,
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Buyurtmalar soni',
    field: 'total_orders',
    flex: 1,
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
    minWidth: 100,
    sortable: false,
  },
  {
    headerName: 'Faol Mahsulotlar soni',
    field: 'total_products_with_sales',
    flex: 1,
    minWidth: 100,
    sortable: false,
    headerTooltip: "Kecha sotuvlari bo'lgan mahsulotlar soni.",
  },
  {
    headerName: 'Faol Sotuvchilar soni',
    field: 'total_shops_with_sales',
    flex: 1,
    minWidth: 100,
    sortable: false,
    headerTooltip: "Kecha sotuvlari bo'lgan sotuvchilar soni.",
  },
  {
    headerName: "O'rtacha reytingi",
    field: 'average_product_rating',
    flex: 1,
    minWidth: 100,
    sortable: false,
    cellRenderer: RatingCellRenderer,
  },
  {
    headerName: "O'rtacha narx",
    field: 'average_purchase_price',
    cellRenderer: TrendPriceCellRenderer,
    flex: 1,
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
    maxWidth: 200,
    cellStyle: {
      backgroundColor: '#efefef80',
    } as CellStyle,
  },
  {
    headerName: 'Gacha',
    field: 'to',
    cellRenderer: TrendPriceCellRenderer,
    sortable: false,
    minWidth: 100,
    maxWidth: 200,
    cellStyle: {
      backgroundColor: '#efefef80',
    } as CellStyle,
  },

  {
    headerName: 'Mahsulotlar soni',
    field: 'total_products',
    flex: 1,
    minWidth: 100,
    sortable: true,
  },
  {
    headerName: 'Sotuvchilar soni',
    field: 'total_shops',
    flex: 1,
    minWidth: 100,
    sortable: true,
    cellStyle: {} as CellStyle,
  },
  {
    headerName: 'Buyurtmalar soni',
    field: 'total_orders',
    flex: 1,
    minWidth: 100,
    sortable: true,
    cellStyle: {} as CellStyle,
  },
  {
    headerName: 'Izohlar soni',
    field: 'total_reviews',
    flex: 1,
    minWidth: 100,
    sortable: true,
  },
];

export const CategoryShopsTableColumnDefs = [
  {
    headerName: 'Sotuvchi nomi',
    field: 'shop_title',
    cellRenderer: SellerNameCellRenderer,
    sortable: false,
    minWidth: 200,
    maxWidth: 400,
  },
  {
    headerName: 'Kategoriyadagi pozitsiyasi',
    field: 'position',
    sortable: false,
    minWidth: 100,
    maxWidth: 200,
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
    sortable: true,
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
    headerClass: 'bg-purple-100',
  },

  {
    headerName: 'Sotuvlar soni',
    field: 'total_orders',
    flex: 1,
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
    sortable: true,
  },
  {
    headerName: "O'rtacha reytingi",
    field: 'average_product_rating',
    flex: 1,
    minWidth: 150,
    sortable: true,
    cellRenderer: RatingCellRenderer,
  },
  {
    headerName: "O'rtacha Sotuv narx",
    field: 'avg_purchase_price',
    cellRenderer: TrendPriceCellRenderer,
    flex: 1,
    minWidth: 200,
    sortable: true,
  },
];

export const SubcategoriesTableColumnDefs = [
  {
    headerName: 'Sana',
    field: 'date_pretty',
    sortable: false,
    minWidth: 100,
    maxWidth: 200,
    cellStyle: {
      backgroundColor: '#efefef80',
    } as CellStyle,
  },
  {
    headerName: 'Kategoriya',
    field: 'category_title',
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
  },
  {
    headerName: 'Sotuvchilar soni',
    field: 'total_shops',
    flex: 1,
    minWidth: 100,
    cellStyle: {
      backgroundColor: 'rgba(119, 67, 219, 0.1)',
    } as CellStyle,
  },
  {
    headerName: 'Buyurtmalar soni',
    field: 'total_orders',
    flex: 1,
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
    minWidth: 100,
  },
  {
    headerName: 'Faol Mahsulotlar soni',
    field: 'total_products_with_sales',
    flex: 1,
    minWidth: 100,
    headerTooltip: "Kecha sotuvlari bo'lgan mahsulotlar soni.",
  },
  {
    headerName: 'Faol Sotuvchilar soni',
    field: 'total_shops_with_sales',
    flex: 1,
    minWidth: 100,
    headerTooltip: "Kecha sotuvlari bo'lgan sotuvchilar soni.",
  },
  {
    headerName: "O'rtacha reytingi",
    field: 'average_product_rating',
    flex: 1,
    minWidth: 100,
    cellRenderer: RatingCellRenderer,
  },
  {
    headerName: "O'rtacha narx",
    field: 'average_purchase_price',
    cellRenderer: TrendPriceCellRenderer,
    flex: 1,
    minWidth: 100,
  },
];

export const shopsTableColumnDefs = [
  {
    headerName: 'Avatar',
    field: 'avatar',
    cellRendererFramework: AvatarCellRenderer,
    sortable: false,
    minWidth: 50,
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
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Products Count',
    field: 'productsCount',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Rating',
    field: 'rating',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Reviews',
    field: 'reviews',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Orders',
    field: 'orders',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
];

export const shopProductsTableColumnDefs = [
  {
    headerName: 'Photo',
    field: 'photo',
    cellRendererFramework: ProductImageCellRenderer,
    sortable: false,
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
    floatingFilter: true,
    filter: 'agDateColumnFilter',
    flex: 1,
    minWidth: 150,
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
  },
  {
    headerName: 'Available Amount',
    field: 'availableAmount',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 150,
    tooltipField: 'availableAmount',
  },
  {
    headerName: 'Current Price',
    field: 'currentPrice',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
  },
  {
    headerName: 'Min Price',
    field: 'minPrice',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
  },
  {
    headerName: 'Max Price',
    field: 'maxPrice',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
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
    filter: true,
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Products Count',
    field: 'productsCount',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Rating',
    field: 'rating',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Reviews',
    field: 'reviews',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Orders',
    field: 'orders',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: 'Average Price',
    field: 'averagePrice',
    filter: 'agNumberColumnFilter',
    floatingFilter: true,
    flex: 1,
    minWidth: 200,
  },
];
