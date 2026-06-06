import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");

const cleanDistRoot = () => {
    const entries = fs.readdirSync(distDir);

    for (const entry of entries) {
        if (entry === "client" || entry === "server") continue;
        fs.rmSync(path.join(distDir, entry), { recursive: true, force: true });
    }
};

const moveClientToDist = () => {
    try {
        if (!fs.existsSync(clientDir)) {
            console.error("❌ Client directory does not exist:", clientDir);
            process.exit(1);
        }

        cleanDistRoot();

        const files = fs.readdirSync(clientDir);

        for (const file of files) {
            const src = path.join(clientDir, file);
            const dest = path.join(distDir, file);

            if (fs.existsSync(dest)) {
                fs.rmSync(dest, { recursive: true, force: true });
            }

            fs.renameSync(src, dest);
        }

        fs.rmdirSync(clientDir);
        console.log("✅ Moved files from dist/client to dist/.");

        if (fs.existsSync(serverDir)) {
            fs.rmSync(serverDir, { recursive: true, force: true });
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
