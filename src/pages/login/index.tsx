import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { API } from '@/lib/api';

import LoginComponent from '@/components/pages/login/LoginComponent';

const Login = () => {
  return (
    <div className='min-h-screen w-screen'>
      <LoginComponent />
    </div>
  );
};

export default Login;
// export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await API.checkClientAuthenticated(context);

  if (res) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
}
