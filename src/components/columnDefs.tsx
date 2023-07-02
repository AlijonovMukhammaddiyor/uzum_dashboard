import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

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
  const [showLarge, setShowLarge] = useState(false);

  if (!value) return null;
  const srcs: string[] = JSON.parse(value);
  //convert to set to remove duplicates
  const srcs_no_duplicates = new Set(srcs);
  const srcs_back = Array.from(srcs_no_duplicates).slice(0, 3);

  return (
    <div className='relative h-full max-w-[180px]'>
      {srcs_back.map((src, index) => {
        return (
          <div
            key={index}
            onMouseEnter={() => setShowLarge(true)}
            onMouseLeave={() => setShowLarge(false)}
            className='absolute left-0 top-0'
            style={{ zIndex: index, left: `${index * 20}px` }}
          >
            <Image src={src} width={30} height={40} alt='' />

            {/* Show larger image on hover */}
            {showLarge && (
              <div className='absolute left-full top-0 z-10 ml-2 shadow-lg'>
                <Image src={src} width={300} height={400} alt='' />
              </div>
            )}
          </div>
        );
      })}
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

const PurchasePriceCellRenderer = ({ value }: { value: number }) => {
  if (!value) return null;

  return <p className=''>{value?.toLocaleString()} so'm</p>;
};

const FullPriceCellRenderer = ({ value }: { value: number }) => {
  if (!value) return null;
  return <p className=''>{value?.toLocaleString()} so'm</p>;
};

const BadgesCellRenderer = ({
  value,
}: {
  value: {
    badge_background_color: string;
    badge_text_color: string;
    badge_text: string;
  };
}) => {
  if (!value) return null;

  return (
    <div className='flex h-full w-full flex-wrap items-center justify-center gap-2'>
      <span
        className='rounded-md px-2 py-1 text-sm font-medium'
        style={{
          backgroundColor: value.badge_background_color,
          color: value.badge_text_color,
        }}
      >
        {value.badge_text}
      </span>
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
    cellRendererFramework: ProductImageCellRenderer,
    sortable: false,
    minWidth: 150,
    maxWidth: 200,
  },
  {
    headerName: 'Nomi',
    field: 'product_title',
    cellRendererFramework: ProductNameCellRenderer,
    filter: true,
    floatingFilter: true,
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
  },
  {
    headerName: 'Pozitsiya',
    field: 'position_in_category',
    floatingFilter: true,
    filter: 'agNumberColumnFilter',
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Ushbu kategoriyadagi pozitsiyasi.',
  },
  {
    headerName: 'Sotuvchi',
    field: 'shop_title',
    filter: true,
    floatingFilter: true,
    cellRendererFramework: SellerNameCellRenderer,
    flex: 1,
    minWidth: 200,
    tooltipField: 'Sotuvchi nomi',
  },
  {
    headerName: 'Sotuv Narxi',
    field: 'purchase_price',
    cellRendererFramework: PurchasePriceCellRenderer,
    flex: 1,
    minWidth: 200,
    headerTooltip: 'Ushbu mahsulot turlari orasida eng arzon sotuv narxi.',
  },
  {
    headerName: 'Haqiqiy Narxi',
    field: 'full_price',
    cellRendererFramework: FullPriceCellRenderer,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Ushbu mahsulot turlari orasida eng qimmat sotuv narxi.',
  },
  {
    headerName: 'Aksiya',
    field: 'badge',
    cellRendererFramework: BadgesCellRenderer,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Ushbu mahsulot uchun mavjud aksiyalar.',
  },
  {
    headerName: 'Sotuv miqdori',
    field: 'orders_amount',
    sortable: true,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulotning shu kungacha sotilgan miqdori.',
  },
  {
    headerName: 'Izohlar soni',
    field: 'reviews_amount',
    // filter: 'agNumberColumnFilter',
    // floatingFilter: true,
    flex: 1,
    minWidth: 150,
    headerTooltip: 'Mahsulot izohlarining umumiy soni.',
  },
];

export const productTableColumnDefs = [
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
    minWidth: 600,
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
  },
  {
    headerName: 'Seller',
    field: 'seller',
    filter: true,
    floatingFilter: true,
    cellRendererFramework: SellerNameCellRenderer,
    flex: 1,
    minWidth: 200,
    tooltipField: 'seller',
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
