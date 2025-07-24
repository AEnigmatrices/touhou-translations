import { hydrateRoot, createRoot, type Root } from 'react-dom/client'
import { StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import "./index.css";
import PostsProvider from '../context/PostsProvider';
import ErrorBoundary from '../context/ErrorBoundary';
import { PageLayout } from './PageLayout';



const queryClient = new QueryClient();

const theme = createTheme({
    typography: {
        fontFamily: '"Noto Sans JP", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif'
    }
});

const LoadingFallback = () => <div>Loading...</div>;

let root: Root

const onRenderClient = async (pageContext: any) => {
    const { Page, pageProps = {} } = pageContext;

    const container = document.getElementById('root');
    if (!container) throw new Error("Root container not found");


    const page = (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ErrorBoundary>
                        <PostsProvider>
                            <Suspense fallback={<LoadingFallback />}>
                                <PageLayout>
                                    <Page {...pageProps} />
                                </PageLayout>
                            </Suspense>
                        </PostsProvider>
                    </ErrorBoundary>
                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>
    );
    if (pageContext.isHydration) {
        root = hydrateRoot(container, page)
    } else {
        if (!root) root = createRoot(container)
        root.render(page)
    }
}

export { onRenderClient }