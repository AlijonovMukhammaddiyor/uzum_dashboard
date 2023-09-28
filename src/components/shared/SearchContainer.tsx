import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import Popup from 'reactjs-popup';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import Button from '@/components/shared/buttons/Button';

import { useContextState } from '@/context/Context';

function SearchContainer({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { i18n } = useTranslation('common');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<{
    products: any[];
    shops: any[];
    categories: any[];
    products_count: number;
    shops_count: number;
    categories_count: number;
  }>({
    products: [],
    shops: [],
    categories: [],
    products_count: 0,
    shops_count: 0,
    categories_count: 0,
  });
  const [isProductSelected, setProductSelected] = useState(true);
  const [isStoreSelected, setStoreSelected] = useState(true);
  const [isCategorySelected, setCategorySelected] = useState(true);

  const handleSearch = () => {
    const api = new API(null);
    if (searchTerm.length < 3)
      return alert(
        i18n.language === 'uz'
          ? 'Kamida 3 ta harf kiriting'
          : 'Введите не менее  3 символов'
      );
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          products: any[];
          shops: any[];
          categories: any[];
          products_count: number;
          shops_count: number;
          categories_count: number;
        }>
      >(
        '/uzum/search/?search=' +
          searchTerm +
          '&isProductSelected=' +
          isProductSelected +
          '&isStoreSelected=' +
          isStoreSelected +
          '&isCategorySelected=' +
          isCategorySelected +
          '&lang=' +
          i18n.language
      )
      .then((res) => {
        logger(res.data, 'results');
        setLoading(false);
        setResults(res.data);
      })
      .catch((err) => {
        logger(err, 'error in search');
        setLoading(false);
      });
  };

  return (
    <Popup
      open={open}
      className='z-[99999]'
      closeOnDocumentClick
      onClose={closeModal}
      contentStyle={{
        zIndex: 99999,
        width: '90%',
        height: '90%',
        overflow: 'auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <div className='w-full'>
        <div className='mb-6 flex w-full flex-col items-start'>
          <h1 className='text-2xl font-semibold'>
            {i18n.language === 'uz' ? 'Qidiruv' : 'Поиск'}
          </h1>
          <div className='flex w-full items-center justify-between'>
            <p className='mt-1 text-gray-500'>
              {i18n.language === 'uz'
                ? `Mahsulot, do'kon yoki kategoriyaning "O'zbekcha" nomini kiriting`
                : `Введите название продукта, магазина или категории на "Русском"`}
            </p>
            <p className='mt-1 text-gray-500'>
              {i18n.language === 'uz'
                ? "Tanlangan Til: O'zbekcha"
                : 'Выбранный Язык: Русский'}
            </p>
          </div>
        </div>
        <div className='mb-4'>
          <label className='mr-6 inline-flex items-center'>
            <input
              tabIndex={1}
              type='checkbox'
              checked={isProductSelected}
              onChange={() => setProductSelected(!isProductSelected)}
              className='form-checkbox rounded text-indigo-600'
            />
            <span className='ml-2'>
              {i18n.language === 'uz' ? 'Mahsulot' : 'Продукт'}
            </span>
          </label>

          <label className='mr-6 inline-flex items-center'>
            <input
              tabIndex={2}
              type='checkbox'
              checked={isStoreSelected}
              onChange={() => setStoreSelected(!isStoreSelected)}
              className='form-checkbox rounded text-indigo-600'
            />
            <span className='ml-2'>
              {i18n.language === 'uz' ? "Do'kon" : 'Магазин'}
            </span>
          </label>

          <label className='inline-flex items-center'>
            <input
              tabIndex={3}
              type='checkbox'
              checked={isCategorySelected}
              onChange={() => setCategorySelected(!isCategorySelected)}
              className='form-checkbox rounded text-indigo-600'
            />
            <span className='ml-2'>
              {i18n.language === 'uz' ? 'Kategoriya' : 'Категория'}
            </span>
          </label>
        </div>
        {/* Search Input */}
        <div className='relative mb-6 max-h-[calc(100%-200px)] overflow-scroll'>
          <input
            tabIndex={0}
            autoFocus
            type='text'
            className='focus:all_side_shadow focus:border-primary focus:ring-primary w-full rounded-md border p-3 transition duration-200 ease-in-out focus:bg-white'
            placeholder={i18n.language === 'uz' ? 'Izlash...' : 'Поиск...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />

          {/* search button */}
          <Button
            isLoading={loading}
            spinnerColor='black'
            className='bg-primary absolute right-0 top-0 h-full w-20 rounded-r-md text-center text-white transition duration-200 ease-in-out hover:bg-purple-900'
            onClick={handleSearch}
          >
            {loading ? (
              <svg
                className='mx-auto my-auto h-5 w-5 animate-spin'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                ></path>
              </svg>
            ) : (
              <span className='my-auto'>
                {i18n.language === 'uz' ? 'Qidiruv' : 'Поиск'}
              </span>
            )}
          </Button>
        </div>

        {/* Search Results */}
        <div className='mt-2 space-y-6'>
          {/* Adjust the maxHeight value as needed */}
          {isProductSelected && (
            <SearchResultSection
              title={i18n.language === 'uz' ? 'Mahsulotlar' : 'Продукты'}
              results={results.products}
              count={results.products_count}
              type='products'
              loading={loading}
              search={searchTerm}
            />
          )}
          {isStoreSelected && (
            <SearchResultSection
              title={i18n.language === 'uz' ? "Do'konlar" : 'Магазины'}
              results={results.shops}
              count={results.shops_count}
              type='shops'
              loading={loading}
              search={searchTerm}
            />
          )}
          {isCategorySelected && (
            <SearchResultSection
              title={i18n.language === 'uz' ? 'Kategoriyalar' : 'Категории'}
              results={results.categories}
              count={results.categories_count}
              loading={loading}
              search={searchTerm}
              type='categories'
            />
          )}
        </div>
      </div>
    </Popup>
  );
}

export default SearchContainer;

function SearchResultSection({
  title,
  type,
  results,
  count,
  loading,
  search,
}: {
  title: string;
  type: 'products' | 'shops' | 'categories';
  results: any[];
  count: number;
  loading?: boolean;
  search?: string;
}) {
  const { i18n } = useTranslation('common');
  const { state } = useContextState();
  const INITIAL_DISPLAY_COUNT = 3;
  const MAX_DISPLAY_COUNT = 100;

  const [displayCount, setDisplayCount] = React.useState(INITIAL_DISPLAY_COUNT);

  const prepareResults = (results: any[], type: string) => {
    if (type === 'products') {
      if (i18n.language === 'uz')
        return results.map((result) => ({
          name: result.product_title ?? result.product_title_ru,
          href: `/products/${result.product_id}`,
          photos: result.photos,
          shop_link: result.shop_link,
          shop_title: result.shop_title,
        }));
      else
        return results.map((result) => ({
          name: result.product_title_ru ?? result.product_title,
          href: `/products/${result.product_id}`,
          photos: result.photos,
          shop_link: result.shop_link,
          shop_title: result.shop_title,
        }));
    } else if (type === 'shops') {
      return results.map((result) => ({
        name: result.title,
        href: `/sellers/${result.link}`,
      }));
    }

    if (i18n.language === 'uz')
      return results.map((result) => ({
        name: result.title ?? result.title_ru,
        href: `/category/${result.title}--${result.categoryId}`,
        ancestors: result.ancestors,
      }));
    else
      return results.map((result) => ({
        name: result.title_ru ?? result.title,
        href: `/category/${result.title_ru ?? result.title}--${
          result.categoryId
        }`,
        ancestors: result.ancestors_ru ?? result.ancestors,
      }));
  };
  const renderResult = (result: any) => {
    if (type === 'products') {
      let images = [];
      if (result.photos) {
        images = JSON.parse(result.photos);
      }
      return (
        <li
          key={result.product_id}
          className='flex cursor-pointer items-center px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-50'
        >
          {images && images.length > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images[0]}
              alt={result.title}
              className='mr-2 h-16 w-12'
            />
          )}
          <a
            href={result.href}
            target='_blank'
            rel='noopener noreferrer'
            className='ellipsis flex-grow text-blue-500 hover:underline'
            title={result.name}
          >
            <Highlighter
              highlightClassName='bg-yellow-200'
              searchWords={[search ?? '']}
              autoEscape={true}
              textToHighlight={result.name}
            />
          </a>
          <span className='mx-2'>@</span>
          <a
            href={`/sellers/${result.shop_link}`}
            target='_blank'
            rel='noopener noreferrer'
            className='ellipsis text-gray-600 hover:underline'
            title={result.shop_title}
          >
            {result.shop_title}
          </a>
        </li>
      );
    } else if (type === 'categories') {
      return (
        <li
          key={result.href}
          className='flex cursor-pointer items-center justify-between px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-50'
        >
          <a
            href={result.href}
            target='_blank'
            rel='noopener noreferrer'
            className='ellipsis block text-blue-500 hover:underline'
            title={result.name}
          >
            <Highlighter
              highlightClassName='bg-yellow-200'
              searchWords={[search ?? '']}
              autoEscape={true}
              textToHighlight={result.name}
            />
          </a>

          <p className='text-sm text-slate-500'>
            {makeAncestorsString(result.ancestors)}
          </p>
        </li>
      );
    } else {
      const tariff = state.user?.tariff;
      if (tariff !== 'base' && tariff !== 'seller' && tariff !== 'business') {
        <li
          key={result.link}
          className='cursor-pointer px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-50'
        >
          <p
            className='ellipsis block text-blue-500 hover:underline'
            title={result.name}
            onClick={() =>
              alert(
                i18n.language === 'uz'
                  ? "Do'konlarni tahlil qilish ushbu tarifda mavjud emas"
                  : 'Анализ магазинов недоступен в этом тарифе'
              )
            }
          >
            <Highlighter
              highlightClassName='bg-yellow-200'
              searchWords={[search ?? '']}
              autoEscape={true}
              textToHighlight={result.name}
            />
          </p>
        </li>;
      }
      return (
        <li
          key={result.link}
          className='cursor-pointer px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-50'
        >
          <a
            href={result.href}
            target='_blank'
            rel='noopener noreferrer'
            className='ellipsis block text-blue-500 hover:underline'
            title={result.name}
          >
            <Highlighter
              highlightClassName='bg-yellow-200'
              searchWords={[search ?? '']}
              autoEscape={true}
              textToHighlight={result.name}
            />
          </a>
        </li>
      );
    }
  };

  const makeAncestorsString = (ancestors: string) => {
    const ancestorsArray = ancestors.split('/').slice(1);
    // for each element, get title from title:id
    ancestorsArray.forEach((ancestor, index) => {
      const [title, id] = ancestor.split(':');
      ancestorsArray[index] = title;
    });
    // join title with >
    return ancestorsArray.join(' > ');
  };

  return (
    <Container
      loading={loading}
      className='max-h-[700px] overflow-y-auto rounded-lg border p-4 shadow-sm'
    >
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-primary text-lg font-semibold'>{title}</h2>
        <div className='text-sm'>
          <span className='font-bold'>
            {i18n.language === 'uz' ? 'Jami' : 'Всего'}: {count ?? 0}{' '}
          </span>
          {count > MAX_DISPLAY_COUNT && (
            <span>
              (
              {i18n.language === 'uz'
                ? `max: ${MAX_DISPLAY_COUNT}`
                : `макс: ${MAX_DISPLAY_COUNT}`}
              )
            </span>
          )}
        </div>
      </div>

      {count === 0 ? (
        <p>
          {i18n.language === 'uz'
            ? 'Hech narsa topilmadi'
            : 'Ничего не найдено'}
        </p>
      ) : (
        <>
          <ul className='space-y-2 divide-y divide-gray-200'>
            {prepareResults(results, type)
              .slice(0, Math.min(displayCount, MAX_DISPLAY_COUNT))
              .map((result) => renderResult(result))}
          </ul>
          {displayCount < Math.min(count, MAX_DISPLAY_COUNT) && (
            <button
              className='text-primary mt-4 w-full px-3 py-1 text-center hover:underline focus:outline-none'
              onClick={() => setDisplayCount((prevCount) => prevCount + 10)}
            >
              {i18n.language === 'uz'
                ? "Yana 10 ta ko'rsatish..."
                : 'Показать еще 10...'}
            </button>
          )}
        </>
      )}
    </Container>
  );
}
