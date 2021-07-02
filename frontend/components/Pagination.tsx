import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { perPage } from '../config';
import Alert from './lib/Alert';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return <Alert text='Loading ...' status='Creating Product' />;
  if (error) return <Alert text={error.message} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <div className='text-center flex justify-center w-full'>
      <ul className='flex'>
        {page !== 1 && (
          <li className='mx-1 px-3 py-2 bg-gray-900 text-gray-100 hover:bg-gray-700 hover:text-gray-300 rounded-lg'>
            <Link href={`/products/${page - 1}`}>
              <a className='flex items-center font-bold' aria-disabled={page <= 1}>
                ← Prev
              </a>
            </Link>
          </li>
        )}
        <li className='mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg'>
          <a className='font-bold' href='#'>
            Page {page} of {pageCount}
          </a>
        </li>
        <li className='mx-1 px-3 py-2 bg-gray-200 text-gray-700    rounded-lg'>
          <p className='font-bold'>{count} Items Total</p>
        </li>
        {page < pageCount && (
          <>
            <li className='mx-1 px-3 py-2 bg-gray-900 text-gray-100 hover:bg-gray-700 hover:text-gray-300 rounded-lg'>
              <Link href={`/products/${page + 1}`}>
                <a className='flex items-center font-bold'>Next →</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
