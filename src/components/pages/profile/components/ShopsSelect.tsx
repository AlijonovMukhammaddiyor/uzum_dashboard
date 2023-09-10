import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoWarningOutline } from 'react-icons/io5';
import Select from 'react-select';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getShopTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Button from '@/components/shared/buttons/Button';
import Table from '@/components/shared/Table';

import { UserType } from '@/types/user';

interface ShopsType {
  account_id: number;
  title: string;
  link: string;
}
interface SellerType {
  average_order_price: number;
  average_purchase_price: number;
  date_pretty: string;
  id: string;
  num_categories: number;
  position: number;
  rating: number;
  shop_link: string;
  total_revenue: number;
  shop_title: string;
  total_orders: number;
  total_products: number;
  total_reviews: number;
}

function ShopsSelect({
  className,
  user,
}: {
  className?: string;
  user: UserType;
}) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [shops, setShops] = React.useState<ShopsType[]>([]);
  const [myShops, setMyShops] = React.useState<SellerType[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [account_map, setAccountMap] = React.useState<{
    [key: string]: number;
  }>({});
  const router = useRouter();
  const { t, i18n } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<ShopsType[]>>('/shop/select/')
      .then((res) => {
        // logger(res.data, 'ShopsSelect');
        setShops(res.data);

        const account_map: { [key: string]: number } = {};
        res.data.forEach((shop) => {
          account_map[shop.link] = shop.account_id;
        });

        setAccountMap(account_map);

        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in ShopsSelect');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api
      .get<unknown, AxiosResponse<{ data: SellerType[] }>>('/shop/mine/')
      .then((res) => {
        setMyShops(res.data.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in my shops');
        setLoading(false);
      });
    api
      .get<unknown, AxiosResponse<{ data: SellerType[] }>>('/user/reports/')
      .then((res) => {
        logger(res.data, 'my shops');
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in reports');
      });
  }, []);

  const options = React.useMemo(() => {
    return shops.map((shop) => ({
      value: shop.link,
      label: shop.title,
    }));
  }, [shops]);

  const handleSelectShops = React.useCallback(() => {
    setLoading(true);
    const api = new API(null);
    api
      .post<unknown, AxiosResponse<ShopsType[]>>('/user/set-shops/', {
        links: selectedRows.map((row) => row.value),
      })
      .then((res) => {
        // logger(res.data, 'ShopsSelect');
        alert("Do'konlar muvaffaqiyatli saqlandi.");
        setLoading(false);
        router.push('/sellers');
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in ShopsSelect');
        try {
          alert((err as { response: { data: any } }).response.data.message);
        } catch (e) {
          alert('Xatolik yuz berdi.');
        }

        setLoading(false);
      });
  }, [router, selectedRows]);

  const is_paid = user.tariff !== 'free';

  return (
    <>
      <Container
        className={clsxm(
          'mt-10 flex min-h-[500px] flex-col items-center justify-between p-4',
          className
        )}
        loading={loading}
      >
        <div className='w-full'>
          <div className='mb-6 flex w-full items-center justify-center gap-3'>
            <IoWarningOutline className='text-primary text-2xl' />
            <p className='text-primary text-center font-semibold'>
              {/* write "You can select up to 3 shops" */}
              {i18n.language === 'uz'
                ? "Yodda tuting! Do'konlarni faqat 30 kundan so'ng almashtirishingiz mumkin."
                : 'Пожалуйста помни! Сменить магазин можно только через 30 дней.'}
            </p>
          </div>

          <Select
            // in russian write "Search for shops" -> "Поиск магазинов"
            placeholder='Поиск магазинов'
            value={selectedRows}
            onChange={(selectedRows) => {
              // make sure all selected shops have the same account_id
              // const account_ids = selectedRows.map(
              //   (row) => account_map[row.value]
              // );

              // if (new Set(account_ids).size > 1) {
              //   return alert(
              //     "Iltimos, faqat bir xisobga tegishli do'konlarni tanlang"
              //   );
              // }

              setSelectedRows(selectedRows as any);
            }}
            isMulti
            options={options}
            className='w-full max-w-full'
            isOptionDisabled={() => selectedRows.length >= 3}
            name='products'
          />
        </div>

        <Button
          className='bg-primary w-full text-white hover:bg-purple-700'
          onClick={() => {
            handleSelectShops();
          }}
          spinnerColor='white'
          isLoading={loading}
          disabled={selectedRows.length < 1}
        >
          <>
            {/* write save  */}
            Saqlash
          </>
        </Button>
      </Container>

      <p className={clsxm('font-sm mt-4 font-semibold', className)}>
        Oxirgi yangilangan sana: {user.shops_updated_at?.slice(0, 10)}
      </p>
      {is_paid ? (
        myShops.length > 0 ? (
          <Container
            loading={loading}
            className={clsxm(
              'w-full overflow-scroll border-none pt-4',
              className
            )}
          >
            <p className='text-primary h-10 w-full text-center'>
              {t('myShops')}
            </p>
            <Table
              columnDefs={getShopTableColumnDefs(t2, i18n.language)}
              className={clsxm(
                'min-w-full rounded-none',
                user.tariff === 'base' &&
                  `h-[${(65 + myShops.length * 45).toString()}px]`,
                user.tariff === 'seller' &&
                  `h-[${(65 + myShops.length * 45).toString()}px]`
              )}
              rowData={myShops ?? []}
            />
          </Container>
        ) : (
          <p></p>
        )
      ) : (
        <></>
      )}
    </>
  );
}

export default ShopsSelect;
