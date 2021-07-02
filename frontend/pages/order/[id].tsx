import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React from 'react';
import Alert from '../../components/lib/Alert';
import PrimaryBtn from '../../components/lib/PrimaryBtn';
import OrderDetailsItem from '../../components/Order/OrderDetailsItem';
import Page from '../../components/Page';
import formatCurrency from '../../utils/formatCurrency';
const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      shipping
      status
      user {
        id
        name
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
  console.log(order);
  const chargeId = order?.charge?.substring(order.charge.length - 8, order.charge.length);
  return (
    <Page>
      <div className='flex justify-center my-6'>
        <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
          <div className='container max-w-screen-xl mx-auto flex items-center flex-wrap pt-4  '>
            <nav id='store' className='w-full z-10 top-0 px-6 py-1'>
              <div className=' tracking-wide no-underline hover:no-underline  '>
                <h1 className='uppercase font-bold text-gray-800 text-xl'>
                  {' '}
                  Welcome {order.user.name}
                </h1>
              </div>
              <hr className='pb-6 mt-6' />
              <div className='w-full container mx-auto flex flex-wrap  items-center justify-between mt-0 px-2 py-3'>
                <div className=' tracking-wide no-underline hover:no-underline  '>
                  <h2 className='  font-bold text-gray-800'>Charge Id: {chargeId}</h2>
                  <h2 className='  font-bold text-gray-800'>Order Id: {order.id}</h2>
                  <h2 className='  font-bold text-gray-800'>
                    Shipping Address: {order.shipping}
                  </h2>
                </div>

                <div className='flex items-center z-0 flex-col  '>
                  <h1 className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '>
                    Total: {formatCurrency(order.total)}
                  </h1>
                  <div className='tracking-wide   no-underline hover:no-underline font-bold text-gray-800  '>
                    <PrimaryBtn text={`Status: ${order.status}`} svg={false} />
                  </div>
                </div>
              </div>
            </nav>{' '}
          </div>
          <hr className='pb-6 mt-6' />

          <div className='flex-1'>
            <table className='w-full text-sm lg:text-base'>
              <thead>
                <tr className='h-12 uppercase'>
                  <th className='hidden md:table-cell'></th>
                  <th className='text-left'>Order Id: {order.id}</th>
                  <th className='lg:text-right text-left pl-5 lg:pl-0'>
                    <span className='lg:hidden' title='Quantity'>
                      Qtd
                    </span>
                    <span className='hidden lg:inline'>Quantity</span>
                  </th>
                  <th className='hidden text-right md:table-cell'>Unit price</th>
                  <th className='text-right'>Total price</th>{' '}
                </tr>
              </thead>
              <tbody>
                <>
                  {order.items.map((item) => (
                    <OrderDetailsItem key={item.id} item={item} orderId={order.id} />
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SingleOrderPage;
