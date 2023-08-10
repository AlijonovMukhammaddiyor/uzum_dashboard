import { AxiosResponse } from 'axios';
import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import Select from 'react-select';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import Button from '@/components/shared/buttons/Button';

import { UserType } from '@/types/user';

interface ShopsType {
  account_id: number;
  title: string;
  link: string;
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
  const [selectedRows, setSelectedRows] = React.useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [account_map, setAccountMap] = React.useState<{
    [key: string]: number;
  }>({});

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
  }, [selectedRows]);

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
              Yodda tuting! Do'konlarni faqat 30 kundan so'ng almashtirishingiz
              mumkin.
            </p>
          </div>

          <Select
            // in russian write "Search for shops" -> "Поиск магазинов"
            placeholder='Поиск магазинов'
            value={selectedRows}
            onChange={(selectedRows) => {
              // make sure all selected shops have the same account_id
              const account_ids = selectedRows.map(
                (row) => account_map[row.value]
              );

              if (new Set(account_ids).size > 1) {
                return alert(
                  "Iltimos, faqat bir xisobga tegishli do'konlarni tanlang"
                );
              }

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
      <p className='font-sm mt-4 font-semibold'>
        Oxirgi yangilangan sana: {user.shops_updated_at?.slice(0, 10)}
      </p>
    </>
  );
}

export default ShopsSelect;
