const isProd = process.env.NODE_ENV === 'production';
const fontsUrl =
    "https://fonts.googleapis.com/css2?" +
    "family=Noto+Sans+JP:wght@400;500;600;700&" +
    "family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&" +
    "family=Roboto:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap";

const Head = () => (
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
                frame-src https://www.youtube-nocookie.com;
            "
        />
        <meta name="referrer" content="strict-origin" />

        {isProd && <link rel="manifest" href="/touhou-translations/manifest.webmanifest" />}

        <link rel="icon" href="/touhou-translations/icons/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://i.redd.it" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="style" href={fontsUrl} />
        <link rel="stylesheet" href={fontsUrl} />

        {isProd && <script src="/touhou-translations/registerSW.js"></script>}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Touhou Translations",
                    "alternateName": "TT",
                    "url": "https://aenigmatrices.github.io/touhou-translations/"
                })
            }}
        />
    </>
);

export default Head;