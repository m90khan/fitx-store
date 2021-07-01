import React from 'react';

const HeroCard = () => {
  return (
    <div className='container mx-auto px-6'>
      <div
        className=' h-80 rounded-md overflow-hidden bg-cover sm:bg-center  bg-right'
        style={{
          backgroundImage: "url('/images/site/hero-1.png')",
        }}
      >
        <div className='bg-gray-900 bg-opacity-50 flex items-center h-full  '>
          <div className='ml-30 mt-30 px-20 max-w-xl'>
            <h2 className='text-2xl text-white font-semibold'>
              New Furniture Collections <br></br> Trends 2021
            </h2>
            <p className='mt-2 text-gray-300'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere
              provident molestias ipsam sint voluptatum pariatur.
            </p>
            <button className='flex items-center mt-4 px-3 py-2 bg-gray-900 text-white text-sm uppercase font-medium rounded hover:bg-gray-700 focus:outline-none focus:bg-blue-500'>
              <span>Shop Now</span>
              <svg
                className='h-5 w-5 mx-2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='md:flex mt-8 md:-mx-4  '>
        <div
          className='w-full  h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-right-bottom md:w-1/2'
          style={{
            backgroundImage: "url('/images/site/hero-2.png')",
          }}
        >
          <div className='bg-gray-900 bg-opacity-50 flex items-center h-full'>
            <div className='px-10 max-w-xl'>
              <h2 className='text-2xl text-white font-semibold'>Back Pack</h2>
              <p className='mt-2 text-gray-300'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere
                provident molestias ipsam sint voluptatum pariatur.
              </p>
              <button className='flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none'>
                <span>Shop Now</span>
                <svg
                  className='h-5 w-5 mx-2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className='w-full  h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2'
          style={{
            backgroundImage: "url('/images/site/hero-3.png')",
          }}
        >
          <div className='bg-gray-900 bg-opacity-50 flex items-center h-full'>
            <div className='px-10 max-w-xl'>
              <h2 className='text-2xl text-white font-semibold'>Games</h2>
              <p className='mt-2 text-gray-300'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere
                provident molestias ipsam sint voluptatum pariatur.
              </p>
              <button className='flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none'>
                <span>Shop Now</span>
                <svg
                  className='h-5 w-5 mx-2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default HeroCard;
