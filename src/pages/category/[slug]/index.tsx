import { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Layout from '@/components/layout/Layout';
import CategoryComponent from '@/components/pages/category/slug/CategoryComponent';
import { reverseSlug } from '@/components/pages/category/utils';
import Seo from '@/components/Seo';
import Tabs from '@/components/shared/Tabs';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface Props {
  user: UserType;
}

interface CategoryType {
  categiry_id: number;
  ancestors: string;
}

function Category({ user }: Props) {
  const { t, i18n } = useTranslation('tabs');
  const [rendered, setRendered] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>(
    t('categories.goods')
  );
  const { dispatch, state } = useContextState();
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { title, id } = reverseSlug(slug);

  React.useEffect(() => {
    setRendered(true);
    dispatch({ type: 'USER', payload: { user } });
    const api = new API(null);
    api
      .get<unknown, AxiosResponse<CategoryType>>(
        `/category/current/` + id + '/'
      )
      .then((res) => {
        logger(res, 'category');
        const data = res.data;
        const categoryPath = buildPathFromAncestors(data.ancestors, title, id);
        if (data.ancestors) {
          dispatch({
            type: 'PATH',
            payload: { path: categoryPath },
          });
        }
      })
      .catch((err) => {
        logger(err, 'error in category shops');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);
  useEffect(() => {
    setActiveTab(t('categories.goods'));
  }, [t, i18n.language]);
  if (!rendered) return <></>;

  return (
    <Layout>
      <Seo />

      <div className='flex w-max items-center justify-start gap-3 rounded-md border border-slate-400 px-2 py-1'>
        <p className='text-sm font-semibold'>URL:</p>
        <a
          href={`https://uzum.uz/uz/category/${title}-${id}`}
          className='text-sm text-blue-500 hover:underline'
          target='_blank'
        >
          https://uzum.uz/{i18n.language}/category/{title}-{id}
        </a>
      </div>

      <Tabs
        tabs={[
          t('categories.goods'),
          t('categories.trend'),
          t('categories.subcategories'),
          t('categories.segmentation'),
          t('categories.sellers'),
          // 'Kunlik',
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4'
      />
      <CategoryComponent activeTab={activeTab} categoryId={id} title={title} />
    </Layout>
  );
}

function buildPathFromAncestors(
  ancestors: string,
  current_title?: string,
  current_id?: string,
  language?: string
) {
  const categoryPath: {
    [key: string]: string;
  } = {};
  const ancestorsArray = ancestors.split('/');
  ancestorsArray.forEach((ancestor) => {
    const [title, id] = ancestor.split(':');
    if (Number(id) === 1) {
      categoryPath[
        language === 'uz' ? 'Kategoriyalar' : 'Категории'
      ] = `/category`;
    } else {
      categoryPath[title] = `/category/${title}--${id}`;
    }
  });

  if (current_title && current_id) {
    categoryPath[current_title] = `/category/${current_title}--${current_id}`;
  }
  return categoryPath;
}

export default Category;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res: UserType = await api.getCurrentUser();

    if (!res) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      };
    }

    if (res.tariff === 'free') {
      return {
        redirect: {
          permanent: false,
          destination: '/category',
        },
        props: {},
      };
    }

    const slug = context.query.slug as string;

    const id = slug.split('--')[1].trim();
    if (!id) {
      return {
        redirect: {
          permanent: false,
          destination: '/category',
        },
        props: {},
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'uz', [
          'common',
          'tabs',
          'categories',
          'tableColumns',
        ])),
        user: res,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/category',
      },
      props: {},
    };
  }
}
