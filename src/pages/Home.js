import React from 'react';
import '../css/home.css'; // This imports the CSS specific to the Home component

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
