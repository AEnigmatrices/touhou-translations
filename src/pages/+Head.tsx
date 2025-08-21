const isProd = process.env.NODE_ENV === 'production';

const Head = () => {
    return (
        <>
            <meta name="google-site-verification" content="0HESLIqydO91EGI_Nz10xq3aAxhdqBAfCHes6Q6oXrE" />
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            <meta
                httpEquiv="Content-Security-Policy"
                content="
                    default-src 'self';
                    script-src 'self' 'unsafe-inline';
                    style-src 'self' 'unsafe-inline';
                    font-src 'self';
                    img-src 'self' https://i.redd.it data:;
                    connect-src 'self' https://www.reddit.com https://i.redd.it;
                    object-src 'none';
                    base-uri 'self';
                "
            />
            <meta name="referrer" content="strict-origin" />

            {isProd && <link rel="manifest" href="/touhou-translations/manifest.webmanifest" />}

            <link rel="preconnect" href="https://i.redd.it" crossOrigin="" />
            <link rel="prefetch" href="/touhou-translations/data/artists.json" crossOrigin="" />
            <link rel="prefetch" href="/touhou-translations/data/characters.json" crossOrigin="" />
            <link rel="prefetch" href="/touhou-translations/data/posts/posts-2024.json" crossOrigin="" />
            <link rel="prefetch" href="/touhou-translations/data/posts/posts-2025.json" crossOrigin="" />

            <link rel="preload" href="/touhou-translations/fonts/noto-sans-jp/noto-sans-jp-v54-japanese_latin-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
            <link rel="preload" href="/touhou-translations/fonts/noto-sans-jp/noto-sans-jp-v54-japanese_latin-500.woff2" as="font" type="font/woff2" crossOrigin="" />
            <link rel="preload" href="/touhou-translations/fonts/noto-sans-jp/noto-sans-jp-v54-japanese_latin-600.woff2" as="font" type="font/woff2" crossOrigin="" />
            <link rel="preload" href="/touhou-translations/fonts/noto-sans-jp/noto-sans-jp-v54-japanese_latin-700.woff2" as="font" type="font/woff2" crossOrigin="" />

            {isProd && <script src="/touhou-translations/registerSW.js"></script>}
        </>
    );
};

export default Head;