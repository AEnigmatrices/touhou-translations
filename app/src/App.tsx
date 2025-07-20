import React, { Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Routes from './Routes';
import PostsProvider from './context/PostsProvider';
import ErrorBoundary from './context/ErrorBoundary';

const theme = createTheme({
    typography: { fontFamily: '"Noto Sans JP", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif' }
});

const LoadingFallback = () => <div>Loading...</div>;

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <Router>
            <ErrorBoundary>
                <PostsProvider>
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes />
                    </Suspense>
                </PostsProvider>
            </ErrorBoundary>
        </Router>
    </ThemeProvider>
);

export default App;