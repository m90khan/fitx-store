import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Alert from '../lib/Alert';
import ProductDetails from './ProductDetails';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      price
      name
      description
      gallery {
        altText
        image {
          publicUrlTransformed
        }
      }
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
      {loading && <Alert text='Loading ...' status='Loading Product' />}
      {data && <ProductDetails product={data.Product} />}
    </>
  );
};

export default SingleProduct;
