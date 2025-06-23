import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.scss';



const App = () => {
    return (
        <Router basename="/touhou-translations/">
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/characters">Characters</Link>
                <Link to="/artists">Artists</Link>
                <Link to="/gallery">Gallery</Link>
            </nav>
            <main style={{ padding: '1.5rem' }}>
                <AppRoutes />
            </main>
        </Router>
    );
};

export default App;
