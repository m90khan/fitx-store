import Products from '../components/Products';
import Pagination from '../components/Pagination';

import React from 'react';
import Page from '../components/Page';
import { useRouter } from 'next/router';

const Home = () => {
  const { query, pathname } = useRouter();
  const page = +query.page;
  return (
    <Page>
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </Page>
  );
};

export default Home;
