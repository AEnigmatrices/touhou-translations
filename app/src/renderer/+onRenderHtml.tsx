import { escapeInject } from 'vike/server'

const onRenderHtml = async () => {
    return escapeInject`
        <!doctype html>
        <html lang="en">
        <body>
            <div id="root"></div>
        </body>
        </html>
    `
}

export { onRenderHtml }