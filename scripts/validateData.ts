import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

type JsonRecord = Record<string, unknown>;

export interface DataValidationResult {
    errors: string[];
    warnings: string[];
    artistsCount: number;
    charactersCount: number;
    postsCount: number;
}

const isRecord = (value: unknown): value is JsonRecord =>
    value !== null && typeof value === "object" && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

const hasHttpUrl = (value: string): boolean => {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};

const extractRedditId = (url: string): string => {
    const match = url.trim().match(/comments\/([a-zA-Z0-9]+)/);
    return match ? match[1] : "";
};

export const validateData = (rootDir = process.cwd()): DataValidationResult => {
    const dataDir = path.join(rootDir, "data");
    const postsDir = path.join(dataDir, "posts");
    const publicDir = path.join(rootDir, "public");
    const errors: string[] = [];
    const warnings: string[] = [];

    const readJsonArray = (filePath: string): unknown[] => {
        try {
            const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            if (Array.isArray(parsed)) return parsed;
            errors.push(`${path.relative(rootDir, filePath)} must contain a JSON array.`);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown parse error";
            errors.push(`${path.relative(rootDir, filePath)} could not be parsed: ${message}`);
        }
        return [];
    };

    const validatePortrait = (label: string, portrait: unknown): void => {
        if (!isNonEmptyString(portrait)) {
            errors.push(`${label}.portrait must be a non-empty string.`);
            return;
        }

        const normalized = portrait.replaceAll("\\", "/");
        if (path.isAbsolute(normalized) || normalized.split("/").includes("..")) {
            errors.push(`${label}.portrait must be a relative public asset path.`);
            return;
        }

        const filePath = path.resolve(publicDir, normalized);
        if (!filePath.startsWith(publicDir) || !fs.existsSync(filePath)) {
            errors.push(`${label}.portrait points to a missing file: ${portrait}`);
        }
    };

    const validateUniqueId = (
        kind: string,
        label: string,
        id: unknown,
        seen: Map<string, string>
    ): string | null => {
        if (!isNonEmptyString(id)) {
            errors.push(`${label}.id must be a non-empty string.`);
            return null;
        }

        if (seen.has(id)) {
            errors.push(`${label}.id duplicates ${kind} ID "${id}" from ${seen.get(id)}.`);
        } else {
            seen.set(id, label);
        }

        return id;
    };

    const validateOptionalUrl = (label: string, value: unknown): void => {
        if (value === undefined) return;
        if (!isNonEmptyString(value) || !hasHttpUrl(value)) {
            errors.push(`${label} must be an http(s) URL when present.`);
        }
    };

    const artistsRaw = readJsonArray(path.join(dataDir, "artists.json"));
    const charactersRaw = readJsonArray(path.join(dataDir, "characters.json"));

    const artistIds = new Set<string>();
    const characterIds = new Set<string>();
    const seenArtistIds = new Map<string, string>();
    const seenCharacterIds = new Map<string, string>();
    const seenRedditIds = new Map<string, string>();

    for (const [index, entry] of artistsRaw.entries()) {
        const label = `data/artists.json[${index}]`;
        if (!isRecord(entry)) {
            errors.push(`${label} must be an object.`);
            continue;
        }

        const id = validateUniqueId("artist", label, entry.id, seenArtistIds);
        if (id) artistIds.add(id);

        if (!isNonEmptyString(entry.name)) errors.push(`${label}.name must be a non-empty string.`);
        validateOptionalUrl(`${label}.linkTwitter`, entry.linkTwitter);
        validateOptionalUrl(`${label}.linkPixiv`, entry.linkPixiv);
        validatePortrait(label, entry.portrait);
    }

    for (const [index, entry] of charactersRaw.entries()) {
        const label = `data/characters.json[${index}]`;
        if (!isRecord(entry)) {
            errors.push(`${label} must be an object.`);
            continue;
        }

        const id = validateUniqueId("character", label, entry.id, seenCharacterIds);
        if (id) characterIds.add(id);

        if (!isNonEmptyString(entry.name)) errors.push(`${label}.name must be a non-empty string.`);
        if (!isNonEmptyString(entry.short_name)) errors.push(`${label}.short_name must be a non-empty string.`);
        if (!Array.isArray(entry.work) || !entry.work.every(isNonEmptyString)) {
            errors.push(`${label}.work must be an array of non-empty strings.`);
        }
        validatePortrait(label, entry.portrait);
    }

    const postFiles = fs.existsSync(postsDir)
        ? fs.readdirSync(postsDir).filter(file => file.endsWith(".json")).sort()
        : [];

    if (postFiles.length === 0) {
        errors.push("data/posts must contain at least one JSON file.");
    }

    for (const file of postFiles) {
        const filePath = path.join(postsDir, file);
        const postsRaw = readJsonArray(filePath);

        for (const [index, entry] of postsRaw.entries()) {
            const label = `data/posts/${file}[${index}]`;
            if (!isRecord(entry)) {
                errors.push(`${label} must be an object.`);
                continue;
            }

            if (typeof entry.date !== "number" || !Number.isFinite(entry.date) || entry.date <= 0) {
                errors.push(`${label}.date must be a positive numeric timestamp.`);
            }

            if (!isNonEmptyString(entry.reddit) || !hasHttpUrl(entry.reddit)) {
                errors.push(`${label}.reddit must be an http(s) URL.`);
            } else {
                const redditId = extractRedditId(entry.reddit);
                if (!redditId) {
                    errors.push(`${label}.reddit must include a /comments/{id} path.`);
                } else if (seenRedditIds.has(redditId)) {
                    errors.push(`${label}.reddit duplicates Reddit ID "${redditId}" from ${seenRedditIds.get(redditId)}.`);
                } else {
                    seenRedditIds.set(redditId, label);
                }
            }

            if (!Array.isArray(entry.url) || entry.url.length === 0 || !entry.url.every(value => isNonEmptyString(value) && hasHttpUrl(value))) {
                errors.push(`${label}.url must be a non-empty array of http(s) URLs.`);
            }

            if (!isNonEmptyString(entry.src) || !hasHttpUrl(entry.src)) {
                errors.push(`${label}.src must be an http(s) URL.`);
            }

            if (typeof entry.desc !== "string") {
                errors.push(`${label}.desc must be a string.`);
            }

            if (!isNonEmptyString(entry.artistId)) {
                errors.push(`${label}.artistId must be a non-empty string.`);
            } else if (!artistIds.has(entry.artistId)) {
                errors.push(`${label}.artistId references missing artist "${entry.artistId}".`);
            }

            if (!Array.isArray(entry.characterIds) || entry.characterIds.length === 0) {
                errors.push(`${label}.characterIds must be a non-empty array.`);
            } else {
                const postCharacterIds = new Set<string>();
                for (const characterId of entry.characterIds) {
                    if (!isNonEmptyString(characterId)) {
                        errors.push(`${label}.characterIds contains a non-string or empty ID.`);
                        continue;
                    }
                    if (postCharacterIds.has(characterId)) {
                        warnings.push(`${label}.characterIds repeats "${characterId}".`);
                    }
                    postCharacterIds.add(characterId);

                    if (!characterIds.has(characterId)) {
                        errors.push(`${label}.characterIds references missing character "${characterId}".`);
                    }
                }
            }

            if (typeof entry.nsfw !== "boolean") {
                errors.push(`${label}.nsfw must be a boolean.`);
            }
        }
    }

    return {
        errors,
        warnings,
        artistsCount: artistsRaw.length,
        charactersCount: charactersRaw.length,
        postsCount: seenRedditIds.size
    };
};

export const printValidationResult = (result: DataValidationResult): void => {
    for (const warning of result.warnings) {
        console.warn(`Warning: ${warning}`);
    }

    if (result.errors.length > 0) {
        console.error(`Data validation failed with ${result.errors.length} error(s):`);
        for (const error of result.errors) {
            console.error(`- ${error}`);
        }
        return;
    }

    console.log(
        `Data validation passed: ${result.artistsCount} artists, ${result.charactersCount} characters, ${result.postsCount} posts.`
    );
};

const isCliRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCliRun) {
    const result = validateData();
    printValidationResult(result);
    process.exit(result.errors.length > 0 ? 1 : 0);
}
