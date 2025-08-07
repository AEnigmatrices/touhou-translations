import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = resolve(__dirname, '..');
const dataFilePath = join(rootDir, 'data', 'characters.json');

function getShortName(fullName: string): string {
    const parts = fullName.trim().split(/\s+/);
    return parts.length === 1 ? parts[0] : parts[parts.length - 1];
}

function insertShortNameKey(obj: any): any {
    const { name, ...rest } = obj;
    const short_name = getShortName(name);
    return { id: obj.id, name, short_name, ...rest };
}

function main() {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const characters = JSON.parse(fileContent);

    if (!Array.isArray(characters)) {
        throw new Error('Invalid JSON format: Expected an array');
    }

    const updatedCharacters = characters.map(insertShortNameKey);
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedCharacters, null, 2), 'utf-8');

    console.log('short_name field added successfully.');
}

main();