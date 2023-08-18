import { useTranslation } from 'next-i18next';
import React from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import CustomCheckbox from '@/components/shared/CustomCheckbox';

import { CategoryInTree } from '@/types/category';

function CategoriesSelect({ className }: { className?: string }) {
  const [data, setData] = React.useState<CategoryInTree[]>([]);
  const [parents, setParents] = React.useState<{
    [key: number]: {
      parents: number[];
      intermediate?: boolean;
    };
  }>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const { i18n } = useTranslation('tableColumns');
  const [selectedCategories, setSelectedCategories] = React.useState<
    Set<number>
  >(new Set());

  const handleCategoryCheck = (
    category: CategoryInTree,
    isChecked: boolean,
    updatedSelectedCategories: Set<number> = new Set(selectedCategories)
  ) => {
    if (isChecked) {
      // go untill the leaf, and add leaf nodes only
      const traverseCategories = (category: CategoryInTree) => {
        if (category.children && category.children.length > 0) {
          category.children.forEach((child) => {
            traverseCategories(child);
          });
        } else updatedSelectedCategories.add(category.categoryId);
      };

      traverseCategories(category);
    } else {
      // remove all children
      const traverseCategories = (category: CategoryInTree) => {
        if (category.children && category.children.length > 0) {
          category.children.forEach((child) => {
            traverseCategories(child);
          });
        } else updatedSelectedCategories.delete(category.categoryId);
      };

      traverseCategories(category);
    }

    setSelectedCategories(updatedSelectedCategories);
  };

  React.useEffect(() => {
    // fetch categories
    const api = new API(null);
    setLoading(true);
    api
      .get('/category')
      .then((res) => {
        if (res.data) {
          const data = res.data;
          setData(data.children);
          setLoading(false);
        }
      })
      .catch((err) => {
        logger(err, 'Error in fetching categories');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      loading={loading}
      className={clsxm(
        'flex h-[calc(100vh-149px)] max-h-full w-[600px] flex-col items-start justify-start gap-4 overflow-hidden rounded-md border-none bg-white',
        className
      )}
    >
      <p className='text-lg font-semibold'>Kategoriyalar</p>
      <div className='flex h-full flex-1 flex-col gap-1 overflow-y-scroll p-6 pl-1'>
        {data?.map((category) => {
          if (i18n.language === 'uz') {
            return (
              <div key={category.categoryId} className='flex flex-col gap-3'>
                <RenderChildren
                  category={category}
                  className=''
                  depth={0}
                  handleCategoryCheck={handleCategoryCheck}
                  selectedCategories={selectedCategories}
                />
              </div>
            );
          }
          if (i18n.language !== 'uz') {
            return (
              <div key={category.categoryId} className='flex flex-col gap-3'>
                <RenderChildren
                  category={category}
                  className=''
                  depth={0}
                  selectedCategories={selectedCategories}
                  handleCategoryCheck={handleCategoryCheck}
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
  className,
  selectedCategories,
  depth = 0,
  handleCategoryCheck,
}: {
  category: CategoryInTree;
  className: string;
  selectedCategories: Set<number>;
  depth?: number;
  handleCategoryCheck: (category: CategoryInTree, isChecked: boolean) => void;
}) {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const hasChildren = category.children && category.children.length > 0;
  const { i18n } = useTranslation('tableColumns');

  const isEveryLeafChecked: boolean = React.useMemo(() => {
    if (category.children && category.children.length > 0) {
      // go untill the leaf, and see if every leaf is checked
      const traverseCategories = (category: CategoryInTree) => {
        if (category.children && category.children.length > 0) {
          // check if every leaf returns true
          const arr: boolean[] = [];

          category.children.forEach((child) => {
            arr.push(traverseCategories(child));
          });

          return arr.every((item) => item);
        } else {
          return selectedCategories.has(category.categoryId);
        }
      };

      return traverseCategories(category);
    } else return selectedCategories.has(category.categoryId);
  }, [category, selectedCategories]);

  const isAnyLeafChecked: boolean = React.useMemo(() => {
    if (!category.children || category.children.length === 0) {
      return false;
    }
    if (category.children && category.children.length > 0) {
      // go untill the leaf, and see if every leaf is checked
      const traverseCategories = (category: CategoryInTree) => {
        if (category.children && category.children.length > 0) {
          // check if every leaf returns true
          const arr: boolean[] = [];

          category.children.forEach((child) => {
            arr.push(traverseCategories(child));
          });

          return arr.some((item) => item);
        } else {
          return selectedCategories.has(category.categoryId);
        }
      };

      return traverseCategories(category);
    } else return selectedCategories.has(category.categoryId);
  }, [category, selectedCategories]);

  return (
    <div
      className={clsxm(
        'relative flex flex-col items-start justify-start',
        'my-1',
        className
      )}
      style={{
        marginLeft: depth === 0 ? '0px' : `35px`,
      }}
      key={category.categoryId}
    >
      {isExpanded && (
        <div className='absolute left-4 top-[38px] h-[calc(100%-40px)] w-[1px] bg-slate-300'></div>
      )}
      {depth !== 0 && (
        <div className='absolute -left-[18px] top-[18px] h-[1px] w-[26px] border-r border-t border-slate-400'></div>
      )}
      <div
        className={clsxm(
          'flex w-full items-center justify-start gap-2 rounded-sm px-2 py-1 ',
          isExpanded && 'bg-blue-200'
        )}
      >
        <CustomCheckbox
          checked={isEveryLeafChecked}
          // ref={(el) => el && (el.indeterminate = isIntermediate)}
          onChange={() => handleCategoryCheck(category, !isEveryLeafChecked)}
          intermediate={isAnyLeafChecked && !isEveryLeafChecked}
        />
        <div
          className={clsxm('flex w-full items-center justify-between gap-2 ')}
          onClick={() => {
            if (hasChildren) {
              setIsExpanded(!isExpanded);
            }
          }}
          // style={{ marginLeft: `${depth * 25}px` }} // Indent children
        >
          <div
            className={clsxm(
              'flex cursor-pointer items-center justify-start gap-2'
            )}
          >
            <p
              className={clsxm(
                'hover:text-primary ellipsis group flex cursor-pointer items-center justify-start gap-2 rounded-md p-1 text-sm font-medium',
                hasChildren && 'font-semibold'
                // isExpanded && 'text-primary'
              )}
            >
              {i18n.language === 'uz' ? category.title : category.title_ru}
            </p>
          </div>

          {hasChildren ? (
            isExpanded ? (
              <IoChevronUpSharp className='cursor-pointer font-semibold' />
            ) : (
              <IoChevronDownSharp className='cursor-pointer font-semibold' />
            )
          ) : null}
        </div>
      </div>

      {isExpanded &&
        category.children?.map((child) => (
          <RenderChildren
            key={child.categoryId}
            category={child}
            className=''
            selectedCategories={selectedCategories}
            depth={depth + 1}
            handleCategoryCheck={handleCategoryCheck}
          />
        ))}
    </div>
  );
}

export default CategoriesSelect;
