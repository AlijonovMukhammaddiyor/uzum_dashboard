import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { API } from '@/lib/api';

export function withAuthRedirect(WrappedComponent: React.FC) {
  return function WithAuthRedirect(props: any) {
    const router = useRouter();

    useEffect(() => {
      // Make a request to the authentication status check API
      API.checkClientAuthenticated()
        .then((res) => {
          // If the user is authenticated, redirect to the dashboard
          if (res) router.push('/home');
        })
        .catch(() => {
          // If the user is not authenticated, redirect to the login page
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WrappedComponent {...props} />;
  };
}
