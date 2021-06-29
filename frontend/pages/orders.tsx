import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Page from '../components/Page';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
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

const ordersPage = () => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  const { allOrders } = data;
  return (
    <Page>
      <h1>our Orders ({allOrders.length}) Hello</h1>
    </Page>
  );
};

export default ordersPage;
