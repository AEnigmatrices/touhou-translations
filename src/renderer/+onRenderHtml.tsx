import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utils/createEmotionCache';
import { PageLayout } from './PageLayout/PageLayout';
import type { OnRenderHtmlAsync, PageContext } from 'vike/types';

type Page = (pageProps: any) => ReactElement;

const isProd = process.env.NODE_ENV === 'production';

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
            <meta name="google-site-verification" content="0HESLIqydO91EGI_Nz10xq3aAxhdqBAfCHes6Q6oXrE" />
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            <meta
                http-equiv="Content-Security-Policy"
                content="
                    default-src 'self';
                    script-src 'self' 'unsafe-inline';
                    style-src 'self' 'unsafe-inline';
                    font-src 'self';
                    img-src 'self' https://i.redd.it data:;
                    connect-src 'self' https://www.reddit.com;
                    object-src 'none';
                    base-uri 'self';
                "
            />
            <meta name="referrer" content="strict-origin" />
            <link rel="icon" type="image/png" href="/touhou-translations/icons/favicon.ico" />
            ${dangerouslySkipEscape(isProd ? '<link rel="manifest" href="/touhou-translations/manifest.webmanifest" />' : '')}

            <link rel="prefetch" href="/touhou-translations/data/artists.json" crossorigin>
            <link rel="prefetch" href="/touhou-translations/data/characters.json" crossorigin>
            <link rel="prefetch" href="/touhou-translations/data/posts/posts-2024.json" crossorigin>
            <link rel="prefetch" href="/touhou-translations/data/posts/posts-2025.json" crossorigin>

            <link rel="preload" href="/touhou-translations/fonts/noto-sans-jp/noto-sans-jp-v54-japanese_latin-regular.woff2" as="font" type="font/woff2" crossorigin>
            <link rel="preload" href="/touhou-translations/fonts/noto-sans-jp/noto-sans-jp-v54-japanese_latin-500.woff2" as="font" type="font/woff2" crossorigin>
            <link rel="preload" href="/touhou-translations/fonts/noto-sans-jp/noto-sans-jp-v54-japanese_latin-600.woff2" as="font" type="font/woff2" crossorigin>
            <link rel="preload" href="/touhou-translations/fonts/noto-sans-jp/noto-sans-jp-v54-japanese_latin-700.woff2" as="font" type="font/woff2" crossorigin>

            <title>Touhou Translations</title>
            ${dangerouslySkipEscape(emotionStyleTags)}
            ${dangerouslySkipEscape(isProd ? '<script src="/touhou-translations/registerSW.js"></script>' : '')}
        </head>
        <body>
           <div id="root">${dangerouslySkipEscape(html)}</div>
        </body>
        </html>
    `;

    return { documentHtml };
};

export { onRenderHtml };