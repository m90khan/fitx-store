import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import getUser from '../components/GetUser';
import OrderItem from './../components/Order/OrderItem';
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

  console.log(allOrders);
  const user = getUser();

  return (
    <>
      <div className='flex justify-center my-6'>
        <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
          <div className='flex-1'>
            <table className='w-full text-sm lg:text-base'>
              <thead>
                <tr className='h-12 uppercase'>
                  <th className='hidden md:table-cell'></th>
                  <th className='text-left'>Order</th>
                  <th className='lg:text-right text-left pl-5 lg:pl-0'>
                    <span className='lg:hidden' title='Quantity'>
                      Qtd
                    </span>
                    <span className='hidden lg:inline'>Quantity</span>
                  </th>
                  <th className='hidden text-right md:table-cell'>Unit price</th>
                  <th className='text-right'>Total price</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => (
                  <Link href={`/order/${order.id}`}>
                    <>
                      {order.items.length}
                      {order.items.map((item) => (
                        <OrderItem key={item.id} item={item} />
                      ))}
                    </>
                  </Link>
                ))}
              </tbody>
            </table>
            <hr className='pb-6 mt-6' />
          </div>
        </div>
      </div>
    </>
  );
};

export default ordersPage;
