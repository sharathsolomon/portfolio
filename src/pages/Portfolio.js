/**
 * Portfolio component fetches and displays GitHub repositories and Medium articles.
 * It includes an interactive form allowing the user to select a project from a dropdown menu,
 * which scrolls the user to the selected project's detailed view upon submission.
 *
 * The component uses React Bootstrap for styling and layout, including Containers, Rows, Columns, Cards, and Buttons.
 * State hooks are utilized to manage the fetched repositories, articles, error handling, and the selected project.
 * 
 * The GitHub and Medium usernames are fetched from environment variables, and data fetching occurs in the useEffect hook.
 * The 'fetchData' async function is declared within useEffect and is responsible for fetching GitHub repos and Medium articles.
 * Error handling is incorporated to manage and display fetch errors appropriately.
 *
 * Data is fetched from the GitHub API for repositories and the RSS2JSON service for Medium articles.
 * Articles and repositories are displayed side by side using Bootstrap's grid system.
 * Each article card includes an image, summary, publication date, and links to the full article and associated GitHub repository.
 */


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

    /**
     * Handles changes to the project selection dropdown.
     * Updates the `selectedProject` state with the new value from the dropdown.
     * The change event triggered by selecting an option in the dropdown.
     */
    const handleSelectChange = (event) => {
    setSelectedProject(event.target.value);
    };

    /**
     * Handles the form submission event.
     * Scrolls to the DOM element that corresponds to the selected project if a project is selected.
     * Smooth scrolling is used to improve the user experience.
     * The submit event triggered by the form submission.
     */
    const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedProject) {
        const element = document.getElementById(selectedProject);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    };
    
    useEffect(() => {
        const fetchData = async () => { //defining an asynchronous function
            try {
                const repoResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos`,  { cache: 'no-cache' }); //fetches GitHub repositories using the GitHub API
                if (!repoResponse.ok) { //throws error if fetching fails
                    throw new Error('Failed to fetch repositories');
                }
                const repoData = await repoResponse.json(); //converts the data to json
                setRepos(repoData); //setRepos state is updated with the fetched data
            }
            catch (error) {
                console.error('Error fetching repositories:', error); //error is logged if fetching failed
            }

            try {
                //Medium does not provide a public API for fetching user articles directly. 
                //However, Medium provides an RSS feed for each user's content, which can be used to fetch the latest articles. 
                //You can convert the RSS feed to JSON using a third-party service like RSS2JSON, and then fetch the articles from there.
                const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`; //fetching article from medium
                const articleResponse = await fetch(rssUrl, { cache: 'no-cache' });
                if (!articleResponse.ok) { // throws error if fetching fails
                    throw new Error('Failed to fetch articles');
                }
                const articleData = await articleResponse.json(); //converts data to json
                if (articleData.items) {
                    setArticles(articleData.items); //if fetched data has valid items, then updates the setArticles state
                  }
                setArticleError(''); // Clear any previous errors if the fetch is successful
            }
            catch (error) {
                console.error('Error fetching articles:', error); //logs the error if fetching fails
                setArticleError(error.message); //updates the setArticleError state with corresponding error
            }
        };
        fetchData();
    }, [githubUsername, mediumUsername]); //useEffect() re-runs only when these usernames changes
      

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
            {/* The form element with an onSubmit event handler, flexbox for inline alignment, and a bottom margin */}
            <Form onSubmit={handleSubmit} className="d-flex align-items-center mb-3">

                {/* Form label for the project selector dropdown, with a right margin for spacing */}
                <Form.Label htmlFor="project-selector" className="me-2">
                    <strong>Select a Project:</strong>
                </Form.Label>
                
                {/* Dropdown form control for selecting a project with a custom width class */}
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

            {/*Conditional rendering to show error is article fetching failed, else display the articles */}
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