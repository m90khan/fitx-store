import Pagination from '../../components/Pagination';
import Page from '../../components/Page';
import Products from '../../components/Products';
import { useRouter } from 'next/router';
const productsPage = () => {
  const { query, pathname } = useRouter();
  console.log(pathname, typeof pathname);
  const page = +query.page;
  return (
    <Page>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </Page>
  );
};
export default productsPage;
