import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { perPage } from '../config';
import PrimaryBtn from './lib/PrimaryBtn';
import Product from './ProductCard';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    latestProducts: allProducts(first: $first, skip: $skip) {
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
export const FEATURED_PRODUCTS_QUERY = gql`
  query FEATURED_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    featuredProducts: allProducts(first: $first, skip: $skip) {
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

const Products = ({ page }) => {
  const PaginateObject = {
    skip: page * perPage - perPage,
    first: perPage,
  };

  const {
    data: latestProductsData,
    error,
    loading,
  } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: 0,
      first: 4,
    },
  });

  const {
    data: featuredProductsData,
    error: featuredError,
    loading: featuredLoading,
  } = useQuery(FEATURED_PRODUCTS_QUERY, {
    variables: {
      skip: 4,
      first: 4,
    },
  });
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>error:{error.message}</h1>;
  return (
    <section className='bg-white '>
      <div className='container max-w-screen-xl mx-auto flex items-center flex-wrap pt-4 pb-12'>
        <nav id='store' className='w-full z-10 top-0 px-1 sm:px-8 py-1'>
          <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0   py-3'>
            <a
              className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
              href='#'
            >
              Latest Products
            </a>
            <Link href='/products'>
              <div className='flex items-center z-0' id='store-nav-content'>
                <PrimaryBtn text='View All' svg={false} />
              </div>
            </Link>
          </div>
        </nav>
        <div className='min-w-full  grid  gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4'>
          {latestProductsData &&
            latestProductsData.latestProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
        </div>
      </div>
      <div className='container max-w-screen-xl mx-auto flex items-center flex-wrap pt-4 pb-12'>
        <nav id='store' className='w-full z-10 top-0 px-1 sm:px-8 py-1'>
          <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0  py-3'>
            <a
              className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
              href='#'
            >
              Featured Products
            </a>
            <Link href='/products'>
              <div className='flex items-center z-0' id='store-nav-content'>
                <PrimaryBtn text='View All' svg={false} />
              </div>
            </Link>
          </div>
        </nav>
        <div className='min-w-full  grid  gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4'>
          {featuredProductsData &&
            featuredProductsData.featuredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
