import React, { useState, useEffect } from 'react';

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
        <div>
            <h1>Professional Summary</h1>
            <p>Highly skilled and results-driven data scientist with experience in working on real-world problems. 
                Proficient in leveraging NLP techniques to extract insights from textual data and develop advanced NLP applications. 
                Proven track record of successfully leading projects, designing and implementing innovative solutions, and collaborating 
                with cross-functional teams. Adept at training and fine-tuning NLP models for various applications, with a strong focus 
                on data analysis and drawing meaningful conclusions. Demonstrated expertise in developing knowledge mining systems, 
                semantic search engines, and QA systems. Experienced in API development, containerization, and cloud deployment. 
                Effective communicator with a talent for addressing client's technical concerns and leading data migration projects.</p> 
            <h2>Skills</h2>
            <ul>
                <li>ML/DL Frameworks: Tensorflow, Keras, Pytorch, Scikit-learn</li>
                <li>Programming Languages: C#, Python, React</li>
                <li>Cloud: Microsoft Azure </li>
                <li>Web Frameworks: Flask </li>
                <li>Containerization: Docker </li>
                <li>Version Control: Git </li>
                <li>Database Management: SQL, MongoDB </li>
            </ul>

            <h2>Work Experience</h2>
            <div>
                <h3>Associate Data Scientist</h3>
                <p><strong>Celebal Technologies</strong> - Jaipur, India</p>
                <p>Oct 2021 - May 2023</p>
                <ul>
                    <li>Conducted comprehensive data analysis on textual data, extracting key insights and drawing actionable conclusions to support decision-making processes.</li>
                    <li>Trained and fine-tuned numerous NLP models for various applications, including sentiment analysis, entity extraction, text classification, and QA systems.</li>
                    <li>Spearheaded the development of a knowledge mining system that efficiently extracted data from PDFs and images, contributing to increased productivity and data accessibility.</li>
                    <li>Spearheaded the development of a knowledge mining system that efficiently extracted data from PDFs and images, contributing to increased productivity and data accessibility.</li>
                    <li>Designed and implemented a robust document semantic search system with filtering and sorting capabilities using Azure services, enhancing the efficiency of information retrieval.</li>
                    <li>Created APIs using Flask to facilitate seamless communication between the backend and frontend/UI, optimizing user experience and interaction with NLP-powered applications.</li>
                    <li>Successfully containerized multiple applications using Docker and deployed them in Azure Container Instances (ACI) and Azure Kubernetes Service (AKS), improving scalability and ease of maintenance.</li>
                    <li>Acted as the primary technical point of contact in client calls, addressing technical queries, and ensuring client satisfaction and project success.</li>
                    <li>Led a team in a data and pipeline migration project, demonstrating strong leadership skills and expertise in streamlining processes for optimal outcomes. Effectively managed client interactions during the project's lifecycle.</li>
                </ul>
            </div>

            <div>
                <h3>Graduate Engineer Trainee</h3>
                <p><strong>Dynamatic Technologies</strong> - Bangalore, India</p>
                <p>April 2019 - July 2020</p>
                <ul>
                    <li>Involved in the R&D division for designing gear pumps and managed around 20 projects.</li>
                    <li>Designed a variety of gear pumps and prepared 3D models and 2D drawings using Creo 5.0.</li>
                    <li>Managed data using PLM software Windchill, followed up products manufacture and its inspection.</li>
                    <li>Gained experience in the design of various mechanical components considering their functionality and assembly.</li>
                    <li>Contributed to finding solutions to the design failures and acquired knowledge of materials used and different manufacturing processes.</li>
                </ul>
            </div>

            <h2>Qualification</h2>
            <div>
                <h3>Master of Information Technology (Data Science Major)</h3>
                <p>July 2023 - Present</p>
                <ul>
                    <li>Gaining advanced knowledge, based on research practices, in Information Technology (IT) discipline specializing in data science, and developing the ability to formulate and develop best practice IT strategies and solutions.</li>
                </ul>
            </div>

            <div>
                <h3>Applied AI Course</h3>
                <p>July 2020 - Aug 2021</p>
                <ul>
                    <li>One-year in-depth course on Machine Learning and Deep Learning with practical approaches to solving real world problems.</li>
                    <li>Real world case studies include Microsoft malware detection, self-driving cars, music generation using Deep Learning, English to Italian translation using attention mechanism etc.</li>
                </ul>
            </div>

            <div>
                <h3>Bachelor's in Mechanical Engineering</h3>
                <p>June 2014 - July 2018</p>
                <ul>
                    <li>CGPA: 8.81/10 equivalent to 6.2/7 as per Australian University standards.</li>
                </ul>
            </div>

            <h2>Acheivements</h2>
            <div>
            <ul>
                <li>Cash prize for securing 38th position among 500 competitors in an AI technical blog competition.</li>
                <li>Statewide 8th rank for B. Tech in mechanical engineering among all the engineering institutions under CUSAT University in 2018.</li>
                <li>Scholarship in the State level screening examination for engineering studies.</li>
            </ul>

            </div>

            <h2>Success Stories</h2>
            {videoDetails && (
                <div>
                    <h3>{videoDetails.snippet.title}</h3>
                    <iframe 
                        width="560" 
                        height="315" 
                        src={videoSrc} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
            )}
        </div>
    );
}
