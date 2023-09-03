import { useTranslation } from 'next-i18next';
import React from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

// up icon from react-icons/io5
import Container from '@/components/layout/Container';
import CustomCheckbox from '@/components/shared/CustomCheckbox';

import { CategoryInTree } from '@/types/category';

function CategoriesSelect({
  className,
  selectedCategories,
  setSelectedCategories,
}: {
  className?: string;
  selectedCategories: Set<number>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  const [data, setData] = React.useState<CategoryInTree[]>([]);
  const [parents, setParents] = React.useState<{
    [key: number]: number[];
  }>({});
  const [currentParent, setCurrentParent] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { i18n } = useTranslation('tableColumns');

  const handleCategoryCheck = (
    category: CategoryInTree,
    isChecked: boolean,
    updatedSelectedCategories: Set<number> = new Set(selectedCategories)
  ) => {
    if (isChecked) {
      // if another categyrID from main_category_ids is already selected, alert user that he can select only one main category and its children
      if (
        currentParent &&
        !parents[currentParent].includes(category.categoryId)
      ) {
        alert(
          // you can select only one main category and its subcategories
          i18n.language === 'uz'
            ? 'Faqatgina bir asosiy kategoriyaga tegishli ichki kategoriyalarni tanlash mumkin.'
            : 'Вы можете выбрать только одну основную категорию и ее подкатегории.'
        );
        return;
      }

      if (!currentParent)
        // search every parent and set currentParent
        for (const [key, value] of Object.entries(parents)) {
          if (value.includes(category.categoryId)) {
            setCurrentParent(Number(key));
            break;
          }
        }

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
    if (updatedSelectedCategories.size === 0) setCurrentParent(null);
    setSelectedCategories(updatedSelectedCategories);
  };

  React.useEffect(() => {
    // fetch categories
    const api = new API(null);
    setLoading(true);
    api
      .get('/category/segmentation/')
      .then((res) => {
        if (res.data.products.data.children) {
          setData(res.data.products.data.children);
          const pp: {
            [key: number]: number[];
          } = {};
          res.data.products.data.children.forEach(
            (category: CategoryInTree) => {
              const children: number[] = [];
              const traverseCategories = (category: CategoryInTree) => {
                if (category.children && category.children.length > 0) {
                  category.children.forEach((child) => {
                    traverseCategories(child);
                  });
                }
                children.push(category.categoryId);
              };
              traverseCategories(category);
              pp[category.categoryId] = children;
            }
          );
          setParents(pp);
          setLoading(false);
        }
      })
      .catch((err) => {
        logger(err, 'Error in fetching categories');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (selectedCategories.size === 0) setCurrentParent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  return (
    <Container
      loading={loading}
      className={clsxm(
        'relative z-10 flex h-[1110px] min-h-max w-[480px] flex-col items-start justify-start gap-4 rounded-none border-none bg-white pb-6 shadow-none',
        className
      )}
    >
      <div className='z-10 flex h-16 w-full items-center justify-between bg-slate-200 px-3 text-lg font-semibold '>
        <p>
          {i18n.language === 'uz' ? 'Kategoriyalar' : 'Категории'}
          <span className='text-red-500'>*</span>{' '}
          <span className='text-sm text-slate-400'>
            {i18n.language === 'uz'
              ? '(tanlanishi shart)'
              : '(обязательно к выбору)'}
          </span>
        </p>
      </div>
      <div
        className={clsxm(
          'flex h-[calc(100%-64px)] flex-1 flex-col gap-1 overflow-y-scroll p-6 pb-6 pl-3 pt-2'
        )}
      >
        <p className='text-sm'>
          {i18n.language === 'uz'
            ? 'Faqat bir asosiy kategoriyaga tegishli ichki kategoriyalarni tanlash mumkin.'
            : 'Вы можете выбрать только одну основную категорию и ее подкатегории.'}
        </p>
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
        'relative flex max-w-full flex-col items-start justify-start',
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
          'flex w-full max-w-full items-center justify-start gap-2 rounded-sm px-2 py-1 ',
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
              'flex cursor-pointer items-center justify-start gap-1'
            )}
          >
            <p
              className={clsxm(
                'hover:text-primary ellipsis group flex cursor-pointer items-center justify-start gap-2 rounded-md p-1 text-sm font-medium',
                hasChildren && 'font-semibold',
                'line-clamp-1'
                // isExpanded && 'text-primary'
              )}
            >
              {i18n.language === 'uz' ? category.title : category.title_ru}
            </p>
            <p className='shrink-0 text-sm text-slate-400'>
              ({category.analytics} шт)
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
