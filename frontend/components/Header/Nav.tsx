import Link from 'next/link';
import styled from 'styled-components';
import media from 'css-in-js-media';

export default function Nav() {
  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {true && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <button type='button'>Cart</button>
        </>
      )}
      {!false && (
        <>
          <Link href='/signin'>Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  a,
  button {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.5rem;

    background: none;
    color: var(--black);
    border: 0;
    cursor: pointer;
    ${media('<=tablet', '>phone')} {
      padding: 0 1rem;
    }
    @media (max-width: 400px) {
      font-size: 1.3rem;

      padding: 0 0.5rem;
    }
    &:after {
      height: 4px;
      background: var(--red);
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 4rem;
    }
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  /* @media (max-width: 1300px) {
    border-top: 1px solid var(--lightGray);
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  } */
`;
