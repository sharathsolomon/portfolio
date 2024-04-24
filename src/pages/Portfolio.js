import React, { useState, useEffect } from 'react';

const article_summary = ["The project focused on removing noise from real-world images using deep learning in computer vision, specifically targeting clean-noisy image pairs from publicly available datasets like the Smartphone Image Denoising Dataset (SSID) and Real Low-Light Image Noise Reduction Dataset (RENOIR). Through exploratory data analysis, differences in pixel distribution and image quality were identified. Three state-of-the-art CNN architectures—CBDNet, PRIDNet, and RIDNet—were implemented and trained with these datasets, with RIDNet achieving the best results, boasting a PSNR of 36.6db and SSIM of 0.88. These models have applications in low-level vision tasks, such as denoising satellite images and restoring old, corrupted images. Additionally, a Streamlit webapp was developed to demonstrate the denoising capabilities, which was deployed using Streamlit sharing. A detailed blog about this study was featured on Analytics Vidhya’s Medium publications.",
"The project aimed to reduce maintenance costs in heavy vehicles by predicting Air Pressure System (APS) failures in Scania trucks using machine learning techniques, with data provided by Scania for a 2016 competition. The analysis revealed imbalanced data with many missing values. To address these issues, missing values were imputed using MICE, data was oversampled with SMOTE, and 50 new features were created using autoencoders. Various machine learning models were employed, including Logistic Regression, SVM, Decision Tree, Random Forest, XGBoost, AdaBoost, and a custom Ensemble, with Random Forest performing the best according to a competition-specific cost metric. This model not only surpassed the competition winner's solution but also promises significant financial and time savings in the automotive industry through automated preventive maintenance. Additionally, a Streamlit webapp was developed and deployed, and the project was featured in a detailed blog on Analytics Vidhya's Medium publication."]

export default function Portfolio() {
    const [repos, setRepos] = useState([]);
    const [articles, setArticles] = useState([]);


    const githubUsername = 'sharathsolomon'; 

    const mediumUsername = 'sharathsolomon';

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
        fetch(`https://api.github.com/users/${githubUsername}/repos`)
            .then(response => response.json())
            .then(data => {
                setRepos(data); 
            })
            .catch(error => {
                console.error('Error fetching GitHub repositories: ', error);
            });

        const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
        fetch(rssUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.items) {
                    setArticles(data.items);
                }
            })
            .catch(error => {
                console.error('Error fetching Medium articles: ', error);
            });
        }, [githubUsername, mediumUsername]);
    
    // Function to extract image URL from description HTML
    const extractImageUrl = (description) => {
        const regex = /<img.*?src="(.*?)"/;
        const match = regex.exec(description);
        return match ? match[1] : null;
    };

    return (
        <div>
            <h1>Portfolio</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="project-selector">Select a Project:</label>
                <select id="project-selector" onChange={handleSelectChange} value={selectedProject}>
                    <option value="">--Select a Project--</option>
                    {articles.map((article, index) => (
                    <option key={index} value={article.title.replaceAll(' ', '-').toLowerCase()}>
                        {article.title}
                    </option>
                    ))}
                </select>
                <button type="submit">Go to Project</button>
            </form>
            <h2>GitHub Repositories</h2>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id} id={repo.name.replaceAll(' ', '-').toLowerCase()}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                        - {repo.description}
                    </li>
                ))}
            </ul>

            <h2>Medium Articles</h2>
            <div>
                {articles.map((article, index) => (
                    <div key={index} id={article.title.replaceAll(' ', '-').toLowerCase()}>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                            <h3>{article.title}</h3>
                            <p></p>
                            <img src={extractImageUrl(article.description)} alt={article.title} style={{ width: '50%', height: '50%' }} />
                            <p>Published on: {new Date(article.pubDate).toLocaleDateString()}</p>
                        </a>
                        {article_summary[index] && <p>{article_summary[index]}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
