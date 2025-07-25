import { StrictMode, Suspense, type ComponentType } from 'react';
import { hydrateRoot, createRoot, type Root } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { PageLayout } from '../components/PageLayout/PageLayout';
import PostsProvider from '../context/PostsProvider';
import ErrorBoundary from '../context/ErrorBoundary';
import "./index.css";
import type { PageContext } from 'vike/types'

type ExtendedPageContext = PageContext & {
    Page: ComponentType<any>
    pageProps?: Record<string, unknown>
}



const queryClient = new QueryClient();

const theme = createTheme({ typography: { fontFamily: '"Noto Sans JP", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif' } });

const LoadingFallback = () => <div>Loading...</div>;

let root: Root



const onRenderClient = async (pageContext: ExtendedPageContext) => {
    const { Page, pageProps = {}, urlParsed, routeParams } = pageContext;

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
                                    <Page {...pageProps} urlParsed={urlParsed} routeParams={routeParams} />
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