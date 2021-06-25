import Link from 'next/link';
import styled from 'styled-components';
import media from 'css-in-js-media';
import { useState } from 'react';
import { Cart } from './Cart';
import getUser from '../GetUser';
import Router from 'next/router';
import Logout from '../Logout';

export default function Header() {
  const [menu, setMenu] = useState(false);
  const user = getUser();
  console.log(user);
  const [showCart, setShowCart] = useState(false);
  const menuClassName = `${
    !menu && 'hidden'
  } delay-500 md:flex md:items-center md:w-auto w-full order-2 md:order-1`;
  return (
    <>
      <nav className='relative w-full z-30 top-0 py-1 shadow-xl'>
        <div className='max-w-screen-xl container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3'>
          <label
            htmlFor='menu-toggle'
            className='delay-500 cursor-pointer md:hidden block'
            onClick={() => setMenu(!menu)}
          >
            <svg
              className='fill-current text-gray-900'
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
            >
              <title>menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
            </svg>
          </label>
          <div className='order-1 md:order-1'>
            <a
              className='flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
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
              SANDO
            </a>
          </div>
          <div className={menuClassName}>
            <nav>
              <ul className='md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0'>
                <li>
                  <a
                    className='inline-block no-underline hover:text-black hover:underline py-2 px-4'
                    href='/products'
                  >
                    Shop
                  </a>
                </li>
                {user && (
                  <>
                    <li>
                      <a
                        className='inline-block no-underline hover:text-black hover:underline py-2 px-4'
                        href='/sell'
                      >
                        Sell
                      </a>
                    </li>

                    <li>
                      <a
                        className='inline-block no-underline hover:text-black hover:underline py-2 px-4'
                        href='/orders'
                      >
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        className='inline-block no-underline hover:text-black hover:underline py-2 px-4'
                        href='/account'
                      >
                        Account
                      </a>
                    </li>
                  </>
                )}
                <li>
                  <a
                    className='inline-block no-underline hover:text-black hover:underline py-2 px-4'
                    href='/about'
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className='order-3 md:order-3 flex items-center'>
            {user && <Logout />}
            <a
              className='inline-block  pl-3 no-underline hover:text-black'
              onClick={() =>
                Router.push({
                  pathname: `/account/login`,
                })
              }
            >
              <svg
                className='fill-current hover:text-black'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <circle fill='none' cx='12' cy='7' r='3' />
                <path d='M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z' />
              </svg>
            </a>

            <a
              className=' relative pl-3 inline-block no-underline hover:text-black'
              href='#'
              onClick={() => setShowCart(!showCart)}
            >
              <div className='absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white'>
                3
              </div>

              <svg
                className='fill-current hover:text-black'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z' />
                <circle cx='10.5' cy='18.5' r='1.5' />
                <circle cx='17.5' cy='18.5' r='1.5' />
              </svg>
            </a>
          </div>
        </div>
        {showCart && <Cart />}
      </nav>
    </>
  );
}

const Logo = styled.h1`
  margin: 1rem 0;
  position: relative;
  z-index: 2;
  background: var(--primary);
  ${media('<=tablet', '>phone')} {
    text-align: center;
  }
  a {
    color: white;
    font-weight: 700;
    font-size: 2rem;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  display: grid;
  grid-template-columns: auto 1fr 0.5fr;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  ${media('<=desktop', '>tablet')} {
    grid-template-columns: auto 1fr;
    padding: 0 1rem;
  }
  ${media('<=tablet')} {
    grid-template-columns: auto 1fr;
    padding: 0 1rem;
  }
  @media (max-width: 400px) {
    grid-template-columns: auto;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: auto;
    border-bottom: 1px solid var(--black, black);
  }
`;
