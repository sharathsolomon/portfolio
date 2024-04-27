/**
 * Resume Component
 * 
 * This React component renders a detailed resume page utilizing data from an external JSON file (../resumeData.json).
 * It includes sections for professional summary, contact details, work experience, qualifications, skills, certifications, and achievements.
 * The component also integrates a video section where it attempts to load a specific YouTube video using the YouTube Data API.
 */

import React, { useState, useEffect } from 'react';
import resumeData from '../resumeData.json'; 
import { Container, Row, Col, ListGroup, Badge, Card, CardBody } from 'react-bootstrap';
import '../css/resume.css'; 
export default function Resume() {
    const [videoDetails, setVideoDetails] = useState(null);
    const [videoError, setVideoError] = useState('');
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY; 
    const videoId = process.env.REACT_APP_YOUTUBE_VIDEOID; 
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;

    useEffect(() => {
        fetch(apiUrl)                   // attempts to retrieve video details using the constructed apiUrl.
            .then(response => {
                if (!response.ok) {     // if unseccessful it throws and logs an error indicating a network issue.
                    throw new Error('Network response was not ok');
                }
                return response.json(); // converts to json
            })
            .then(data => {
                if (data.items.length === 0) { //if video not found, throws another error
                    throw new Error('Video not found');
                }
                setVideoDetails(data.items[0]); //updates the state `videoDetails` with the first video item's data
                setVideoError(''); // Clear any previous errors if the fetch is successful
            })
            .catch(error => {
                console.error('Error fetching video details:', error);
                setVideoError(error.message);   //and updates the state `videoError` with the error message if fetching failed.
            });
    }, [apiUrl]); //tells react to re-run the useEffect() hook only when the url changes. 

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
                <div>
                    <h2>Contact Details</h2>
                    <ul>
                        {resumeData.contact.map((detail, index) => (
                            <li>
                                <p> {detail.entity}: {detail.value} </p>    
                            </li>
                        ))}
                    </ul>
                </div>
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
                <Col md={6} className="d-flex">
                    <Card className="mb-3 flex-fill">
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

                <Col md={6} className="d-flex">
                    <Card className="mb-3 flex-fill">
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
                    <Card className="mb-3">
                        <Card.Header><strong>Awards & Scholarships</strong></Card.Header>
                        <ListGroup variant="flush">
                        {resumeData.achievements.map((detail,index)=>(
                            <ListGroup.Item key={index}>
                                {detail}
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>            

            <Row>
            <Col md={6}>
                <h2>Success Stories</h2>
                {/*A conditional rendering is implemented that will load error if youtube video featching failed, else displays the video */}
                {videoError ? (
                    <div className="alert alert-danger" role="alert">
                        Error loading video: {videoError}
                    </div>
                ) : (
                    videoDetails && (
                        <Card className="mb-3">
                            <Card.Header>{videoDetails.snippet.title}</Card.Header>
                            <ListGroup variant="flush">
                                <iframe
                                    className="responsive-video"
                                    src={videoSrc}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </ListGroup>
                        </Card>
                    )
                )}
            </Col>
            </Row>
        </Container>
    );
}
