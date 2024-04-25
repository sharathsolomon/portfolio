import React, { useState, useEffect } from 'react';
import resumeData from '../resumeData.json'; 
import { Container, Row, Col, ListGroup, Badge, Card, CardBody } from 'react-bootstrap';
import '../css/resume.css'; 
export default function Resume() {
    const [videoDetails, setVideoDetails] = useState(null);
    const apiKey = 'AIzaSyDEaqWT1ZmTvcMMa6jKqOBYsgI-GLXUeyA'; // Replace with your actual API key
    const videoId = 'N0ibLUHAGMU'; // Replace with the ID of the video you want to display
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Check if the items array contains any video
                if (data.items.length === 0) {
                    throw new Error('Video not found');
                }
                setVideoDetails(data.items[0]);
            })
            .catch(error => {
                console.error('Error fetching video details: ', error);
            });
    }, [apiUrl]);

    const videoSrc = `https://www.youtube.com/embed/${videoId}`;

    return (
        <Container className="resume-text-left">
            <Row>
                <Col>
                    <h2 className="mt-3">Professional Summary</h2>
                    <p>{resumeData.summary}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Work Experience</h2>
                    {resumeData.experience.map((job, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Header><strong>{job.role}</strong></Card.Header>
                            <Card.Body>
                                <Card.Subtitle><strong>{job.company}</strong> - {job.location}</Card.Subtitle>
                                <Card.Subtitle>{job.from} - {job.to}</Card.Subtitle>
                                <ListGroup variant="flush">
                                    {job.details.map((detail, index) => (
                                        <ListGroup.Item key={index}>{detail}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col >
                    <h2>Qualifications</h2>
                    {resumeData.education.map((edn, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Header><strong>{edn.degree}</strong></Card.Header>
                            <CardBody>
                                <Card.Subtitle>{edn.institution}</Card.Subtitle>
                                <Card.Subtitle>{edn.from} - {edn.to}</Card.Subtitle>
                                <ListGroup variant="flush">
                                    {edn.details.map((detail, index) => (
                                        <ListGroup.Item key={index}>{detail}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </CardBody>
                        </Card>
                    ))}
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Card className="mb-3">
                        <Card.Header><strong>Skills</strong></Card.Header>
                        <ListGroup variant="flush">
                            {resumeData.skills.map((skill, index) => (
                                <ListGroup.Item key={index}>
                                    <Badge bg="secondary">{skill.category}</Badge>: {skill.details.join(", ")}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="mb-3">
                            <Card.Header><strong>Certifications</strong></Card.Header>
                            <ListGroup variant="flush">
                                {resumeData.certifications.map((cert, index) => (
                                    <ListGroup.Item key={index}>
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                            {cert.title}
                                        </a>
                                        {' '} - issued by <em>{cert.issuer}, {cert.date}</em>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                </Col>   
            </Row>

            <Row>
                <Col >
                    <h2>Acheivements</h2>
                    {resumeData.achievements.map((detail,index)=>(
                        <Card key={index} className="mb-3">
                            <CardBody>
                                <ListGroup variant="flush">  
                                        <ListGroup.Item key={index}>{detail}</ListGroup.Item>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    ))}
                </Col>
            </Row>            

            <Row>
                <Col>
                    <h2>Success Stories</h2>
                    {videoDetails && (
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>{videoDetails.snippet.title}</Card.Title>
                                <iframe 
                                    className="responsive-video"
                                    src={videoSrc} 
                                    title="YouTube video player" 
                                    allowFullScreen>
                                </iframe>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
