/**
 * Footer Component
 * This component renders the footer section of the webpage. It includes a dark-themed
 * footer bar with centered text. The content displays the current year and a copyright
 * notice for the portfolio.
 */

import React from 'react';
import { Container } from 'react-bootstrap';
/**  */
function Footer() {
  return (
    <footer className="bg-dark text-white mt-4">    {/*`bg-dark` applies a dark background to the footer, `text-white` sets the text color to white. `mt-4` adds a margin on top for spacing */}
      <Container className="py-4 text-center">      {/*applies padding on the top and bottom of the container */} 
        © {new Date().getFullYear()} My Portfolio   {/*The current year is dynamically generated using JavaScript's Date object.*/}
      </Container>
    </footer>
  );
}

export default Footer;
