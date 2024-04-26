import React, { useState, useEffect } from 'react';
import resumeData from '../resumeData.json'; 

const article_summary = resumeData.projects;

export default function Portfolio() {
    const [repos, setRepos] = useState([]);
    const [articles, setArticles] = useState([]);

    const githubUsername = 'sharathsolomon';
    const mediumUsername = 'sharathsolomon';

    useEffect(() => {
        const fetchData = async () => {
          try {
            const repoResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
            const repoData = await repoResponse.json();
            setRepos(repoData);
      
            const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
            const articleResponse = await fetch(rssUrl);
            const articleData = await articleResponse.json();
            if (articleData.items) {
              setArticles(articleData.items);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
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
        <div>
            <h1>Projects</h1>
            <div>
                {articles.map((article, index) => {
                    const repo = repos[index]; // Get the corresponding repo by index
                    return (
                        <div key={index} id={article.title.replaceAll(' ', '-').toLowerCase()}>
                            <h2>{article.title}</h2>
                            <img src={extractImageUrl(article.description)} alt={article.title} />
                            <p>Published on: {new Date(article.pubDate).toLocaleDateString()}</p>
                            {repo && (
                                <p>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name} GitHub Repository
                                    </a>
                                </p>
                            )}
                            <p>{article_summary[index]}</p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">Read More</a>
                            {/* Additional text can be added here */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
