import { HashRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <main style={{ padding: '1.5rem' }}>
                <Routes />
            </main>
        </Router>
    );
};

export default App;
