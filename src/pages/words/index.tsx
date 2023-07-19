import { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';
import * as React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface WordsProps {
  user: UserType;
}

interface SeachesType {
  date_pretty: string;
  words: {
    [key: string]: number;
  };
}

export default function Words({ user }: WordsProps) {
  const { dispatch } = useContextState();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [seaches, setSeaches] = React.useState<SeachesType[]>([]);

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<any>>('/badge/seaches/')
      .then((res) => {
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          data[i].words = JSON.parse(data[i].words);
        }
        setSeaches(data);
        logger(data, 'Top seaches');
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting top seaches');
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Seo />
      <div className='w-full rounded-md p-3'>{/* <WordsCloud /> */}</div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res = await api.getCurrentUser();

    return {
      props: {
        user: res,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
