import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");

const moveClientToDist = () => {
    try {
        if (!fs.existsSync(clientDir)) {
            console.error("❌ Client directory does not exist:", clientDir);
            process.exit(1);
        }

        const files = fs.readdirSync(clientDir);

        for (const file of files) {
            const src = path.join(clientDir, file);
            const dest = path.join(distDir, file);
            fs.renameSync(src, dest);
        }

        fs.rmdirSync(clientDir);
        console.log("✅ Moved files from dist/client to dist/.");

        if (fs.existsSync(serverDir)) {
            fs.rmdirSync(serverDir, { recursive: true });
            console.log("✅ Deleted dist/server directory.");
        } else {
            console.log("ℹ️ Server directory does not exist, no deletion needed.");
        }

    } catch (err) {
        console.error("❌ Failed to move files or delete server directory:", err);
        process.exit(1);
    }
};

moveClientToDist();