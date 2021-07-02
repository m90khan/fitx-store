import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200'>
          <div className='sm:col-span-12 lg:col-span-3'>
            <div className='mb-2'>
              <a
                className='uppercase flex tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
                href='/'
              >
                <svg
                  className='fill-current text-gray-800 mr-2'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z' />
                </svg>
                Store
              </a>
            </div>
            <div className='text-sm text-gray-600'>
              <a
                className='text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out'
                href='/'
                style={{ outline: 'none' }}
              >
                Terms
              </a>{' '}
              ·{' '}
              <a
                className='text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out'
                href='/'
                style={{ outline: 'none' }}
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className='sm:col-span-6 md:col-span-3 lg:col-span-2'>
            <h6 className='text-gray-800 font-medium mb-2'>Products</h6>
            <ul className='text-sm'>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Single Sofa
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Three Seater Sofa
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Custom Beds
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Sofa Sets
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Chairs
                </a>
              </li>
            </ul>
          </div>
          <div className='sm:col-span-6 md:col-span-3 lg:col-span-2'>
            <h6 className='text-gray-800 font-medium mb-2'>Resources</h6>
            <ul className='text-sm'>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/orders'
                  style={{ outline: 'none' }}
                >
                  Orders
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/account/register'
                  style={{ outline: 'none' }}
                >
                  Register
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Blog
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Support Center
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>
          <div className='sm:col-span-6 md:col-span-3 lg:col-span-2'>
            <h6 className='text-gray-800 font-medium mb-2'>Company</h6>
            <ul className='text-sm'>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Home
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/about'
                  style={{ outline: 'none' }}
                >
                  About us
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Company values
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/Sell'
                  style={{ outline: 'none' }}
                >
                  Sell Products
                </a>
              </li>
              <li className='mb-2'>
                <a
                  className='text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out'
                  href='/'
                  style={{ outline: 'none' }}
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className='sm:col-span-6 md:col-span-3 lg:col-span-3'>
            <h6 className='text-gray-800 font-medium mb-2'>Subscribe</h6>
            <p className='text-sm text-gray-600 mb-4'>
              Get the latest news and articles to your inbox every month.
            </p>
            <form>
              <div className='flex flex-wrap mb-4'>
                <div className='w-full'>
                  <label className='block text-sm sr-only' htmlFor='newsletter'>
                    Email
                  </label>
                  <div className='relative flex items-center max-w-xs'>
                    <input
                      id='newsletter'
                      type='email'
                      className='form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm'
                      placeholder='Your email'
                      required
                      style={{ outline: 'none' }}
                    />
                    <button
                      type='submit'
                      className='absolute inset-0 left-auto'
                      aria-label='Subscribe'
                      style={{ outline: 'none' }}
                    >
                      <span
                        className='absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300'
                        aria-hidden='true'
                      ></span>
                      <svg
                        className='w-3 h-3 fill-current text-gray-600 mx-3 flex-shrink-0'
                        viewBox='0 0 12 12'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z'
                          fillRule='nonzero'
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200'>
          <ul className='flex mb-4 md:order-1 md:ml-4 md:mb-0'>
            <li>
              <a
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Twitter'
                href='/'
                style={{ outline: 'none' }}
              >
                <svg
                  className='w-8 h-8 fill-current'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z'></path>
                </svg>
              </a>
            </li>

            <li className='ml-4'>
              <a
                className='flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out'
                aria-label='Facebook'
                href='/'
                style={{ outline: 'none' }}
              >
                <svg
                  className='w-8 h-8 fill-current'
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z'></path>
                </svg>
              </a>
            </li>
          </ul>
          <div className='text-sm text-gray-600 mr-4'>
            Made by{' '}
            <a
              className='text-gray-900 font-bold hover:underline'
              href='https://uxdkhan.cf/'
              style={{ outline: 'none' }}
            >
              uxdKhan
            </a>
            . All rights reserved.
          </div>
        </div>{' '}
      </div>
    </footer>
  );
};

export default Footer;
