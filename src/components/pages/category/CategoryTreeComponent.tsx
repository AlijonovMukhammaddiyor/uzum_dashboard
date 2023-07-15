import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { HiChevronRight, HiMinusSm, HiPlusSm } from 'react-icons/hi';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import { goToCategory } from '@/components/pages/category/utils';

import { useContextState } from '@/context/Context';

import { CategoryInTree } from '@/types/category';

function CategoryTreeComponent() {
  const [activeTab, setActiveTab] = React.useState<string>('Elektronika');
  const [data, setData] = React.useState<CategoryInTree[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { dispatch } = useContextState();

  const router = useRouter();

  React.useEffect(() => {
    // fetch categories
    const api = new API(null);
    setLoading(true);
    api
      .get('/category')
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
      className='flex h-[calc(100vh-89px)] max-h-full items-start justify-start gap-4 overflow-hidden rounded-md bg-white'
    >
      <div className='relative flex h-full w-[300px] flex-col items-start justify-start gap-1 overflow-y-scroll border-b border-gray-300 bg-slate-50 p-6'>
        {parents?.map((parent, index) => (
          <ParentCategory
            name={parent}
            key={index}
            isActive={parent === activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      <div className='flex h-full flex-1 flex-col gap-6 overflow-y-scroll p-6'>
        {data?.map((category) => {
          if (category.title === activeTab) {
            return (
              <div key={category.categoryId} className='flex flex-col gap-3'>
                <RenderChildren
                  category={category}
                  parent={category}
                  className=''
                  goToCategory={goToCategory}
                  router={router}
                  dispatch={dispatch}
                  depth={0}
                  parentPath={{
                    Kategoriyalar: '/category',
                  }}
                />
              </div>
            );
          }
        })}
      </div>
    </Container>
  );
}

function RenderChildren({
  category,
  parent,
  className,
  goToCategory,
  router,
  dispatch,
  depth = 0,
  parentPath = {},
}: {
  category: CategoryInTree;
  parent: CategoryInTree;
  className: string;
  goToCategory: (id: number, title: string, router: NextRouter) => void;
  router: NextRouter;
  dispatch: React.Dispatch<any>;
  depth?: number;
  parentPath: Record<string, string>;
}) {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(depth === 0);
  const hasChildren = category.children && category.children.length > 0;

  const categoryPath = {
    ...parentPath,
    [category.title]: `/category/${category.title}--${category.categoryId}`,
  };

  return (
    <div
      className={clsxm(
        'my-2 flex flex-col items-start justify-start gap-1',
        className
      )}
      key={category.categoryId}
    >
      <div
        className='flex items-center gap-2'
        style={{ paddingLeft: `${depth * 20}px` }} // Indent children
      >
        {hasChildren && (
          <div
            className={clsxm(
              'bg-primary flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-white hover:bg-purple-600',
              isExpanded && 'bg-purple-500'
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <HiMinusSm className='cursor-pointer' />
            ) : (
              <HiPlusSm className='cursor-pointer' />
            )}
          </div>
        )}
        <p
          className={clsxm(
            'hover:text-primary group flex cursor-pointer items-center justify-start gap-2 rounded-md p-1 text-sm font-medium',
            hasChildren && 'font-semibold',
            depth === 0 && 'text-lg',
            !hasChildren && 'ml-9'
          )}
          onClick={() => {
            goToCategory(category.categoryId, category.title, router);
            dispatch({
              type: 'PATH',
              payload: { path: categoryPath },
            });
          }}
        >
          {category.title}
          <HiChevronRight
            className={clsxm(
              'group-hover:text-primary',
              depth === 0 && 'text-lg'
            )}
          />
        </p>
      </div>
      {isExpanded &&
        category.children?.map((child) => {
          return (
            <RenderChildren
              key={child.categoryId}
              category={child}
              parent={category}
              className=''
              goToCategory={goToCategory}
              router={router}
              dispatch={dispatch}
              depth={depth + 1}
              parentPath={categoryPath}
            />
          );
        })}
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
  return (
    <div
      key={name}
      className={clsxm(
        'min-h-8 flex h-10 w-full shrink-0 cursor-pointer items-center justify-start gap-4 overflow-hidden rounded-md p-3',
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
