import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-4">
      <Container className="py-4 text-center">
        © {new Date().getFullYear()} My Portfolio
      </Container>
    </footer>
  );
}

export default Footer;
