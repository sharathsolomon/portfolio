/**
 * Header Component
 * 
 * This component creates a responsive navigation bar for the website using React Bootstrap. 
 * It utilizes the `Navbar` component to render a dark-themed navigation bar that is sticky at the top.
 * Inside the `Navbar`, there is a `Container` which holds the `Navbar.Brand` linking to the homepage.
 * The navigation links are wrapped inside `Navbar.Collapse` to support collapsible behavior in smaller screens.
 * Each `Nav.Link` uses `NavLink` from `react-router-dom` for navigation, ensuring that the current path is highlighted.
 */

import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/about">My Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={NavLink} to="/" end>Home</Nav.Link> */}
            {/* <Nav.Link as={NavLink} to="/about">About</Nav.Link> */}
            <Nav.Link as={NavLink} to="/resume">Resume</Nav.Link>
            <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
