export default function About() {
    return (
        <div>
            <h1>Hi, I'm Sharath Varghese Solomon!</h1>
            <h1>Data Scientist</h1>
            <img src={process.env.PUBLIC_URL + '/sharath.jpeg'} alt="Hero" style={{ width: '10%', height: '10%' }} />
            <p>This is my personal portfolio where I showcase my projects and skills.</p>
        </div>
    );
}
