import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedUser {
      id
      email
      name
    }
  }
`;

const getUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedUser;
};

export default getUser;
