// Home Component
// This component serves as the landing page of the website. It includes a welcoming header and navigation links to the About, 
// Portfolio, and Resume pages. The styles are applied from '../css/home.css'.

import React from 'react';
import '../css/home.css'; 

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to My Website</h1>
      <div className="navigation-links">
        <a href="/about" className="navigation-link">About</a>
        <a href="/portfolio" className="navigation-link">Portfolio</a>
        <a href="/resume" className="navigation-link">Resume</a>
      </div>
    </div>
  );
}
