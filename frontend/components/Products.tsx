import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Product from './Product';
import styled from 'styled-components';

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

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>error:{error.message}</h1>;
  return (
    <div>
      <h1>Products</h1>
      <ProductsContainer>
        {data && data.allProducts.map((product) => <Product product={product} />)}
      </ProductsContainer>
    </div>
  );
};

const ProductsContainer = styled.div`
  padding: 5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
`;

export default Products;
