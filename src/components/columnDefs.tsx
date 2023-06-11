import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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

const ImageCellRenderer = ({ value }: { value: string }) => {
  return <Image src={value} width={20} height={30} alt='' />;
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

export const productTableColumnDefs = [
  {
    headerName: 'Photo',
    field: 'photo',
    cellRendererFramework: ImageCellRenderer,
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
    cellRendererFramework: ImageCellRenderer,
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
    cellStyle: function (_: any) {
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
