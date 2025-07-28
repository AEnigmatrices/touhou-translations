import { glob } from 'glob';
import { mkdirSync, existsSync, renameSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';

const getVariantImages = async (): Promise<string[]> => {
    const socialIcons = await glob('public/icons/social/**/*_80x80.webp');
    const portraitFiles = await glob('public/portraits/{artists,characters,placeholders}/**/*_80x80.webp');
    return [...socialIcons, ...portraitFiles];
};

const moveImage = (file: string) => {
    const currentDir = dirname(file);
    const thumbDir = join(currentDir, 'thumb_80x80');
    const targetPath = join(thumbDir, basename(file));

    try {
        if (!existsSync(thumbDir)) {
            mkdirSync(thumbDir);
            console.log(`Created: ${thumbDir}`);
        }

        renameSync(file, targetPath);
        console.log(`Moved: ${file} → ${targetPath}`);
    } catch (err) {
        console.error(`Failed to move ${file}:`, (err as Error).message);
    }
};

const moveImages = async () => {
    const images = await getVariantImages();

    if (images.length === 0) {
        console.log('No variant images found.');
        return;
    }

    console.log(`Found ${images.length} variant images to move.`);
    for (const image of images) {
        moveImage(image);
    }
};

moveImages().catch(console.error);