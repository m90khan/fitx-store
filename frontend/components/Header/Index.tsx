import Link from 'next/link';
import styled from 'styled-components';
// import Nav from './Nav';
import media from 'css-in-js-media';
import {
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from 'react-bootstrap';
export default function Header() {
  return (
    <Container fluid w-80>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#link'>Link</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>
    // <HeaderStyles>
    //   <Logo>
    //     <Link href='/'>Sando Store</Link>
    //     <Button variant='primary'>Primary</Button>{' '}
    //   </Logo>
    //   <Nav />
    //   <div className='sub-bar'>
    //     <p>Search</p>
    //   </div>
    // </HeaderStyles>
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
