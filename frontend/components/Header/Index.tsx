import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

export default function HeaderComp() {
  return (
    <HeaderStyles>
      <div className='bar'>
        <Logo>
          <Link href='/'>Sando Store</Link>
        </Logo>
        <Nav />
        <div className='sub-bar'>
          <p>Search</p>
        </div>
      </div>
    </HeaderStyles>
  );
}

const Logo = styled.h1`
  margin: 1rem 0;
  position: relative;
  z-index: 2;
  background: var(--red);

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
  .bar {
    display: grid;
    grid-template-columns: auto 1fr 0.5fr;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: auto;
    border-bottom: 1px solid var(--black, black);
  }
`;
