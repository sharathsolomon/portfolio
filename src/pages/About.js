/**
 * About Component
 * 
 * This React component renders an "About" page for a personal portfolio website. It uses Bootstrap for styling and layout,
 * with components like Container, Row, Col, Image, and Button to organize the content. The page includes a profile image,
 * a greeting using the name from a JSON data file, and a list of personal details (like contact information) also sourced
 * from the JSON file. Additional features include links to a resume page and external social media profiles on GitHub and
 * LinkedIn, with corresponding icons from FontAwesome. The component is styled through an external CSS file.
 * 
 * The JSON data for the user's information is loaded from '../resumeData.json' and is used to dynamically populate the name
 * and personal details in the component.
 */

import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import resumeData from '../resumeData.json'; 
import '../css/about.css'; 

const About = () => {
  const username = process.env.REACT_APP_GITHUB_USERNAME;
  return (
    <Container className="about-container">
      <Row className="align-items-center about-row"> {/*centers the elements vertically withing the row  */}
        <Col md={4} className="text-center"> {/* take up 4 out of the 12 available columns in the row. */}
          <Image 
            src={process.env.PUBLIC_URL + '/sharath.jpeg'} 
            alt="Sharath Varghese Solomon" 
            roundedCircle 
            className="about-image"
          />
        </Col>
        <Col md={8}>
            <div className="text-container">
                <h1>Hi, I'm {resumeData.name}!</h1>
                {resumeData.personal_details.map((detail,index)=>(
                  <p>{detail.entity}: {detail.value}</p>
                ))}
                <h6>This is my personal portfolio where I showcase my projects and skills.</h6>
                <div className="d-flex align-items-center"> {/*makes the HTML element a flex container and vertically centers its child elements */}
                  <Link to="/resume">
                    <Button className="custom-btn me-3">Check out my resume</Button>
                  </Link>
                  <a href= {`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="icon-spacing me-3">
                    <FontAwesomeIcon icon={faGithub} size="3x" />
                  </a>
                  <a href={`https://linkedin.com/in/${username}`} target="_blank" rel="noopener noreferrer" className="icon-spacing">
                    <FontAwesomeIcon icon={faLinkedin} size="3x" />
                  </a>
                </div>
            </div>
        </Col>
      </Row>
    </Container>
  );
};
export default About;