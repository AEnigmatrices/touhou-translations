import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import PostsProvider from './context/PostsProvider';
import ErrorBoundary from './context/ErrorBoundary';

const LoadingFallback = () => <div>Loading...</div>;

const App: React.FC = () => (
    <Router basename="/touhou-translations">
        <ErrorBoundary>
            <PostsProvider>
                <Suspense fallback={<LoadingFallback />}>
                    <Routes />
                </Suspense>
            </PostsProvider>
        </ErrorBoundary>
    </Router>
);

export default App;