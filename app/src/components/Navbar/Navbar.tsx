import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link to="/" className="navbar__link">Home</Link>
                <Link to="/characters" className="navbar__link">Characters</Link>
                <Link to="/artists" className="navbar__link">Artists</Link>
                <Link to="/gallery" className="navbar__link">Gallery</Link>
            </div>
        </nav>
    );
};

export default Navbar;
