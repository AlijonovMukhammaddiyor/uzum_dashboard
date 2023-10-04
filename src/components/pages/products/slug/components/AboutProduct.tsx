import { AxiosResponse } from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillStar } from 'react-icons/ai';
import { Carousel } from 'react-responsive-carousel';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';

interface AboutProductProps {
  product_id: string;
  className?: string;
}

interface ProductType {
  adult: boolean;
  analytics: [
    {
      badges: string;
      date_pretty: string;
      position_in_category: number;
      position_in_shop: number;
      position: number;
      orders_amount: number;
      rating: number;
      reviews_amount: number;
      available_amount: number;
    }
  ];
  skus: {
    characteristics: {
      title: string;
      value: string;
    }[];
    sku: number;
  }[];
  sku_analytics: {
    sku: number;
    available_amount: number;
    purchase_price: number;
    full_price: number;
  }[];
  category_id: number;
  category_title: string;
  category_title_ru: string;
  characteristics: {
    id: number;
    title: string;
    values: {
      id: number;
      title: string;
      value: string;
    }[];
  }[];
  description: string;
  product_id: number;
  photos: string;
  shop_link: string;
  shop_title: string;
  title: string;
  created_at: string;
  title_ru: string;
}

function AboutProduct({ product_id, className }: AboutProductProps) {
  const { t, i18n } = useTranslation('products');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<ProductType | null>(null);
  const [selectedSku, setSelectedSku] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<{ [key: string]: string }>(
    {}
  );
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.8); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          product: ProductType;
        }>
      >('/product/current/' + product_id + '/')
      .then((res) => {
        // setTopProducts(res.data.products);

        const characteristics = JSON.parse(
          res.data.product.characteristics as unknown as string
        );

        const product = {
          ...res.data.product,
          analytics: res.data.product.analytics.sort(
            (a, b) =>
              new Date(b.date_pretty).getTime() -
              new Date(a.date_pretty).getTime()
          ),
          characteristics: characteristics,
          skus: res.data.product.skus.map((sku: any) => ({
            ...sku,
            characteristics: JSON.parse(
              sku.characteristics as unknown as string
            ),
          })),
        };

        setProduct(product);
        const defaultSku = product.sku_analytics[0].sku;
        setSelectedSku(defaultSku);
        // Initialize selectedTypes with the first value of each characteristic for the default SKU
        const defaultSkuDetails = product.skus.find(
          (sku) => sku.sku === defaultSku
        );
        const defaultTypes = defaultSkuDetails
          ? defaultSkuDetails.characteristics.reduce(
              (
                acc: { [key: string]: string },
                char: { title: string; value: string }
              ) => ({ ...acc, [char.title]: char.value }),
              {}
            )
          : {};
        setSelectedTypes(defaultTypes);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in /product/current/[product_id]/');
        setLoading(false);
      });
  }, [product_id]);

  const isNew =
    product && new Date(product?.created_at).getTime() > 1684627200000;

  const handleTypeSelect = (title: string, value: string) => {
    // Update selectedTypes with the new value first
    const newSelectedTypes = { ...selectedTypes, [title]: value };
    setSelectedTypes(newSelectedTypes);

    // Then look for a matching SKU
    const matchingSku = product?.skus.find((sku) =>
      sku.characteristics.every(
        (char) => newSelectedTypes[char.title] === char.value
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
    <div
      className={clsxm(
        'flex h-screen w-full min-w-[1000px] flex-col items-start justify-start gap-5 overflow-scroll rounded-md border border-slate-300 bg-white shadow-lg',
        className
      )}
      style={{
        zoom: zoomLevel,
      }}
    >
      <Container
        loading={loading}
        className='h-full min-h-full w-full rounded-md border-none bg-white p-5 shadow-none'
      >
        {product ? (
          <div className='flex items-start justify-start gap-10 lg:grid-cols-2'>
            <div className='min-h-[600px] w-[500px]'>
              <Carousel
                className='h-full w-full'
                showArrows={true}
                showThumbs={true}
                renderThumbs={() =>
                  JSON.parse(product?.photos).map((thumbnail: string) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbnail}
                      alt={thumbnail}
                      key={thumbnail}
                      width={100}
                      height={120}
                    />
                  ))
                }
              >
                {JSON.parse(product?.photos)?.map((image: any) => (
                  <div key={image} className='h-full w-full'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt='' />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className='flex min-h-[650px] flex-col items-start justify-start'>
              {isNew && (
                <div className='flex items-center justify-center gap-2 rounded-lg border border-blue-500 px-2 py-1'>
                  <p className='font-semibold'>
                    {product.created_at.split('T')[0]}
                  </p>
                </div>
              )}
              <div
                className={clsxm(
                  'flex min-h-[600px] w-full flex-col items-start justify-between gap-8 space-y-6'
                )}
              >
                <div
                  className={clsxm(
                    'flex w-full flex-col items-start justify-start gap-6'
                  )}
                >
                  <div>
                    <h1 className='text-3xl font-bold'>
                      {i18n.language === 'uz'
                        ? product.title
                        : product.title_ru ?? product.title}
                    </h1>
                    <div className='mt-2 flex items-center space-x-2'>
                      <div className='flex items-center space-x-1 text-yellow-400'>
                        <AiFillStar />
                        <span>{product.analytics[0].rating}</span>
                      </div>
                      <span className='text-gray-500'>
                        ({product.analytics[0].reviews_amount}{' '}
                        {t('reviews').toLowerCase()})
                      </span>
                      <span className='text-gray-500'>
                        {product.analytics[0].orders_amount}{' '}
                        {t('orders').toLowerCase()}
                      </span>

                      <span className='text-gray-500'>
                        {product.analytics[0].available_amount} {t('in_stock')}
                      </span>
                    </div>
                  </div>
                  <div
                    className='grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-start'
                    style={{
                      maxWidth: `calc(250px * ${product.characteristics.length})`,
                    }}
                  >
                    {product.characteristics.map((char, idx) => (
                      <div
                        key={char.id}
                        className={clsxm(
                          'max-h-[300px] max-w-[250px] overflow-auto overflow-y-auto border border-slate-300 border-b-slate-500',
                          Object.keys(selectedTypes).includes(char.title) && ''
                        )}
                      >
                        <h4 className='sticky top-0 border-b bg-slate-100 p-3'>
                          {char.title}
                        </h4>
                        <ul className=''>
                          {char.values.map((value) => (
                            <li key={value.id} className='border-b'>
                              <button
                                onClick={() =>
                                  handleTypeSelect(char.title, value.title)
                                }
                                className={clsxm(
                                  'w-full border-b border-slate-300 px-3 py-2 hover:text-blue-500',
                                  selectedTypes[char.title].trim() ===
                                    value.title.trim() &&
                                    'bg-blue-500 text-white hover:text-white'
                                )}
                              >
                                {value.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className=''>
                    <div className='flex items-center justify-start gap-5'>
                      <p className='w-[120px] font-semibold'>{t('seller')}</p>
                      <Link
                        href={'/sellers/' + product.shop_link}
                        className='font-semibold text-blue-500 hover:underline'
                      >
                        {product.shop_title}
                      </Link>
                    </div>
                    <div className='mt-3 flex items-center justify-start gap-5'>
                      <p className='w-[120px] font-semibold'>{t('category')}</p>
                      <Link
                        href={
                          '/category/' +
                          (i18n.language === 'uz'
                            ? product.category_title
                            : product.category_title_ru) +
                          '--' +
                          product.category_id
                        }
                        className='font-semibold text-blue-500 hover:underline'
                      >
                        {i18n.language === 'uz'
                          ? product.category_title
                          : product.category_title_ru}
                      </Link>
                    </div>
                  </div>
                </div>

                {selectedSku > 0 ? (
                  <div className='flex items-baseline space-x-2'>
                    <p className='text-2xl font-semibold'>
                      {product.sku_analytics
                        .find((sku) => sku.sku === selectedSku)
                        ?.purchase_price.toLocaleString()}{' '}
                      so'm
                    </p>
                    {product.sku_analytics.find(
                      (sku) => sku.sku === selectedSku
                    )?.full_price && (
                      <p className='text-xl text-gray-500 line-through'>
                        {product.sku_analytics
                          .find((sku) => sku.sku === selectedSku)
                          ?.full_price.toLocaleString()}{' '}
                        so'm
                      </p>
                    )}
                    <p className='text-primary text-base font-semibold'>
                      - SKU:{' '}
                      {
                        product.sku_analytics.find(
                          (sku) => sku.sku === selectedSku
                        )?.sku
                      }
                    </p>
                  </div>
                ) : (
                  <div>Iltimos mahsulot turini tanlang.</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {product ? (
          <div className='product-description flex w-full items-center justify-center'>
            <div
              className='mt-[100px] max-w-[1000px] bg-white'
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
}

export default AboutProduct;
