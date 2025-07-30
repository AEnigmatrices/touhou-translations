import { Suspense, type ReactElement } from 'react';
import { hydrateRoot, createRoot, type Root } from 'react-dom/client';
import { PageLayout } from './PageLayout/PageLayout';
import { CacheProvider } from '@emotion/react';
import Loading from '../components/Loading/Loading';
import createEmotionCache from '../utils/createEmotionCache';
import './index.css';
import type { OnRenderClientAsync, PageContext } from 'vike/types';

type Page = (pageProps: any) => ReactElement;

let root: Root;
const cache = createEmotionCache();

const onRenderClient: OnRenderClientAsync = async (pageContext: PageContext) => {
    const { Page } = pageContext as PageContext & { Page: Page };

    const page = (
        <CacheProvider value={cache}>
            <PageLayout pageContext={pageContext}>
                <Suspense fallback={<Loading />}>
                    <Page {...pageContext} />
                </Suspense>
            </PageLayout>
        </CacheProvider>
    );

    const container = document.getElementById('root')!;
    if (pageContext.isHydration) {
        root = hydrateRoot(container, page);
    } else {
        if (!root) root = createRoot(container);
        root.render(page);
    }
};

export { onRenderClient };