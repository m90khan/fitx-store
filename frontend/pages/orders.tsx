import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import getUser from '../components/GetUser';
import Page from '../components/Page';
import OrderItem from './../components/Order/OrderItem';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY($id: ID!) {
    allOrders(where: { user: { id: $id } }) {
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
  const user = getUser();
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY, {
    variables: {
      id: user?.id,
    },
  });
  console.log(user);
  if (loading) return <p>Loading...</p>;
  const { allOrders } = data;
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  return (
    <Page>
      <div className='flex justify-center my-6'>
        <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
          <div className='container max-w-screen-xl mx-auto flex items-center flex-wrap pt-4  '>
            <nav id='store' className='w-full z-10 top-0 px-6 py-1'>
              <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
                <div className=' tracking-wide no-underline hover:no-underline  '>
                  <h1 className='uppercase font-bold text-gray-800 text-xl'>
                    {' '}
                    Welcome {user && user.name}
                  </h1>
                  <p>{user && user.email}</p>
                </div>

                <div className='flex items-center z-0' id='store-nav-content'>
                  <h1 className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '>
                    Total Orders: {allOrders.length}
                  </h1>
                </div>
              </div>
            </nav>{' '}
          </div>
          <hr className='pb-6 mt-6' />

          <div className='flex-1'>
            {allOrders.length == 0 && <h1>You have no orders yet!</h1>}
            {allOrders &&
              allOrders.map((order) => (
                <table className='w-full text-sm lg:text-base'>
                  <thead>
                    <tr className='h-12 uppercase'>
                      <th className='hidden md:table-cell'></th>
                      <th className='text-left'>Order nr: {order.id}</th>
                      <th className='lg:text-right text-left pl-5 lg:pl-0'>
                        <span className='lg:hidden' title='Quantity'>
                          Qtd
                        </span>
                        <span className='hidden lg:inline'>Quantity</span>
                      </th>
                      <th className='hidden text-right md:table-cell'>Unit price</th>
                      <th className='text-right'>Total price</th>{' '}
                      <th className='text-right'>
                        {' '}
                        <button
                          className='w-auto bg-gray-900 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'
                          onClick={() => {
                            router.push('/order/' + order.id);
                          }}
                        >
                          Details
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {order.items.map((item) => (
                        <OrderItem key={item.id} item={item} orderId={order.id} />
                      ))}
                    </>
                  </tbody>
                </table>
              ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ordersPage;
