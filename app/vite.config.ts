import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import type { Post } from "./src/types/data";

const postsPath = path.resolve(__dirname, "../data/posts.json");

const readRequestBody = async (req: any): Promise<string> => {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) chunks.push(chunk);
    return Buffer.concat(chunks).toString();
};

const isValidPost = (entry: any): entry is Post => {
    return (
        entry !== null &&
        typeof entry === "object" &&
        typeof entry.date === "number" &&
        typeof entry.reddit === "string" &&
        Array.isArray(entry.url) && entry.url.every((u: any) => typeof u === "string") &&
        typeof entry.src === "string" &&
        typeof entry.desc === "string" &&
        typeof entry.artistId === "string" &&
        Array.isArray(entry.characterIds) && entry.characterIds.every((id: any) => typeof id === "string")
    );
};

const readPosts = (): Post[] => {
    try {
        const data = fs.readFileSync(postsPath, "utf-8");
        const posts = JSON.parse(data);
        return Array.isArray(posts) ? posts : [];
    } catch {
        return [];
    }
};

const writePosts = (posts: Post[]): void => fs.writeFileSync(postsPath, JSON.stringify(posts, null, 4), "utf-8");



const vitePostsApiPlugin = {
    name: "vite-posts-api",
    configureServer: (server: any) => {
        server.middlewares.use(async (req: any, res: any, next: any) => {
            if (req.method !== "POST" || req.url !== "/api/posts") {
                next();
                return;
            }

            try {
                const body = await readRequestBody(req);
                const entry = JSON.parse(body);

                if (!isValidPost(entry)) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: "Invalid post data" }));
                    return;
                }

                const posts = readPosts();
                posts.push(entry);
                writePosts(posts);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: true }));
            } catch {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: "Internal server error" }));
            }
        });
    },
};



export default defineConfig({
    base: "/touhou-translations/",
    plugins: [react(), vitePostsApiPlugin],
});
