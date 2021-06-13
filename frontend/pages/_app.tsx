import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from './../styles/GlobalStyles';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import 'antd/dist/antd.css';
import Router from 'next/router';
import './../styles/nprogress.css';
const theme: DefaultTheme = {
  colors: {
    primary: '#0070f3',
  },
};
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
