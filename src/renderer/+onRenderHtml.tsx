import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utils/createEmotionCache';
import { PageLayout } from './PageLayout/PageLayout';
import type { OnRenderHtmlAsync, PageContext } from 'vike/types';

type Page = (pageProps: any) => ReactElement;

const onRenderHtml: OnRenderHtmlAsync = async (pageContext: PageContext): ReturnType<OnRenderHtmlAsync> => {
    const { Page } = pageContext as PageContext & { Page: Page };

    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

    const app = (
        <CacheProvider value={cache}>
            <PageLayout pageContext={pageContext}>
                <Page {...pageContext} />
            </PageLayout>
        </CacheProvider>
    );

    const html = renderToString(app);
    const emotionChunks = extractCriticalToChunks(html);
    const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);

    const documentHtml = escapeInject`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="An archive of fan-translated Touhou Project comics and illustrations." />
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            <meta
                http-equiv="Content-Security-Policy"
                content="
                    default-src 'self';
                    script-src 'self' 'unsafe-inline';
                    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                    font-src 'self' https://fonts.gstatic.com;
                    img-src 'self' https://i.redd.it data:;
                    connect-src 'self' https://www.reddit.com;
                    object-src 'none';
                    base-uri 'self';
                "
            />
            <meta name="referrer" content="strict-origin" />
            <link rel="icon" type="image/png" href="/touhou-translations/icons/favicon.png" />
            <link rel="manifest" href="/touhou-translations/manifest.json" />

            <link rel="prefetch" href="/data/artists.json" crossorigin="anonymous">
            <link rel="prefetch" href="/data/characters.json" crossorigin="anonymous">
            <link rel="prefetch" href="/data/posts/posts-2024.json" crossorigin="anonymous">
            <link rel="prefetch" href="/data/posts/posts-2025.json" crossorigin="anonymous">

            <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;500;700&display=swap" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

            <title>Touhou Translations</title>
            ${dangerouslySkipEscape(emotionStyleTags)}
        </head>
        <body>
           <div id="root">${dangerouslySkipEscape(html)}</div>
        </body>
        </html>
    `;

    return { documentHtml };
};

export { onRenderHtml };