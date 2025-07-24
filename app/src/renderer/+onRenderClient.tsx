import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import type { ComponentType } from 'react';

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

interface PageContext {
    Page: ComponentType<any>;
    pageProps: Record<string, any>;
}

const onRenderClient = async (pageContext: PageContext) => {
    const { Page, pageProps = {} } = pageContext;

    const container = document.getElementById('root');
    if (!container) throw new Error("Root container not found");

    createRoot(container).render(
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
}

export { onRenderClient }