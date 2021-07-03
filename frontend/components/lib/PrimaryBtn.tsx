import React from 'react';

const PrimaryBtn = ({ text = 'Discover', svg = false }) => {
  return (
    <button className='flex   items-center mt-4 px-3 py-2 bg-gray-900 text-white text-sm uppercase font-medium rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-500'>
      <span>{text}</span>
      {svg && (
        <svg
          className=' h-5 w-5 mx-2'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
        </svg>
      )}
    </button>
  );
};

export default PrimaryBtn;
