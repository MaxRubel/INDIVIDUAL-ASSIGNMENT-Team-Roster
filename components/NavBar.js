'use client';
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useState, useEffect } from 'react';

export default function NavBar({ changeSearchInput }) {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    changeSearchInput(searchInput);
  }, [searchInput]);

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Link passHref href='/'>
          <Navbar.Brand>CLIPPERS CENTRAL</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href='/teams'>
              <Nav.Link>Teams</Nav.Link>
            </Link>
            <Link passHref href='/new'>
              <Nav.Link>New Player</Nav.Link>
            </Link>
            <Link passHref href='/team/new'>
              <Nav.Link>New Team</Nav.Link>
            </Link>

            <input
              style={{ height: '10px !important' }}
              type='text'
              placeholder='Enter a name'
              name='search-input'
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />

            <Button variant='danger' onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
NavBar.propTypes = {
  changeSearchInput: () => {},
};

// Set default props for PlayerForm
NavBar.defaultProps = {
  changeSearchInput: () => {},
};
