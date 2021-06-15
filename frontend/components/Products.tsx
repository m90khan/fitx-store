import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Product from './Product';
const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Products = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>error:{error.message}</h1>;
  return (
    <div>
      <h1>Products</h1>
      {data && data.allProducts.map((product) => <Product product={product} />)}
    </div>
  );
};

export default Products;
