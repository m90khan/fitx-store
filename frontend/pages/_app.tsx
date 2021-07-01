import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import { DefaultTheme } from 'styled-components';
import 'tailwindcss/tailwind.css';
import withData from '../utils/withData';
import GlobalStyle from './../styles/GlobalStyles';
import './../styles/nprogress.css';
import { GlobalStateProvider } from './../utils/globalContext';

const theme: DefaultTheme = {
  colors: {
    primary: '#0070f3',
  },
};
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps, apollo }) {
  return (
    <>
      <ApolloProvider client={apollo}>
        <GlobalStateProvider>
          <Component {...pageProps} />
          <GlobalStyle />
        </GlobalStateProvider>
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
