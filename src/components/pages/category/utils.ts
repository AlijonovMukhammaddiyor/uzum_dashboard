import { NextRouter } from 'next/router';

export const goToCategory = (id: number, title: string, router: NextRouter) => {
  // ther might be both dash and space in the title
  router.push(`/category/${title}--${id}`);
};

export const slugToName = (slug: string) => {
  const arr = slug.split('--');
  const title = arr[0];
  const id = arr[1];
  return { title: title.charAt(0).toUpperCase() + title.slice(1), id };
};

export const reverseSlug = (slug: string) => slugToName(slug as string);
