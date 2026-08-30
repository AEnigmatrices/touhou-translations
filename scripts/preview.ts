import { readFile, stat } from 'node:fs/promises';
import { createServer, type ServerResponse } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const outputDirectory = resolve('build');
const basePath = '/touhou-translations';

function option(name: string, fallback: string): string {
    const index = process.argv.indexOf(name);
    return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const host = option('--host', '127.0.0.1');
const port = Number(option('--port', '4173'));

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`Invalid preview port: ${port}`);
}

const contentTypes: Record<string, string> = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
    '.webp': 'image/webp',
    '.xml': 'application/xml; charset=utf-8'
};

async function isFile(pathname: string): Promise<boolean> {
    try {
        return (await stat(pathname)).isFile();
    } catch {
        return false;
    }
}

async function sendFile(
    response: ServerResponse,
    pathname: string,
    status: number,
    method: string
): Promise<void> {
    const body = await readFile(pathname);
    response.writeHead(status, {
        'Cache-Control': 'no-cache',
        'Content-Length': body.byteLength,
        'Content-Type': contentTypes[extname(pathname).toLowerCase()] ?? 'application/octet-stream',
        ...(pathname.endsWith(`${sep}sw.js`) ? { 'Service-Worker-Allowed': `${basePath}/` } : {})
    });
    response.end(method === 'HEAD' ? undefined : body);
}

async function sendNotFound(response: ServerResponse, method: string): Promise<void> {
    const notFoundPage = resolve(outputDirectory, '404.html');
    if (await isFile(notFoundPage)) {
        await sendFile(response, notFoundPage, 404, method);
        return;
    }

    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(method === 'HEAD' ? undefined : 'Not found');
}

const server = createServer(async (request, response) => {
    const method = request.method ?? 'GET';
    if (method !== 'GET' && method !== 'HEAD') {
        response.writeHead(405, { Allow: 'GET, HEAD' });
        response.end();
        return;
    }

    try {
        const url = new URL(request.url ?? '/', `http://${request.headers.host ?? host}`);
        let pathname: string;
        try {
            pathname = decodeURIComponent(url.pathname);
        } catch {
            await sendNotFound(response, method);
            return;
        }

        if (pathname === basePath) {
            response.writeHead(308, { Location: `${basePath}/` });
            response.end();
            return;
        }

        if (!pathname.startsWith(`${basePath}/`)) {
            await sendNotFound(response, method);
            return;
        }

        const relativePath = pathname.slice(basePath.length + 1);
        const requestedPath =
            relativePath === '' || relativePath.endsWith('/') ? `${relativePath}index.html` : relativePath;
        const filePath = resolve(outputDirectory, requestedPath);
        const outputPrefix = `${outputDirectory}${sep}`;

        if (filePath !== outputDirectory && filePath.startsWith(outputPrefix) && (await isFile(filePath))) {
            await sendFile(response, filePath, 200, method);
            return;
        }

        await sendNotFound(response, method);
    } catch (error) {
        console.error(error);
        if (!response.headersSent) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        }
        response.end('Internal server error');
    }
});

server.listen(port, host, () => {
    console.log(`Preview server running at http://${host}:${port}${basePath}/`);
});
