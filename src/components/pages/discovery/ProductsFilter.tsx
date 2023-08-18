import { useTranslation } from 'next-i18next';
import React from 'react';

import CategoriesSelect from '@/components/pages/discovery/CategoriesSelect';
import Filter from '@/components/pages/discovery/Filter';

export interface HomeStatisticsContainerProps {
  className?: string;
}

interface GrowingProductType {
  product_id: number;
  title: string;
  category: string;
  shop: string;
  created_at: string;
  photos: string;
  orders: {
    x: string;
    y: number;
  }[];
  rating: number;
  reviews_amount: {
    x: string;
    y: number;
  }[];
  available_amount: {
    x: string;
    y: number;
  }[];
  average_purchase_price: number;
  position_in_category: number;
  position: number;
}

function ProductsFilter({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('tableColumns');
  const [orders, setOrders] = React.useState<{
    min: number;
    max: number;
  }>({ min: 0, max: 100_000 });
  const [allOrders, setAllOrders] = React.useState<{
    min: number;
    max: number;
  }>({ min: 0, max: 100_000 });

  return (
    <div className='mt-6 flex h-full w-full items-start justify-start gap-5'>
      <CategoriesSelect className='' />
      <div className=''>
        <div className='flex items-center justify-end'>
          <Filter title="O'rtacha Oylik sotuv soni" setValues={setOrders} />
          <Filter title='Jami sotuv soni' setValues={setAllOrders} />
        </div>
        <div className='flex items-center justify-end'>
          <Filter
            title="O'rtacha oylik daromad miqdori"
            setValues={setOrders}
          />
          <Filter title='Jami daromad miqdori' setValues={setAllOrders} />
        </div>
        <div className='flex items-center justify-end'>
          <Filter title='Ushbu oydagi sotuv soni' setValues={setOrders} />
          <Filter
            title='Ushbu oydagi daromad miqdori'
            setValues={setAllOrders}
          />
        </div>
        <div className='flex items-center justify-end'>
          <Filter title="O'rtacha oydlik izohlar soni" setValues={setOrders} />
          <Filter title='Jami izohlar soni' setValues={setAllOrders} />
        </div>
        <div className='flex items-center justify-end'>
          <Filter title="O'rtacha narxi" setValues={setOrders} />
          <Filter title='Sotuvga chiqqan sanasi' setValues={setOrders} />
        </div>
      </div>
    </div>
  );
}

export default ProductsFilter;
