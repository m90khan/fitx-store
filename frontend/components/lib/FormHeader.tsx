import React from 'react';

const FormHeader = ({ text }) => {
  return (
    <>
      <div className='flex justify-center py-4'>
        <div className='flex bg-gray-200 rounded-full md:p-4 p-2 border-2 border-gray-900'>
          <svg
            className='w-8 h-8 text-black'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
            ></path>
          </svg>
        </div>
      </div>

      <div className='flex justify-center'>
        <div className='flex'>
          <h1 className='text-gray-600 font-bold md:text-2xl text-xl'>{text}</h1>
        </div>
      </div>
    </>
  );
};

export default FormHeader;
