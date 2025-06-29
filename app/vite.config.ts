import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

const vitePostsApiPlugin = {
    name: "vite-posts-api",
    configureServer(server: any) {
        server.middlewares.use(async (req: any, res: any, next: any) => {
            if (req.method === "POST" && req.url === "/api/posts") {
                let body = "";
                for await (const chunk of req) {
                    body += chunk;
                }
                try {
                    const entry = JSON.parse(body);
                    if (
                        !entry ||
                        typeof entry.date !== "number" ||
                        !Array.isArray(entry.url) ||
                        typeof entry.artistId !== "string"
                    ) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: "Invalid post data" }));
                        return;
                    }

                    const postsPath = path.resolve(__dirname, "../data/posts.json");
                    let posts = [];
                    try {
                        const data = fs.readFileSync(postsPath, "utf-8");
                        posts = JSON.parse(data);
                        if (!Array.isArray(posts)) throw new Error();
                    } catch {
                        posts = [];
                    }

                    posts.push(entry);

                    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 4), "utf-8");

                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ success: true }));
                } catch (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: "Internal server error" }));
                }
            } else {
                next();
            }
        });
    },
};

export default defineConfig({
    base: "/touhou-translations/",
    plugins: [react(), vitePostsApiPlugin],
});
