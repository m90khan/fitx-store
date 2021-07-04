import React from 'react';

const CTA = () => {
  return (
    <div className=' mt-10 mb-10'>
      <div
        className='   bg-cover bg-bottom'
        style={{ backgroundImage: 'url(/images/site/cta.jpg)' }}
      >
        <div className='py-16 md:py-40 text-center flex flex-col items-center text-black	'>
          <h3 className='font-butler text-black text-3xl sm:text-4xl tracking-wide'>
            Trending Products
          </h3>
          <p className='font-hk text-black text-lg sm:text-xl pt-3 px-6'>
            Unique Features Of leatest & Trending Poducts
          </p>
          <a href='/products'>
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;
