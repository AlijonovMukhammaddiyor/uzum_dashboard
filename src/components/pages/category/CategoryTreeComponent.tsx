import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { HiChevronRight } from 'react-icons/hi';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import {
  goToCategory,
  setPathToLocalStorage,
} from '@/components/pages/category/utils';

import { CategoryInTree } from '@/types/category';

function CategoryTreeComponent() {
  const [activeTab, setActiveTab] = React.useState<string>('Elektronika');
  const [data, setData] = React.useState<CategoryInTree[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    // fetch categories
    const api = new API(null);
    setLoading(true);
    api
      .get('/category/')
      .then((res) => {
        if (res.data) {
          setData(res.data.children);
          setLoading(false);
        }
      })
      .catch((err) => {
        logger(err, 'Error in fetching categories');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parents = data?.map((category) => category.title).sort();

  return (
    <Container
      loading={loading}
      className='items-centerjustify-start flex min-h-full w-full gap-4 overflow-hidden rounded-md bg-white'
    >
      <div className='relative flex w-[250px] flex-col items-start justify-start gap-1 border-r border-gray-300 bg-slate-50 p-2'>
        {parents?.map((parent, index) => (
          <ParentCategory
            name={parent}
            key={index}
            isActive={parent === activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      <div className='flex flex-1 flex-col flex-wrap gap-6'>
        {data?.map((category) => {
          if (category.title === activeTab) {
            return (
              <div
                key={category.categoryId}
                className='flex flex-col gap-3 p-3'
              >
                <p
                  onClick={() => {
                    goToCategory(category.categoryId, category.title, router);
                    setPathToLocalStorage({
                      Kategoriyalar: '/category',
                      [category.title]: `/category/${category.categoryId}--${category.title}`,
                    });
                  }}
                  className='hover:text-primary inline-flex max-w-max cursor-pointer items-center justify-start gap-3 font-semibold'
                >
                  <span>{category.title}</span>
                  <HiChevronRight className='h-4 w-4 shrink-0' />
                </p>
                <div className='flex flex-wrap items-start justify-start space-x-2'>
                  {category.children
                    ?.sort(
                      // based on number of children
                      (a, b) => {
                        if (!a.children) return -1;
                        if (!b.children) return 1;
                        return -b.children?.length + a.children?.length;
                      }
                    )
                    .map((subcategory) => {
                      return renderChildren(
                        category,
                        subcategory,
                        '',
                        goToCategory,
                        setPathToLocalStorage,
                        router
                      );
                    })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </Container>
  );
}

function renderChildren(
  parent: CategoryInTree,
  subcategory: CategoryInTree,
  className: string,
  goToCategory: (id: number, title: string, router: NextRouter) => void,
  setPathToLocalStorage: (path: any) => void,
  router: NextRouter
) {
  return (
    <div
      className={clsxm(
        'mx-2 my-2 flex h-max w-[280px] flex-col items-start justify-start gap-3 px-4',
        className
      )}
      key={subcategory.categoryId}
    >
      <p
        onClick={() => {
          goToCategory(subcategory.categoryId, subcategory.title, router);
          setPathToLocalStorage({
            Kategoriyalar: '/category',
            [parent.title]: `/category/${parent.categoryId}--${parent.title}`,
            [subcategory.title]: `/category/${subcategory.categoryId}--${subcategory.title}`,
          });
        }}
        className='hover:text-primary flex cursor-pointer items-center justify-between gap-2 rounded-md p-1 font-semibold'
      >
        <span>{subcategory.title}</span>
        <HiChevronRight className='h-4 w-4 shrink-0' />
      </p>
      <div className='flex h-max w-full cursor-pointer flex-col items-start justify-start gap-2'>
        {subcategory.children?.map((child) => {
          return (
            <p
              key={child.categoryId}
              className='flex w-full items-center justify-between text-sm hover:text-purple-700'
              onClick={() => {
                goToCategory(child.categoryId, child.title, router);
                setPathToLocalStorage({
                  Kategoriyalar: '/category',
                  [parent.title]: `/category/${parent.categoryId}--${parent.title}`,
                  [subcategory.title]: `/category/${subcategory.categoryId}--${subcategory.title}`,
                  [child.title]: `/category/${child.categoryId}--${child.title}`,
                });
              }}
            >
              <span>{child.title}</span>
              <HiChevronRight className='h-4 w-4 shrink-0' />
            </p>
          );
        })}
      </div>
    </div>
  );
}

function ParentCategory({
  name,
  isActive,
  setActiveTab,
}: {
  name: string;
  isActive: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const makeSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <div
      key={name}
      className={clsxm(
        'flex h-10 w-full cursor-pointer items-center justify-start gap-4 overflow-hidden rounded-md p-3',
        isActive && 'bg-primary text-white',
        !isActive && 'hover:bg-gray-200'
      )}
      onClick={() => setActiveTab(name)}
    >
      <div className='flex w-[250px] flex-col items-start justify-start overflow-hidden'>
        <p className='w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>
          {name}
        </p>
      </div>
    </div>
  );
}

export default CategoryTreeComponent;
