import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/characters">Characters</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/gallery">Gallery</Link>
        </nav>
    );
};

export default Navbar;
