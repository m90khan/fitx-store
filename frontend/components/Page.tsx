import Head from 'next/head';
import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import media from 'css-in-js-media';

import { useRouter, NextRouter } from 'next/router';
import HeaderComp from './Header/Index';

interface Props {
  title: string | null;
  keywords?: string | null;
  description?: string | null;
  children?: ReactNode;
  functionChildren?: (name: string) => React.ReactNode;
}
export default function Page({ title, keywords, description, children }: Props) {
  const router: NextRouter = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        />
      </Head>
      <HeaderComp />
      <Container>{children}</Container>
    </>
  );
}
Page.defaultProps = {
  title: 'Fitx | Best eCommerce Store',
  description: 'Find the latest meetups and seminars in your city ',
  keywords: 'startup, meetup, events,seminars ',
};

const Container = styled.div`
  margin: 4rem auto;
  max-width: 80%;
  min-height: 70vh;
  padding: 0 3rem;
  ${media('<=phone')} {
    max-width: 95%;
    padding: 0 1rem;
  }
`;
