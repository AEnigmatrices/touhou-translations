const isProd = process.env.NODE_ENV === 'production';

const Head = () => {
    return (
        <>
            <meta name="google-site-verification" content="0HESLIqydO91EGI_Nz10xq3aAxhdqBAfCHes6Q6oXrE" />
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

            <link rel="preconnect" href="https://i.redd.it" />
            <link rel="prefetch" href="/touhou-translations/data/artists.json" />
            <link rel="prefetch" href="/touhou-translations/data/characters.json" />
            <link rel="prefetch" href="/touhou-translations/data/posts/posts-2024.json" />
            <link rel="prefetch" href="/touhou-translations/data/posts/posts-2025.json" />

            {isProd && <script src="/touhou-translations/registerSW.js"></script>}
        </>
    );
};

export default Head;