import { useRouter } from 'next/router';
import Page from '../../components/Page';
import Pagination from '../../components/Pagination';
import Shop from '../../components/Shop';
const productsPage = () => {
  const { query, pathname } = useRouter();
  const page = +query.page;
  return (
    <Page>
      <Shop page={page || 1} />
      <Pagination page={page || 1} />
    </Page>
  );
};
export default productsPage;
