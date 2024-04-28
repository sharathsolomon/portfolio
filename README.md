# Portfolio Website

## Introduction
This portfolio website is designed to showcase my personal and professional projects as a data scientist. It features my resume, projects from GitHub, articles from Medium, and videos from YouTube to demonstrate my skills and experiences and sucess stories.

## How to Contribute
Contributions are welcome! Here are some ways you can contribute:
- **Reporting bugs:** Open an issue in the GitHub repository detailing the bug, how to reproduce it, and the expected behavior.
- **Adding features:** Fork the repository, add your feature, and submit a pull request.

## Features
- Dynamic fetching of GitHub repositories to display my coding projects.
- Integration with Medium to show recent articles.
- Fetching YouTube videos that highlight my Success Story.
- Responsive design for optimal viewing on all device sizes.
- Well designed resume template. 
- Styling using react bootstrap

## Dependencies and Installation
This project is built using React. Here is a list of major dependencies and how to install them:

- **React**: A JavaScript library for building user interfaces.
- **Bootstrap**: For styling and responsive design.
- **Fetch API**: For API calls to GitHub, Medium, and YouTube.
- **React Router DOM**: For routing in react.
- **React Bootstrap**: A library for styling webpages effectively in react
- **Font Awesom**: A library to get icons and images of various brands and companies

To install these dependencies, run the following command in the root directory of the project:
```bash
npm install react-select
npm install --save react-router-dom
npm install react-bootstrap
npm install bootstrap reactstrap
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-brands-svg-icons
npm install --save @fortawesome/react-fontawesome
```
## Application Architecture
The repository has the following major folder structure
```
|   ├── css/                 #folder containing the css files used for styling the pages in the website
|   |   ├── about.css       
|   |   ├── home.css        
|   |   ├── portfolio.css   
|   |   └── resume.css     
|   ├── images/              # Images used in the webpages are stored in this folder
|   ├── pages/               # Contains the .js files for the 4 pages in the website
|   |   ├── About.js
|   |   ├── Home.js
|   |   ├── Portfolio.js
|   |   └── Resume.js
|   └── components/          # Contains the .js files for header and footer which are globally applied to the entire website
|       ├── Footer.js
|       └── Header.js
```
The website has been meticulously crafted using modern React development techniques, including advanced React components and essential hooks such as useState and useEffect. These features have been instrumental in creating a dynamic and responsive user interface. The application leverages the fetch function to seamlessly retrieve data from GitHub, Medium, and YouTube, integrating various APIs to enrich the content and functionality of the site. Additionally, the site utilizes React Router for efficient navigation and Bootstrap for responsive design, ensuring an optimal viewing experience across all devices. The architecture is designed for scalability and maintainability, making it an excellent foundation for future enhancements and updates. 

Secrets are handled by saving them in .env file and is added to the .gitignore file to avoid pushing in Git 
Version control is done using Git with timely commits and proper comments. 

## Reporting Issues
If you encounter any issues while using the application or contributing to it, please file an issue on the GitHub repository. Provide as much detail as possible, such as:
- Steps to reproduce the issue
- Expected Outcome
- Actual Outcome
- Screenshot or logs if applicable

## License 
MIT License: Feel free to use and modify the code as per your needs. 

