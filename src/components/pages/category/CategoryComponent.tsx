import Link from 'next/link';
import React from 'react';

import clsxm from '@/lib/clsxm';

function CategoryComponent() {
  const [activeTab, setActiveTab] = React.useState<string>('Elektronika');

  const parents = [
    'Elektronika',
    'Maishiy texnika',
    'Kiyim',
    'Poyabzallar',
    'Akssesuarlar',
    'Go`zallik',
    'Salomatlik',
    'Uy-ro`zg`or buyumlari',
    'Qurilish va ta`mirlash',
    'Avtotovarlar',
    'Bolalar tovarlari',
    'Xobbi va ijod',
    'Sport va xordiq',
    'Oziq-ovqat mahsulotlari',
    'Maishiy kimyoviy moddalar va shaxsiy gigiyena',
    'Kanselyariya tovarlari',
    'hayvonlar uchun tovarlar',
    'Kitoblar',
    'Dacha, bog` va tomorqa',
  ];

  return (
    <div className='flex w-full items-center justify-start gap-4 rounded-md bg-white p-3'>
      <div className='relative flex w-[250px] flex-col items-start justify-start'>
        <div
          className={clsxm(
            'bg-primary absolute left-0 top-0 h-10 w-1 transition-transform duration-300'
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
      <div className='flex-1'></div>
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
    <Link
      className={clsxm(
        'flex h-10 w-full cursor-pointer items-center justify-start gap-4 overflow-hidden bg-white p-3',
        isActive && 'bg-slate-300 bg-opacity-25',
        !isActive && 'hover:bg-gray-50'
      )}
      onClick={() => setActiveTab(name)}
      href={`/category/${makeSlug(name)}`}
    >
      <div className='flex w-[250px] flex-col items-start justify-start overflow-hidden'>
        <p className='w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>
          {name}
        </p>
      </div>
    </Link>
  );
}

export default CategoryComponent;
