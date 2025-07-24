import { createRoot } from 'react-dom/client'
import { PageLayout } from './PageLayout'
import type { ComponentType } from 'react';

interface PageContext {
    Page: ComponentType<any>;
}

const onRenderClient = async (pageContext: PageContext) => {
    const { Page } = pageContext;

    const container = document.getElementById('root');
    if (!container) throw new Error("Root container not found");

    createRoot(container).render(
        <PageLayout>
            <Page />
        </PageLayout>
    );
}

export { onRenderClient }