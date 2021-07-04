import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import getUser from '../components/GetUser';
import CTA from '../components/Home/CTA';
import Features from '../components/Home/Features';
import HeroCard from '../components/Home/HeroCard';
import Page from '../components/Page';
import Products from '../components/Products';
import PrimaryBtn from './../components/lib/PrimaryBtn';
const Home = () => {
  const { query, pathname } = useRouter();
  const user = getUser();
  const page = +query.page;
  return (
    <Page>
      <HeroCard />
      <Features />

      <Products page={page || 1} />
      {/* <Pagination page={page || 1} /> */}
      <div className='text-center flex justify-center'>
        <Link href='/products'>
          <a>
            <PrimaryBtn text='View All Products' svg={true} />
          </a>
        </Link>
      </div>
      <CTA />
    </Page>
  );
};

export default Home;

/*
- checkout address string and update in backend
video for linkup sando and mellow


*/
