import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <main style={{ padding: '1.5rem' }}>
                <AppRoutes />
            </main>
        </Router>
    );
};

export default App;
