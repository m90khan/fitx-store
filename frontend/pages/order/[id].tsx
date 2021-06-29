import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React from 'react';
import Alert from '../../components/lib/Alert';
import Page from '../../components/Page';
const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;
const SingleOrderPage = () => {
  const { query } = useRouter();
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <Alert status='Error: ' text={error.message} />;
  const { order } = data;
  return (
    <Page>
      <h1> apple {query.id}</h1>
      <p>{order.id}</p>
    </Page>
  );
};

export default SingleOrderPage;
