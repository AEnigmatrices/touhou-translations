import { HashRouter as Router } from 'react-router-dom';
import PostsProvider from './context/PostsProvider';
import Routes from './Routes';

const App: React.FC = () => (
    <Router>
        <PostsProvider>
            <Routes />
        </PostsProvider>
    </Router>
);

export default App;
