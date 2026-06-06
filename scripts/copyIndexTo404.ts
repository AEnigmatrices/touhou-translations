import fs from "fs";
import path from "path";

const clientDir = path.resolve("dist/client");
const indexPath = path.join(clientDir, "index.html");
const notFoundPath = path.join(clientDir, "404.html");
const fallbackScriptPath = path.join(clientDir, "fallbackPageContext.js");

const fallbackPageContext = {
    pageId: "/src/pages/_error",
    routeParams: {},
    is404: true,
};

const fallbackScript = `(() => {
    const basePath = "/touhou-translations";
    const relativePath = window.location.pathname.startsWith(basePath)
        ? window.location.pathname.slice(basePath.length)
        : window.location.pathname;
    const normalizedPath = relativePath.replace(/\\/+$/, "") || "/";
    const postMatch = normalizedPath.match(/^\\/posts\\/([^/]+)$/);

    let pageContext = ${JSON.stringify(fallbackPageContext)};

    if (postMatch) {
        pageContext = {
            pageId: "/src/pages/posts/@id",
            routeParams: { id: decodeURIComponent(postMatch[1]) },
        };
    } else if (normalizedPath === "/admin") {
        pageContext = {
            pageId: "/src/pages/admin",
            routeParams: {},
        };
    }

    const pageContextElement = document.getElementById("vike_pageContext");
    if (pageContextElement) {
        pageContextElement.textContent = JSON.stringify(pageContext);
    }
})();
`;

const createClientFallbackHtml = (html: string) => {
    return html
        .replace(/<div id="root">[\s\S]*?(?=<script id="vike_pageContext")/, '<div id="root"></div>\n        ')
        .replace(
            /<script id="vike_pageContext" type="application\/json">[\s\S]*?<\/script>/,
            `<script id="vike_pageContext" type="application/json">${JSON.stringify(fallbackPageContext)}</script>\n        <script src="/touhou-translations/fallbackPageContext.js"></script>`
        )
        .replace(/\s*<link rel="modulepreload" href="[^"]*\/assets\/entries\/src_pages_index\.[^"]+" as="script" type="text\/javascript">/g, '');
};

const copyIndexTo404 = () => {
    try {
        if (fs.existsSync(indexPath)) {
            const indexHtml = fs.readFileSync(indexPath, "utf-8");
            fs.writeFileSync(notFoundPath, createClientFallbackHtml(indexHtml), "utf-8");
            fs.writeFileSync(fallbackScriptPath, fallbackScript, "utf-8");
            console.log("✅ Created neutral 404.html for client-side route fallback.");
        } else {
            console.warn(
                "⚠️ dist/client/index.html not found. Cannot create 404.html."
            );
        }
    } catch (err) {
        console.error("❌ Failed to create 404.html:", err);
        process.exit(1);
    }
};

copyIndexTo404();
