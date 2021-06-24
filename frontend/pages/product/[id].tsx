import { useRouter } from 'next/router';
import Page from '../../components/Page';
import SingleProduct from '../../components/Product/SingleProduct';

const ProductPage = () => {
  const { query } = useRouter();
  return (
    <Page>
      <SingleProduct id={query.id} />{' '}
    </Page>
  );
};

export default ProductPage;
