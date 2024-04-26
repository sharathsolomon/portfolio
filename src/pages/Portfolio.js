import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import resumeData from '../resumeData.json'; 
import '../css/portfolio.css'

const article_summary = resumeData.projects;

export default function Portfolio() {
    const [repos, setRepos] = useState([]);
    const [articles, setArticles] = useState([]);
    const [articleError, setArticleError] = useState('');

    const githubUsername = process.env.REACT_APP_GITHUB_USERNAME;
    const mediumUsername = process.env.REACT_APP_MEDIUM_USERNAME;

    const [selectedProject, setSelectedProject] = useState('');

    const handleSelectChange = (event) => {
    setSelectedProject(event.target.value);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedProject) {
        const element = document.getElementById(selectedProject);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const repoResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos`,  { cache: 'no-cache' });
                if (!repoResponse.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                const repoData = await repoResponse.json();
                setRepos(repoData);
            }
            catch (error) {
                console.error('Error fetching repositories:', error);
            }

            try {
                const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
                const articleResponse = await fetch(rssUrl, { cache: 'no-cache' });
                if (!articleResponse.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const articleData = await articleResponse.json();
                if (articleData.items) {
                    setArticles(articleData.items);
                  }
                setArticleError('');
            }
            catch (error) {
                console.error('Error fetching articles:', error);
                setArticleError(error.message);
            }
        };
        fetchData();
      }, [githubUsername, mediumUsername]);
      

    // Function to extract image URL from description HTML
    const extractImageUrl = (description) => {
        const regex = /<img.*?src="(.*?)"/;
        const match = regex.exec(description);
        return match ? match[1] : null;
    };

    return (
        <Container className="my-5">
            <Row className="mb-3">
                <Col>
                    <h1 className="text-center">Projects</h1>
                </Col>
            </Row>

            {/* Convert to React Bootstrap Form */}
            <Form onSubmit={handleSubmit} className="d-flex align-items-center mb-3">
                <Form.Label htmlFor="project-selector" className="me-2">
                    <strong>Select a Project:</strong>
                </Form.Label>
                <Form.Control 
                    as="select" 
                    id="project-selector" 
                    onChange={handleSelectChange} 
                    value={selectedProject}
                    className="me-2 custom-width"
                >
                    <option value="">--Select a Project--</option>
                    {articles.map((article, index) => (
                    <option key={index} value={article.title.replaceAll(' ', '-').toLowerCase()}>
                        {article.title}
                    </option>
                    ))}
                </Form.Control>
                <Button variant="dark" type="submit">
                    Go to Project
                </Button>
            </Form>


            {articleError ? (
            <Row>
                <Col>
                    <div className="alert alert-danger" role="alert">
                        Error loading articles: {articleError}
                    </div>
                </Col>
            </Row>
        ) : (
            
            articles.map((article, index) => {
                const repo = repos[index]; // Get the corresponding repo by index
                const imageUrl = extractImageUrl(article.description);

                return (
                    <Row key={index} id={article.title.replaceAll(' ', '-').toLowerCase()} className="mb-4 align-items-stretch">
                        <Col lg={6} className="d-flex">
                            <Card>
                                <Card.Img variant="top" src={imageUrl} alt={article.title} />
                            </Card>
                        </Col>
                        <Col lg={6} className="d-flex">
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title className="card-title-black">{article.title}</Card.Title>
                                    <Card.Text  className="article-text">
                                        {article_summary[index]}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Published on: </strong>{new Date(article.pubDate).toLocaleDateString()}
                                    </Card.Text>
                                    <div className="d-inline-block ms-auto mb-2"> 
                                        {repo && (
                                            <Button variant="dark" href={repo.html_url} target="_blank" className="me-2">
                                            GitHub
                                            </Button>
                                        )}
                                        <Button variant="dark" href={article.link} target="_blank">
                                            Read More
                                        </Button>
                                    </div>   
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                );
            }
            ))}
        </Container>
    );
}