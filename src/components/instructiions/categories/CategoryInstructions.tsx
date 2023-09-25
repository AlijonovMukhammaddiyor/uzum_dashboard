import Image from 'next/image';
import React from 'react';
import Zoom from 'react-medium-image-zoom';

import clsxm from '@/lib/clsxm';

import categories_list from '@/components/instructiions/categories/categories_list.png';
import category_products from '@/components/instructiions/categories/category_products.png';
import categories_products_list from '@/components/instructiions/categories/category_products_list.png';
const CategoryInstructions = () => {
  return (
    <div className='mx-auto flex w-11/12 flex-col gap-32'>
      <Zoom>
        <Image
          src={categories_list}
          alt='image1'
          className={clsxm('four-sided-shadow mx-auto', 'w-3/5')}
        />
      </Zoom>
      <Zoom>
        <Image
          src={category_products}
          alt='image1'
          className='four-sided-shadow mx-auto w-3/5'
        />
      </Zoom>
      <Zoom>
        <Image
          src={categories_products_list}
          alt='image1'
          className='four-sided-shadow mx-auto w-3/5'
        />
      </Zoom>
    </div>
  );
};

export default CategoryInstructions;
