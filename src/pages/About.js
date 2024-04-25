import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
                <h1>Hi, I'm Sharath Varghese Solomon!</h1>
                <p>Profession: Data Scientist</p>
                <p>Years of experience: 2.5 years</p>
                <p>Nationality: Kerala, India (I'm a Mallu)</p>
                <p>Current Residence: Brisbane, Australia</p>
                <p>Age: 28 yers</p>
                <p>Gender: Male</p>
                <p>Marital Status: Single</p>
                <h6>This is my personal portfolio where I showcase my projects and skills.</h6>
                <Link to="/resume" >
                    <Button className="custom-btn">Check out my resume</Button>
                </Link>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
