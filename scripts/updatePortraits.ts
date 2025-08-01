import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Emulate __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseURL = process.env.BASE_URL || "/";
const dataDir = path.resolve(__dirname, "../data");
const publicDir = path.resolve(__dirname, "../public"); // Portraits assumed under public/

const placeholderFilenames = [
    "demoman.webp",
    "engineer.webp",
    "heavy.webp",
    "medic.webp",
    "pyro.webp",
    "scout.webp",
    "sniper.webp",
    "soldier.webp",
    "spy.webp",
];

function getRandomPlaceholder(): string {
    const index = Math.floor(Math.random() * placeholderFilenames.length);
    return `${baseURL}portraits/placeholders/${placeholderFilenames[index]}`;
}

async function updatePortraits() {
    const files = [
        {
            filename: "characters.json",
            portraitDir: "portraits/characters",
        },
        {
            filename: "artists.json",
            portraitDir: "portraits/artists",
        },
    ];

    for (const { filename, portraitDir } of files) {
        const filePath = path.join(dataDir, filename);
        const portraitPath = path.join(publicDir, portraitDir); // Actual image location

        try {
            await fs.access(filePath);
        } catch {
            console.error(`File not found: ${filePath}`);
            continue;
        }

        let raw: string;
        let data: any[];

        try {
            raw = await fs.readFile(filePath, "utf-8");
            data = JSON.parse(raw);
        } catch (e) {
            console.error(`Error reading or parsing ${filename}:`, e);
            continue;
        }

        if (!Array.isArray(data)) {
            console.error(`Expected array in ${filename}`);
            continue;
        }

        const updated = await Promise.all(
            data.map(async entry => {
                if (!entry.id) {
                    console.warn(`Skipping entry with no id in ${filename}`);
                    return entry;
                }

                const fileName = `${entry.id}.webp`;
                const fullPortraitPath = path.join(portraitPath, fileName);

                try {
                    await fs.access(fullPortraitPath);
                    return {
                        ...entry,
                        portrait: `${baseURL}${portraitDir}/${fileName}`,
                    };
                } catch {
                    return {
                        ...entry,
                        portrait: getRandomPlaceholder(),
                    };
                }
            })
        );

        try {
            await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");
            console.log(`Updated ${filename} with portrait or placeholder URLs.`);
        } catch (e) {
            console.error(`Error writing to ${filename}:`, e);
        }
    }
}

updatePortraits();