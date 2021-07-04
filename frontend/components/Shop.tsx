import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import SearchBtn from './Buttons/SearchBtn';
import Product from './ProductCard';
export const ALL_PRODUCTS_QUERY_ASC = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip, sortBy: price_ASC) {
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

const Shop = ({ page }) => {
  const PaginateObject = {
    skip: page * perPage - perPage,
    first: perPage,
  };

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY_ASC, {
    variables: PaginateObject,
  });

  console.log(data);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>error:{error.message}</h1>;
  return (
    <section className='bg-white '>
      <div className='container max-w-screen-xl mx-auto flex items-center flex-wrap pt-4 pb-12'>
        <nav id='store' className='w-full z-10 top-0 px-6 py-1'>
          <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
            <a
              className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
              href='#'
            >
              Store
            </a>

            <div className='flex items-center z-0' id='store-nav-content'>
              <a className='pl-3 inline-block no-underline hover:text-black' href='#'>
                <svg
                  className='fill-current hover:text-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z' />
                </svg>
              </a>
              <SearchBtn />
            </div>
          </div>
        </nav>
        <div className='min-w-full  grid  gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4'>
          {data &&
            data.allProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
        </div>
      </div>
    </section>
  );
};

const ProductsContainer = styled.div`
  padding: 5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
`;

export default Shop;
