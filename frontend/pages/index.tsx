import Products from '../components/Products';
import Pagination from '../components/Pagination';
import Head from 'next/head';

import React from 'react';
import Page from '../components/Page';
import { useRouter } from 'next/router';
import getUser from '../components/GetUser';

const Home = () => {
  const { query, pathname } = useRouter();
  const user = getUser();
  const page = +query.page;
  return (
    <Page>
      <Head>
        <title>Sando Store</title>
      </Head>
      <h1>{user && user.name + ' ' + user.email} </h1>
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </Page>
  );
};

export default Home;
