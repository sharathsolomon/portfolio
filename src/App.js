import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap for responsive design.
import './App.css'; // Custom CSS for additional styling.

// Importing components from react-router-dom to handle routing.
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate // Importing Navigate to handle redirection.
} from "react-router-dom";

// Importing page components for different routes.
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Resume from './pages/Resume';

// Importing common components used across the site.
import Header from './components/Header';
import Footer from './components/Footer';

// The main App component that sets up the Router and defines the route structure.
function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Header component displayed on all pages. */}
        <div className="main-content">
          {/* Routing to different pages. */}
          <Routes>
            <Route path="/" element={<Navigate to="/about" />} /> {/* Redirect root to About */}
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Portfolio />} />
            <Route path="*" element={<Navigate to="/about" />} /> {/* Catch-all route */}
          </Routes>
        </div>
        <Footer /> {/* Footer component displayed on all pages. */}
      </div>
    </Router>
  );
}

export default App;
