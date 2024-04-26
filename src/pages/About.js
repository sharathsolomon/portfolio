import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import resumeData from '../resumeData.json'; 
import '../css/about.css'; 

const About = () => {
  return (
    <Container className="about-container">
      <Row className="align-items-center about-row">
        <Col md={4} className="text-center">
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
                <div className="d-flex align-items-center">
                  <Link to="/resume">
                    <Button className="custom-btn me-3">Check out my resume</Button>
                  </Link>
                  <a href="https://github.com/sharathsolomon" target="_blank" rel="noopener noreferrer" className="icon-spacing me-3">
                    <FontAwesomeIcon icon={faGithub} size="3x" />
                  </a>
                  <a href="https://linkedin.com/in/sharathsolomon" target="_blank" rel="noopener noreferrer" className="icon-spacing">
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