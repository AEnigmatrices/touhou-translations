import { HashRouter as Router } from 'react-router-dom';
import PostsProvider from './context/PostsProvider';
import Routes from './Routes';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

const App: React.FC = () => {
    return (
        <Router>
            <PostsProvider>
                <Navbar />
                <main style={{ padding: '1.5rem' }}>
                    <Routes />
                </main>
            </PostsProvider>
        </Router>
    );
};

export default App;
