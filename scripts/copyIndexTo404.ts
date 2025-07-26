import fs from "fs";
import path from "path";

const clientDir = path.resolve("dist/client");
const indexPath = path.join(clientDir, "index.html");
const notFoundPath = path.join(clientDir, "404.html");

const copyIndexTo404 = () => {
    try {
        if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, notFoundPath);
            console.log("✅ Created 404.html for SPA fallback.");
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
