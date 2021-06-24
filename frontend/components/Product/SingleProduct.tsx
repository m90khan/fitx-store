import ProductDetails from './ProductDetails';
import Page from '../Page';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Alert from '../lib/Alert';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      price
      name
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  console.log(data?.Product);
  return (
    <>
      {error && <Alert text={error.message} />}
      {loading && <Alert text='Loading ...' status='Creating Product' />}
      {data && <ProductDetails product={data.Product} />}
    </>
  );
};

export default SingleProduct;
