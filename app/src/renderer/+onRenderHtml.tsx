import { escapeInject } from 'vike/server'

const onRenderHtml = async () => {
    return escapeInject`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="An archive of fan-translated Touhou Project comics and illustrations."
                />
                <meta http-equiv="X-Content-Type-Options" content="nosniff" />
                <meta http-equiv="X-Frame-Options" content="DENY" />
                <meta
                    http-equiv="Content-Security-Policy"
                    content="
                        default-src 'self';
                        script-src 'self' 'unsafe-inline';
                        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                        font-src 'self' https://fonts.gstatic.com;
                        img-src 'self' https://i.redd.it;
                        connect-src 'self' https://www.reddit.com https://raw.githubusercontent.com;
                        object-src 'none';
                        base-uri 'self';"
                />
                <meta name="referrer" content="strict-origin" />
                <link rel="icon" type="image/png" href="icons/favicon.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                    rel="stylesheet"
                />
                <title>Touhou Translations</title>
            </head>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `
}

export { onRenderHtml }