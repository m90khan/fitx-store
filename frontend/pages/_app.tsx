import { ThemeProvider, DefaultTheme } from 'styled-components';
import { ApolloProvider } from '@apollo/client';

import GlobalStyle from './../styles/GlobalStyles';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import './../styles/nprogress.css';
import withData from '../lib/withData';
import 'bootstrap/dist/css/bootstrap.min.css';

const theme: DefaultTheme = {
  colors: {
    primary: '#0070f3',
  },
};
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return (
    <>
      <ApolloProvider client={apollo}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

// serverSide
MyApp.getServerSideProps = async function ({ Component, ctx }) {
  let pageProps: any = {};
  if (Component.getServerSideProps) {
    pageProps = await Component.getServerSideProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};
export default withData(MyApp);
