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
                    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                    font-src 'self' https://fonts.gstatic.com;
                    img-src 'self' https://i.redd.it data:;
                    connect-src 'self' https://www.reddit.com https://i.redd.it;
                    object-src 'none';
                    base-uri 'self';
                "
            />
            <meta name="referrer" content="strict-origin" />

            {isProd && <link rel="manifest" href="/touhou-translations/manifest.webmanifest" />}

            <link rel="preconnect" href="https://i.redd.it" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

            {isProd && <script src="/touhou-translations/registerSW.js"></script>}
        </>
    );
};

export default Head;