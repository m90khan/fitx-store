import { useRouter } from 'next/router';
import React from 'react';
import getUser from '../components/GetUser';
import CTA from '../components/Home/CTA';
import Features from '../components/Home/Features';
import HeroCard from '../components/Home/HeroCard';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import Products from '../components/Products';

const Home = () => {
  const { query, pathname } = useRouter();
  const user = getUser();
  const page = +query.page;
  return (
    <Page>
      <HeroCard />
      <Features />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
      <CTA />
    </Page>
  );
};

export default Home;
