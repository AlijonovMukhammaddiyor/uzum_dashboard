import { useRouter } from 'next/router';
import React from 'react';
import { HiChevronRight } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import { CategoryInTree } from '@/types/category';

export interface CategoryComponentProps {
  data: CategoryInTree[];
}

function CategoryComponent({ data }: CategoryComponentProps) {
  const [activeTab, setActiveTab] = React.useState<string>('Elektronika');
  const router = useRouter();
  const parents = data.map((category) => category.title);

  const goToCategory = (title: string) => {
    const slug = title.replace(/\s+/g, '-').toLowerCase();
    router.push(`/category/${slug}`);
  };

  return (
    <div className='items-centerjustify-start flex w-full gap-4 overflow-hidden rounded-md bg-white'>
      <div className='relative flex w-[250px] flex-col items-start justify-start gap-1 border-r border-gray-300 bg-slate-50 p-2'>
        <div
          className={clsxm(
            'absolute left-0 top-0 h-10 w-1 transition-transform duration-300'
          )}
          style={{
            transform: `translateY(${parents.indexOf(activeTab) * 50}px)`,
          }}
        ></div>
        {parents.map((parent, index) => (
          <ParentCategory
            name={parent}
            key={index}
            isActive={parent == activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      <div className='flex flex-1 flex-col flex-wrap gap-6'>
        {data.map((category) => {
          if (category.title === activeTab) {
            return (
              <div
                key={category.categoryId}
                className='flex flex-col gap-3 p-3'
              >
                <p
                  onClick={() => {
                    goToCategory(category.title);
                  }}
                  className='hover:text-primary flex cursor-pointer items-center justify-start gap-3 font-semibold'
                >
                  <span>{category.title}</span>
                  <HiChevronRight className='h-4 w-4 shrink-0' />
                </p>
                <div className='flex flex-wrap items-start justify-start space-x-2'>
                  {category.children
                    ?.sort(
                      // based on number of children
                      (a, b) => {
                        if (!a.children) return 1;
                        if (!b.children) return -1;
                        return b.children?.length - a.children?.length;
                      }
                    )
                    .map((subcategory) => {
                      return renderChildren(subcategory, '', goToCategory);
                    })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

function renderChildren(
  subcategory: CategoryInTree,
  className: string,
  goToCategory: (title: string) => void
) {
  return (
    <div
      className={clsxm(
        'mx-2 my-2 flex h-max w-[280px] flex-col items-start justify-start gap-3 px-4',
        className
      )}
    >
      <p
        onClick={() => {
          goToCategory(subcategory.title);
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
                goToCategory(subcategory.title);
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

export default CategoryComponent;
