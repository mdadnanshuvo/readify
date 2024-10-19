import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/readify.jpg';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../App.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="nav-logo" src={logo} alt="readify-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
          <Nav className="ms-auto"> 
            <Nav.Link as={Link} to="/" className="custom-nav-link" >
              <Button className='btn btn-lg btn-dark '>Home</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="book/wishlist" className="custom-nav-link"  >
            <Button className='btn btn-lg btn-dark '>Wishlist</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
